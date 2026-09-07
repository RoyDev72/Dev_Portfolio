import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaBookOpen } from "react-icons/fa";
import CaseStudy from "./CaseStudy";

// Status → badge class mapping
function statusClass(status) {
  if (!status) return "proj-status-personal";
  if (status.includes("In Dev")) return "proj-status-indev";
  if (status.includes("Production")) return "proj-status-production";
  return "proj-status-personal";
}

function statusDot(status) {
  if (!status) return "bg-[#ffdb70]";
  if (status.includes("In Dev")) return "bg-amber-400";
  if (status.includes("Production")) return "bg-emerald-400";
  return "bg-[#ffdb70]";
}

// ── Featured project card (for Selected Work) ─────────────────────────────
export function FeaturedProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="proj-card-featured group">
        {/* Top accent bar */}
        <div className="h-[2px] bg-gradient-to-r from-[#ffdb70]/30 via-[#ffdb70]/10 to-transparent" />

        <div className="p-6 flex flex-col gap-4 flex-1">
          {/* Number + status row */}
          <div className="flex items-center justify-between">
            {project.number && (
              <span className="proj-number text-[11px]">{project.number}</span>
            )}
            <span className={`proj-status-badge ${statusClass(project.status)}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot(project.status)}`} />
              {project.status}
            </span>
          </div>

          {/* Title + subtitle */}
          <div>
            <h3 className="text-white font-semibold text-lg leading-snug group-hover:text-[#ffdb70] transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-[#ffdb70]/60 text-[12px] font-medium mt-0.5 tracking-wide">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-[14px] leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-[#1e1e1e] border border-[#272727] text-gray-500 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Category */}
          <div className="text-[11px] text-gray-600 font-medium mt-auto">
            {project.category}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1e1e1e]">
            {project.caseStudy && (
              <button
                onClick={() => setOpen(true)}
                className="btn-secondary text-[12px] py-1.5 px-3.5"
              >
                <FaBookOpen className="text-[11px]" /> Case Study
              </button>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-[12px] py-1.5 px-3.5"
              >
                <FaExternalLinkAlt className="text-[10px]" /> Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-[12px] py-1.5 px-3.5"
              >
                <FaGithub className="text-[11px]" /> Code
              </a>
            )}
          </div>
        </div>
      </div>

      {open && <CaseStudy project={project} onClose={() => setOpen(false)} />}
    </>
  );
}

// ── Earlier project card (compact) ────────────────────────────────────────
export default function Project({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="proj-card group">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="rounded-xl h-32 object-cover w-full bg-[#1e1e1e]"
            loading="lazy"
          />
        )}
        <div className="flex flex-col gap-2 flex-1">
          <span className="font-semibold text-white text-[15px] group-hover:text-[#ffdb70] transition-colors">
            {project.title}
          </span>
          {project.description && (
            <span className="text-gray-500 text-[13px] leading-relaxed">
              {project.description}
            </span>
          )}
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tags?.map((tag) => (
              <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1e1e1e] border border-[#252525] text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mt-auto pt-2 border-t border-[#1e1e1e]">
          {project.caseStudy && (
            <button
              onClick={() => setOpen(true)}
              className="btn-secondary text-[11px] py-1 px-3"
            >
              <FaBookOpen className="text-[10px]" /> Details
            </button>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
               className="btn-primary text-[11px] py-1 px-3">
              <FaExternalLinkAlt className="text-[10px]" /> Live
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer"
               className="btn-secondary text-[11px] py-1 px-3">
              <FaGithub className="text-[10px]" /> Code
            </a>
          )}
        </div>
      </div>

      {open && <CaseStudy project={project} onClose={() => setOpen(false)} />}
    </>
  );
}