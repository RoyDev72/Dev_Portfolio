import React from "react";
import profile from "../data/profile";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";
import {
  SiTypescript,
  SiPython,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiShopify,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiAmazonwebservices,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithub,
  SiTerraform,
  SiMysql,
} from "react-icons/si";
import { FaCode, FaRobot, FaServer, FaCogs, FaProjectDiagram } from "react-icons/fa";

// Map skill names to icon components & brand colors.
const skillMeta = {
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss3, color: "#1572B6" },
  TailwindCSS: { icon: SiTailwindcss, color: "#38BDF8" },
  Shopify: { icon: SiShopify, color: "#95BF47" },
  "Shopify Themes": { icon: SiShopify, color: "#95BF47" },
  Liquid: { icon: FaCode, color: "#95BF47" },
  "Shopify APIs": { icon: SiShopify, color: "#7AB55C" },
  "Storefront Customisation": { icon: FaCode, color: "#95BF47" },
  Express: { icon: SiExpress, color: "#EEEEEE" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "REST APIs": { icon: FaServer, color: "#48BB78" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  AWS: { icon: SiAmazonwebservices, color: "#FF9900" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
  Terraform: { icon: SiTerraform, color: "#844FBA" },
  "AI APIs": { icon: FaRobot, color: "#10B981" },
  "Automation Workflows": { icon: FaCogs, color: "#F59E0B" },
  "Data Processing": { icon: FaProjectDiagram, color: "#6366F1" }
};

const SkillPill = ({ name }) => {
  const meta = skillMeta[name];
  const Icon = meta ? meta.icon : FaCode;
  const color = meta ? meta.color : "#ffdb70";

  return (
    <div
      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#161616] border border-[#242424] hover:border-[#ffdb70]/50 hover:bg-[#1c1c1c] transition-all group cursor-default shadow-sm"
      title={name}
    >
      <Icon style={{ color }} className="text-lg shrink-0 transition-transform group-hover:scale-110 duration-200" />
      <span className="text-[13px] font-medium text-gray-300 group-hover:text-white transition-colors">
        {name}
      </span>
    </div>
  );
};

export default function Skills() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
      <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
        <div className="w-full flex flex-col md:flex-row gap-10 justify-center">
          {/* Main Card */}
          <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
            <div className="hidden md:block">
              <Tabs />
            </div>
            <div className="p-6 md:p-8 flex flex-col gap-8 text-[15px] leading-relaxed">
              <PageTitle title="Technical Skills" />

              {/* Header intro & Resume CTA */}
              {profile.resume && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] border border-[#222222] rounded-2xl p-5">
                  <div className="space-y-1">
                    <p className="text-white font-medium text-sm">
                      Full-Stack & E-Commerce Engineering
                    </p>
                    <p className="text-gray-400 text-xs max-w-md">
                      Production technologies focused on scalable web apps, custom Shopify stores, API design, and automation.
                    </p>
                  </div>
                  <a
                    href={profile.resume}
                    download="Shivam_Roy_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#ffdb70] text-[#111] font-semibold text-xs shadow hover:brightness-95 active:scale-[.97] transition flex-shrink-0"
                  >
                    <span>Download Resume</span>
                  </a>
                </div>
              )}

              {/* Categorized Skills Grid */}
              <div className="flex flex-col gap-6">
                {Object.entries(profile.skills).map(([category, list]) => (
                  <div key={category} className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ffdb70]" />
                      <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                        {category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                      {list.map((skill) => (
                        <SkillPill key={skill} name={skill} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          <div className="hidden md:block">
            <Sidebar />
          </div>
        </div>
      </div>
      <BottomTabs />
    </div>
  );
}
