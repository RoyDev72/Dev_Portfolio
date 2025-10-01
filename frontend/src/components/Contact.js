import React, { useState, useRef } from "react";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";
import { FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // { type: 'ok'|'err', text }
  const [sending, setSending] = useState(false);

  // Option 1: Directly call deployed backend service.
  // Use env var if provided; fallback to localhost in dev; hardcode Render URL in production build.
  const API_BASE = process.env.REACT_APP_API_BASE || (process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://dev-portfolio-485y.onrender.com');

  const abortRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setStatus(null);
    if (!name || !email || !message) {
      setStatus({ type: 'err', text: 'Please fill all fields.' });
      return;
    }
    setSending(true);
    try {
      // Timeout after 12s
      const controller = new AbortController();
      abortRef.current = controller;
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      let resp;
      try {
        // Use top-level API_BASE and /contact (no /api prefix per Option 1)
        resp = await fetch(`${API_BASE}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
          signal: controller.signal
        });
      } catch (networkErr) {
        if (networkErr.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.');
        }
        // TypeError is typical for network failure (CORS, server down, DNS)
        if (networkErr instanceof TypeError) {
          throw new Error('Network error. Is the backend running and reachable?');
        }
        throw networkErr;
      } finally {
        clearTimeout(timeoutId);
      }

      let data = {};
      try { data = await resp.json(); } catch (_) { /* ignore */ }

      if (!resp.ok) {
        const msg = data.message || `Server error (${resp.status})`;
        throw new Error(msg);
      }
      if (!data.success) {
        throw new Error(data.message || 'Send failed');
      }
      setStatus({ type: 'ok', text: data.message || 'Sent!' });
      setName(""); setEmail(""); setMessage("");
    } catch (err) {
      setStatus({ type: 'err', text: err.message || 'Error sending message.' });
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
  <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
    <div className="w-full flex flex-col md:flex-row gap-10 justify-center">
  {/* Main Card */}
  <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
    <div className="hidden md:block"><Tabs /></div>
  <div className="p-8 flex flex-col gap-8">
          <PageTitle title="Contact" />
          {/* Map */}
          <iframe
            title="Nashik"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.375229043035!2d73.77135607542841!3d19.99745328143842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb31f4f8b7a1%3A0xead8685905a9d3f7!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1692204886793!5m2!1sen!2sin"
            width="100%"
            height="260"
            className="rounded-xl border-none mb-8"
            style={{ filter: "grayscale(100%) invert(90%)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-white mb-2">Contact Form</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="flex-1 bg-[#181818] border border-[#272727] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ffdb70] transition"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 bg-[#181818] border border-[#272727] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ffdb70] transition"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
              className="bg-[#181818] border border-[#272727] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ffdb70] transition"
            ></textarea>
            {status && (
              <div className={`${status.type === 'ok' ? 'text-green-400' : 'text-red-400'} text-sm font-medium`}>
                {status.text}
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow transition ${sending ? 'opacity-60 cursor-not-allowed bg-[#22221c] text-[#ffdb70]' : 'bg-[#22221c] text-[#ffdb70] hover:bg-[#ffdb70] hover:text-[#181818]'}`}
              >
                <FaPaperPlane /> {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
    </div>
  </div>
  <div className="hidden md:block"><Sidebar /></div>
  </div>
  </div>
  <BottomTabs />
    </div>
  );
}