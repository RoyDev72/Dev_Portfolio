import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { label: "About", to: "/" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" }
];

export default function Tabs() {
  const location = useLocation();
  const containerRef = useRef(null);
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ x: 0, w: 0, opacity: 0 });

  // Recalculate indicator position on route change & resize
  useEffect(() => {
    function update() {
      const idx = items.findIndex(i => i.to === (location.pathname === "/" ? "/" : location.pathname));
      if (idx === -1) return;
      const el = tabRefs.current[idx];
      const container = containerRef.current;
      if (!el || !container) return;
      const cRect = container.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setIndicatorStyle({
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
    <div
      ref={containerRef}
      className="sticky top-0 z-20 flex w-full bg-elev/95 backdrop-blur rounded-t-3xl border-b border-subtle text-[13px] font-medium overflow-x-auto scrollbar-hide px-2"
    >
      {/* Animated sliding indicator */}
      <div
  className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-accent rounded-full origin-left transition-transform duration-300 ease-out"
        style={{
          transform: `translateX(${indicatorStyle.x}px) scaleX(${indicatorStyle.w || 1})`,
          opacity: indicatorStyle.opacity
        }}
      />
      {items.map((i, idx) => (
    <NavLink
          key={i.label}
          to={i.to}
          end={i.to === "/"}
          ref={el => (tabRefs.current[idx] = el)}
          className={({ isActive }) =>
      "relative px-7 py-4 whitespace-nowrap transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-sm " +
      (isActive ? "text-white" : "text-gray-400 hover:text-accent")
          }
        >
          <span className="transition-opacity duration-200">{i.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
