import React, { useState, useMemo } from "react";
import Project from "./Project";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";
import projects from "../data/projects";

const categories = [
  "All",
  ...Array.from(new Set(projects.flatMap(p => p.tags || [])))
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(() => (
    selectedCategory === "All"
      ? projects
      : projects.filter(p => p.tags?.includes(selectedCategory))
  ), [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
  <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
    <div className="w-full flex flex-col md:flex-row gap-10 justify-center">
  {/* Main Card */}
  <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
    <div className="hidden md:block"><Tabs /></div>
  <div className="p-8 flex flex-col gap-8">
          <PageTitle title="Projects" />
          {/* Categories */}
          <div className="flex flex-wrap gap-2.5 mb-5 text-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-1 rounded-full text-sm font-medium border
                  ${
                    selectedCategory === cat
                      ? "bg-[#ffdb70]/10 border-[#ffdb70] text-[#ffdb70]"
                      : "bg-transparent border-[#23221c] text-gray-300 hover:text-[#ffdb70] hover:border-[#ffdb70]"
                  }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProjects.map((proj, idx) => (
              <Project {...proj} key={idx} />
            ))}
          </div>
    </div>
  </div>
  <div className="hidden md:block"><Sidebar /></div>
  </div>
  </div>
  <BottomTabs />
    </div>
  );
}
