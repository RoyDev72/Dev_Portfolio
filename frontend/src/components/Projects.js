import React from "react";
import { FeaturedProjectCard } from "./Project";
import Project from "./Project";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";
import projects from "../data/projects";

const featured = projects.filter((p) => p.featured);
const earlier  = projects.filter((p) => !p.featured);

export default function Projects() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
      <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
        <div className="w-full flex flex-col md:flex-row gap-10 justify-center">

          {/* ── Main Card ─────────────────────────────────────────────── */}
          <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
            <div className="hidden md:block"><Tabs /></div>
            <div className="p-6 md:p-8 flex flex-col gap-10">

              {/* ── Selected Work ─────────────────────────────────────── */}
              <section>
                <PageTitle title="Selected Work">
                  Production client projects, business tools, and product development.
                </PageTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {featured.map((proj) => (
                    <FeaturedProjectCard key={proj.id} project={proj} />
                  ))}
                </div>
              </section>

              {/* ── Earlier Projects ──────────────────────────────────── */}
              {earlier.length > 0 && (
                <section>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white">
                      Earlier Projects &amp; Experiments
                    </h3>
                    <p className="text-gray-500 text-[13px] mt-1 leading-relaxed">
                      Personal projects and learning experiments from an earlier stage.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {earlier.map((proj) => (
                      <Project key={proj.id} project={proj} />
                    ))}
                  </div>
                </section>
              )}

            </div>
          </div>

          <div className="hidden md:block"><Sidebar /></div>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}
