import React from "react";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";
import profile from "../data/profile";

export default function Experience() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
      <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
        <div className="w-full flex flex-col md:flex-row gap-10 justify-center">

          {/* ── Main Card ─────────────────────────────────────────────── */}
          <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
            <div className="hidden md:block"><Tabs /></div>
            <div className="p-6 md:p-8 flex flex-col gap-10">

              {/* ── Resume Download ───────────────────────────────────── */}
              {profile.resume && (
                <div className="flex items-center justify-between bg-[#161616] border border-[#1e1e1e] rounded-2xl px-5 py-4">
                  <div>
                    <div className="text-white font-semibold text-[15px]">Resume</div>
                    <div className="text-gray-500 text-[13px] mt-0.5">
                      Download my full resume as a PDF.
                    </div>
                  </div>
                  <a
                    href={profile.resume}
                    download="Shivam_Roy_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm flex-shrink-0"
                  >
                    Download PDF
                  </a>
                </div>
              )}

              {/* ── Work / Client Experience ──────────────────────────── */}
              <section>
                <PageTitle title="Work">
                  Projects built and delivered for real clients and products.
                </PageTitle>

                {/*
                  IMPORTANT: This section intentionally shows verified project-based
                  work only. No employer names, job titles, or employment dates have
                  been invented. Update this section with your verified employment
                  details before publishing.
                */}
                <div className="flex flex-col gap-4">
                  {profile.experience.map((exp, i) => (
                    <div key={i} className="bg-[#161616] border border-[#1e1e1e] rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="font-semibold text-white text-[15px]">
                            {exp.title}
                          </div>
                          <div className="text-gray-400 text-[13px] mt-2 leading-relaxed">
                            {exp.description}
                          </div>
                          {exp.note && (
                            <div className="text-[#ffdb70]/60 text-[12px] mt-2 italic">
                              {exp.note}
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#1e1e1e] border border-[#252525] text-gray-500 flex-shrink-0">
                          {exp.type === "client" ? "Client Work" : exp.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 text-[12px] mt-4 leading-relaxed">
                  For detailed project breakdowns, see the{" "}
                  <a href="/projects" className="text-[#ffdb70]/70 hover:text-[#ffdb70] underline underline-offset-2 transition">
                    Selected Work
                  </a>{" "}
                  section.
                </p>
              </section>

              {/* ── Education ─────────────────────────────────────────── */}
              <section>
                <PageTitle title="Education" />
                <div className="flex flex-col gap-3 ml-1">
                  {profile.education.map((ed, i) => (
                    <div key={i} className="exp-timeline-item">
                      <div className="exp-timeline-dot" />
                      <div className="text-[#ffdb70] font-semibold text-[15px]">
                        {ed.institution}
                      </div>
                      <div className="text-white font-medium text-[14px] mt-1">
                        {ed.program}
                        {ed.field && ` — ${ed.field}`}
                      </div>
                      <div className="text-gray-500 text-[13px] mt-0.5">
                        {ed.period}
                      </div>
                      {ed.notes && (
                        <div className="text-gray-600 text-[12px] mt-1">{ed.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>

          <div className="hidden md:block"><Sidebar /></div>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}
