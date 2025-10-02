import express from "express";
import cors from "cors";
import fs from "fs";
// Removed nodemailer in favor of Resend API adapter
import { sendContactEmail } from "./emailProvider.js";
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

// Resend adapter flags
const mailDiag = { provider: process.env.EMAIL_PROVIDER || 'resend' };

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
  const defer = process.env.CONTACT_DEFER_SEND === 'true';
  if (defer) {
    res.json({ success: true, message: "Message queued for delivery." });
    sendContactEmail({ name, email, message })
      .then(r => console.log('[contact] deferred send', r))
      .catch(err => console.error('[contact] deferred send failed:', err.message));
    return;
  }
  try {
    const result = await sendContactEmail({ name, email, message });
    res.json({ success: true, message: "Message sent successfully.", provider: result.provider });
  } catch (err) {
    console.error('[contact] send error:', err.message);
    res.status(502).json({ success: false, message: 'Email service error.' });
  } finally {
    console.log(`[contact] total elapsed ${Date.now() - start}ms`);
  }
}

// Existing route (frontend older versions using /api/contact)
app.post("/api/contact", handleContact);
// New simpler route without /api prefix
app.post("/contact", handleContact);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Diagnostic: mail status
app.get("/mail-status", (req, res) => {
  res.json({ provider: mailDiag.provider || 'resend', from: process.env.FROM_EMAIL || null, target: process.env.TARGET_EMAIL || null });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});