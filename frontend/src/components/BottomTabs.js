import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUser, FaIdCard, FaFolderOpen, FaBlog, FaEnvelope } from "react-icons/fa";

const items = [
  { label: "About", to: "/", icon: <FaUser /> },
  { label: "Skills", to: "/skills", icon: <FaIdCard /> },
  { label: "Projects", to: "/projects", icon: <FaFolderOpen /> },
  { label: "Blog", to: "/blog", icon: <FaBlog /> },
  { label: "Contact", to: "/contact", icon: <FaEnvelope /> }
];

export default function BottomTabs() {
  const location = useLocation();
  const containerRef = useRef(null);
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, opacity: 0 });
  // Removed auto-hide; keep state only for indicator

  useEffect(() => {
    function update() {
      const idx = items.findIndex(i => i.to === (location.pathname === "/" ? "/" : location.pathname));
      if (idx === -1) return;
      const el = tabRefs.current[idx];
      const container = containerRef.current;
      if (!el || !container) return;
      const cRect = container.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setIndicator({
        x: r.left - cRect.left + container.scrollLeft,
        w: r.width,
        opacity: 1
      });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [location.pathname]);

  return (
    <nav
      ref={containerRef}
      className="md:hidden fixed left-0 right-0 bottom-0 z-40 flex bg-[#181818]/90 backdrop-blur border-t border-[#262626] text-[11px] font-medium overflow-x-auto scrollbar-hide px-2 shadow-[0_-4px_16px_-4px_rgba(0,0,0,.6)]"
    >
      <div
  className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-[#ffdb70] rounded-full origin-left transition-transform duration-300 ease-out"
  style={{ transform: `translateX(${indicator.x}px) scaleX(${indicator.w || 1})`, opacity: indicator.opacity }}
      />
      {items.map((i, idx) => {
        const active = location.pathname === i.to || (i.to === "/" && location.pathname === "/");
        return (
          <NavLink
            key={i.label}
            to={i.to}
            end={i.to === "/"}
            ref={el => (tabRefs.current[idx] = el)}
            className={({ isActive }) =>
              "relative flex flex-col items-center gap-1 px-4 py-3 min-w-[70px] whitespace-nowrap transition-colors duration-200 " +
              (isActive ? "text-white" : "text-gray-400 hover:text-[#ffdb70]")
            }
          >
            <span className={`text-base ${active ? 'text-[#7a6937]' : 'text-gray-400'}`}>{i.icon}</span>
            <span>{i.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
