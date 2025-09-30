import React, { useRef, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Navbar() {
  const links = [
    { label: "About", to: "/", id: 'about' },
    { label: "Skills", to: "/", id: 'skills' },
    { label: "Projects", to: "/", id: 'projects' },
    { label: "Blog", to: "/", id: 'blog' },
    { label: "Contact", to: "/", id: 'contact' },
  ];

  const containerRef = useRef(null);
  const location = useLocation();
  const [indicatorStyle, setIndicatorStyle] = useState({ insetInlineStart: 0, inlineSize: 0, opacity: 0 });
  const [ghostStyle, setGhostStyle] = useState({ insetInlineStart: 0, inlineSize: 0, opacity: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const active = containerRef.current.querySelector("a[aria-current='page']");
    if (active) {
      const { offsetLeft, offsetWidth } = active;
  setIndicatorStyle({ insetInlineStart: offsetLeft, inlineSize: offsetWidth, opacity: 1 });
      setGhostStyle(g => ({ ...g, insetInlineStart: offsetLeft, inlineSize: offsetWidth, opacity: 0 }));
    }
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
  const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
    } else {
      document.documentElement.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <nav className={
      "fixed top-0 left-0 right-0 z-30 backdrop-blur transition-colors " +
      (scrolled ? "bg-[#0f0f0f]/90 shadow-lg shadow-black/40" : "bg-[#111111]/80 border-b border-[#1e1e1e]")
    }>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-white font-bold text-lg tracking-wide">
          Shivang<span className="text-[#ffdb70]">.dev</span>
        </a>
        <div
          ref={containerRef}
          className="relative hidden md:flex items-center gap-8 text-sm font-medium"
          onMouseLeave={() => setGhostStyle(g => ({ ...g, opacity: 0 }))}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.to}
              onClick={(e) => { e.preventDefault(); const el = document.getElementById(l.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className={
                "relative px-0.5 py-1 transition-colors duration-200 text-gray-400 hover:text-[#ffdb70]"
              }
              onMouseEnter={e => {
                const { offsetLeft, offsetWidth } = e.currentTarget;
                setGhostStyle({ insetInlineStart: offsetLeft, inlineSize: offsetWidth, opacity: 0.35 });
              }}
            >
              {l.label}
            </a>
          ))}
          <span
            className="absolute -bottom-2 h-[2px] bg-[#ffdb70] rounded-full transition-all duration-300 ease-out"
            style={indicatorStyle}
          />
          <span
            className="absolute -bottom-2 h-[2px] bg-[#ffdb70]/50 rounded-full transition-all duration-300 ease-out"
            style={ghostStyle}
          />
        </div>
        <button
          className="md:hidden text-gray-300 hover:text-[#ffdb70] text-xl focus:outline-none focus:ring-2 focus:ring-[#ffdb70]/60 rounded"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {menuOpen && (
        <div id="mobile-nav-panel" className="md:hidden fixed inset-0 z-40 flex" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 flex-1 max-w-[460px] w-full h-full overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white font-semibold text-lg">Menu</div>
              <button
                className="text-gray-400 hover:text-[#ffdb70] text-lg focus:outline-none focus:ring-2 focus:ring-[#ffdb70]/50 rounded"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>
            <Sidebar mobile />
            <nav className="mt-8 grid grid-cols-2 gap-3 text-sm font-medium">
              {links.map(l => (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={(e) => { e.preventDefault(); const el = document.getElementById(l.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setMenuOpen(false); }}
                  className={
                    "px-4 py-2 rounded-lg text-center transition-colors border text-gray-300 hover:text-[#ffdb70] hover:border-[#ffdb70]"
                  }
                >
                  {l.label}
                </a>
              ))}
            </nav>
            {/* Copyright removed as requested */}
          </div>
        </div>
      )}
    </nav>
  );
}
