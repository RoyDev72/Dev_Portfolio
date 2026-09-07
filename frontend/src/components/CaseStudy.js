import React, { useEffect, useRef } from "react";
import { FaTimes, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { HiOutlineCheckCircle } from "react-icons/hi";

// Ownership labels shown in the case study header
const ownershipLabels = {
  "built":      { label: "Built by me", color: "text-emerald-400 bg-emerald-500/10" },
  "worked-on":  { label: "Worked on",   color: "text-blue-400 bg-blue-500/10" },
  "r-and-d":    { label: "R&D / In Development", color: "text-amber-400 bg-amber-500/10" },
};

export default function CaseStudy({ project, onClose }) {
  const panelRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Focus panel on open
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const cs = project.caseStudy;
  const ownershipMeta = ownershipLabels[project.ownership] || null;

  return (
    <div
      className="cs-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="cs-panel"
        ref={panelRef}
        tabIndex={-1}
        style={{ outline: "none" }}
      >
        {/* ── Close button ─────────────────────────────────────────────── */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center
                     rounded-full bg-[#222] text-gray-400
                     hover:text-white hover:bg-[#2a2a2a] transition
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdb70]/50"
          aria-label="Close case study"
        >
          <FaTimes />
        </button>

        {/* ── Header ───────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 pr-10">
          {project.number && (
            <span className="proj-number">{project.number}</span>
          )}
          <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
            {project.title}
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed">
            {project.subtitle}
          </p>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {ownershipMeta && (
              <span className={`proj-ownership-tag text-[11px] px-3 py-1 rounded-full font-semibold ${ownershipMeta.color}`}>
                {ownershipMeta.label}
              </span>
            )}
            <span className={`proj-status-badge ${
              project.status?.includes("In Dev") ? "proj-status-indev"
              : project.status?.includes("Production") ? "proj-status-production"
              : "proj-status-personal"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                project.status?.includes("In Dev") ? "bg-amber-400"
                : project.status?.includes("Production") ? "bg-emerald-400"
                : "bg-[#ffdb70]"
              }`} />
              {project.status}
            </span>
          </div>

          {/* Links */}
          {(project.live || project.liveCrm || project.livePortal || project.repo) && (
            <div className="flex flex-wrap gap-3 mt-2">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs py-1.5 px-4">
                  <FaExternalLinkAlt className="text-[10px]" /> Visit Live
                </a>
              )}
              {project.liveCrm && (
                <a href={project.liveCrm} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1.5 px-4">
                  <FaExternalLinkAlt className="text-[10px]" /> CRM
                </a>
              )}
              {project.livePortal && (
                <a href={project.livePortal} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1.5 px-4">
                  <FaExternalLinkAlt className="text-[10px]" /> Portal
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1.5 px-4">
                  <FaGithub /> Code
                </a>
              )}
            </div>
          )}
        </div>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div className="border-t border-[#222]" />

        {/* ── Case study sections ───────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {cs.problem && (
            <div>
              <div className="cs-section-label">Problem</div>
              <div className="cs-section-value">{cs.problem}</div>
            </div>
          )}

          {cs.approach && (
            <div>
              <div className="cs-section-label">Approach</div>
              <div className="cs-section-value">{cs.approach}</div>
            </div>
          )}

          {cs.role && (
            <div>
              <div className="cs-section-label">My Role</div>
              <div className="cs-section-value">{cs.role}</div>
            </div>
          )}

          {cs.built && cs.built.length > 0 && (
            <div>
              <div className="cs-section-label">What I Built</div>
              <ul className="flex flex-col gap-2.5 mt-1">
                {cs.built.map((item, i) => (
                  <li key={i} className="cs-built-item">
                    <HiOutlineCheckCircle className="text-[#ffdb70]/70 text-lg mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {cs.tech && cs.tech.length > 0 && (
            <div>
              <div className="cs-section-label">Technology</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {cs.tech.map((t) => (
                  <span key={t} className="cs-tech-pill">{t}</span>
                ))}
              </div>
            </div>
          )}

          {cs.challenges && (
            <div>
              <div className="cs-section-label">Challenges</div>
              <div className="cs-section-value">{cs.challenges}</div>
            </div>
          )}

          {cs.outcome && (
            <div>
              <div className="cs-section-label">Outcome</div>
              <div className="cs-section-value">{cs.outcome}</div>
            </div>
          )}

        </div>

        {/* ── Footer close ─────────────────────────────────────────────── */}
        <div className="flex justify-end pt-2 border-t border-[#1e1e1e]">
          <button onClick={onClose} className="btn-secondary text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
