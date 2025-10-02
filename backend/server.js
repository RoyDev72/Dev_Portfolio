import express from "express";
import cors from "cors";
import fs from "fs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const projects = JSON.parse(fs.readFileSync(new URL("./data/projects.json", import.meta.url)));

const app = express();
const PORT = process.env.PORT || 5000;

// CORS – restrict to ALLOWED_ORIGIN list if provided (comma separated)
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "").split(",").map(o => o.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // non-browser / curl
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS: Origin not allowed"));
  },
  methods: ["GET","POST","OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
// Express 5 stricter path matching: explicit generic OPTIONS handler
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    // CORS headers will already be set by cors() above
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Configure mail transport (lazy / dev-safe). If env not present, stays in console mode.
let mailEnabled = true;
let transporter;
let mailDiag = { reason: null };
try {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    mailEnabled = false;
    mailDiag.reason = "missing_env";
    console.warn("[contact] SMTP env vars missing (SMTP_HOST/SMTP_USER/SMTP_PASS). Email disabled.");
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      pool: true,
      maxConnections: parseInt(process.env.SMTP_POOL_MAX || '3', 10),
      maxMessages: parseInt(process.env.SMTP_POOL_MSG || '50', 10),
      keepAlive: true
    });
    // Verify connection once at startup
    transporter.verify().then(() => {
      console.log("[contact] SMTP connection verified.");
    }).catch(err => {
      mailEnabled = false;
      mailDiag.reason = "verify_failed";
      mailDiag.error = err.message;
      console.error("[contact] SMTP verify failed, disabling email:", err.message);
    });
  }
} catch (e) {
  mailEnabled = false;
  mailDiag.reason = "config_exception";
  mailDiag.error = e.message;
  console.error("[contact] Failed to configure transporter:", e.message);
}

// Simple in-memory rate limiter for contact route
const contactHits = new Map(); // ip -> [timestamps]
const CONTACT_WINDOW_MS = 15 * 60 * 1000; // 15 min
const CONTACT_MAX = 10; // max submissions per window

function rateLimit(req, res) {
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const now = Date.now();
  const arr = (contactHits.get(ip) || []).filter(ts => now - ts < CONTACT_WINDOW_MS);
  if (arr.length >= CONTACT_MAX) return true; // limit reached
  arr.push(now);
  contactHits.set(ip, arr);
  return false;
}

async function handleContact(req, res) {
  const start = Date.now();
  if (rateLimit(req, res)) {
    return res.status(429).json({ success: false, message: "Too many messages, please try later." });
  }
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required." });
  }

  // Basic format checks
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return res.status(400).json({ success: false, message: "Invalid email." });
  if (message.length > 5000) return res.status(400).json({ success: false, message: "Message too long." });

  // Basic sanitation
  const safe = (s = "") => String(s).slice(0, 5000).replace(/</g, "&lt;");
  const target = process.env.TARGET_EMAIL || "shivamraj620133@gmail.com";

  const defer = process.env.CONTACT_DEFER_SEND === 'true';
  const maxSendMs = parseInt(process.env.MAIL_TIMEOUT_MS || '15000', 10);

  if (!mailEnabled) {
    console.log(`[contact:dev] -> to:${target}`, { name, email, message });
    return res.json({ success: true, message: "Message received (dev mode, email not sent)." });
  }

  // If defer is enabled, return immediately and send asynchronously
  if (defer) {
    res.json({ success: true, message: "Message queued for delivery." });
    // Fire-and-forget send (no await)
    sendMailWithTimeout({ name, email, message, target, maxSendMs })
      .then(() => console.log('[contact] deferred send success'))
      .catch(err => console.error('[contact] deferred send failed:', err.message));
    return;
  }

  try {
    await sendMailWithTimeout({ name, email, message, target, maxSendMs });
    res.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    const code = err && err.name === 'TimeoutError' ? 504 : 500;
    console.error("[contact] send error:", err.message || err);
    res.status(code).json({ success: false, message: err.message || "Failed to send message." });
  } finally {
    const ms = Date.now() - start;
    console.log(`[contact] total elapsed ${ms}ms`);
  }
}

async function sendMailWithTimeout({ name, email, message, target, maxSendMs }) {
  const safe = (s = "") => String(s).slice(0, 5000).replace(/</g, "&lt;");
  const mailPromise = transporter.sendMail({
    from: process.env.FROM_EMAIL || process.env.SMTP_USER,
    to: target,
    replyTo: email,
    subject: `New portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<h3>New Portfolio Message</h3>
           <p><strong>Name:</strong> ${safe(name)}</p>
           <p><strong>Email:</strong> ${safe(email)}</p>
           <p><strong>Message:</strong><br/>${safe(message).replace(/\n/g, '<br/>')}</p>`
  });
  const timeoutPromise = new Promise((_, rej) => {
    const t = setTimeout(() => {
      rej(Object.assign(new Error(`Email send exceeded ${maxSendMs}ms`), { name: 'TimeoutError' }));
    }, maxSendMs);
    mailPromise.finally(() => clearTimeout(t));
  });
  return Promise.race([mailPromise, timeoutPromise]);
}

// Existing route (frontend older versions using /api/contact)
app.post("/api/contact", handleContact);
// New simpler route without /api prefix
app.post("/contact", handleContact);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Diagnostic: mail status
app.get("/mail-status", (req, res) => {
  res.json({
    mailEnabled,
    hasHost: !!process.env.SMTP_HOST,
    hasUser: !!process.env.SMTP_USER,
    hasPass: !!process.env.SMTP_PASS,
    secure: process.env.SMTP_SECURE,
    port: process.env.SMTP_PORT,
    reason: mailDiag.reason,
    error: mailDiag.error || null
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});