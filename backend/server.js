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
  }
}));
app.use(express.json());

app.get("/api/projects", (req, res) => {
  res.json(projects);
});

// Configure mail transport (lazy / dev-safe). If env not present, stays in console mode.
let mailEnabled = true;
let transporter;
try {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    mailEnabled = false;
    console.warn("[contact] SMTP env vars missing, running in console-only mode.");
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE !== "false" : true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });
    // Verify connection once at startup
    transporter.verify().then(() => {
      console.log("[contact] SMTP connection verified.");
    }).catch(err => {
      mailEnabled = false;
      console.error("[contact] SMTP verify failed, disabling email:", err.message);
    });
  }
} catch (e) {
  mailEnabled = false;
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

app.post("/api/contact", async (req, res) => {
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

  if (!mailEnabled) {
    console.log(`[contact:dev] -> to:${target}`, { name, email, message });
    return res.json({ success: true, message: "Message received (dev mode, email not sent)." });
  }

  try {
    await transporter.sendMail({
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
    res.json({ success: true, message: "Message sent successfully." });
  } catch (err) {
    console.error("[contact] send error:", err);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});