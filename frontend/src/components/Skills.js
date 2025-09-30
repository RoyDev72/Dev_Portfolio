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
  SiSass,
  SiCss3,
  SiTailwindcss,
  SiBootstrap,
  SiWordpress,
  SiShopify,
  SiExpress,
  SiNodedotjs,
  SiFlask,
  SiDjango,
  SiIonic,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiAmazonwebservices,
  SiDocker,
  SiLinux,
  SiGit,
  SiVite,
  SiPostman,
  SiExpo,
  SiMysql,
  SiTerraform,
  SiKubernetes,
  SiGithub,
  SiSpring
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";

// Map skill names to icon components & brand colors.
const skillMeta = {
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  Python: { icon: SiPython, color: "#3776AB" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Java: { icon: FaJava, color: "#007396" },
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  Redux: { icon: SiRedux, color: "#764ABC" },
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  Sass: { icon: SiSass, color: "#CC6699" },
  CSS3: { icon: SiCss3, color: "#1572B6" },
  TailwindCSS: { icon: SiTailwindcss, color: "#38BDF8" },
  Bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  WordPress: { icon: SiWordpress, color: "#21759B" },
  Shopify: { icon: SiShopify, color: "#95BF47" },
  Express: { icon: SiExpress, color: "#FFFFFF" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  Flask: { icon: SiFlask, color: "#FFFFFF" },
  Django: { icon: SiDjango, color: "#092E20" },
  "Spring Boot": { icon: SiSpring, color: "#6DB33F" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  Expo: { icon: SiExpo, color: "#000020" },
  Ionic: { icon: SiIonic, color: "#3880FF" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  NoSQL: { icon: FaDatabase, color: "#999999" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  AWS: { icon: SiAmazonwebservices, color: "#FF9900" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Linux: { icon: SiLinux, color: "#FCC624" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#FFFFFF" },
  Terraform: { icon: SiTerraform, color: "#623CE4" },
  Kubernetes: { icon: SiKubernetes, color: "#326CE5" },
  Vite: { icon: SiVite, color: "#646CFF" },
  Postman: { icon: SiPostman, color: "#FF6C37" }
};

const SkillIcon = ({ name }) => {
  const meta = skillMeta[name];
  if (!meta) {
    return (
      <div
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[#ffdb70] transition-colors text-[10px] md:text-xs text-gray-300 text-center px-1"
        title={name}
      >{name}</div>
    );
  }
  const { icon: Icon, color } = meta;
  return (
    <div
      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a] hover:border-[#ffdb70] transition-colors"
      title={name}
      aria-label={name}
    >
      <Icon style={{ color }} className="text-[26px] md:text-[30px]" />
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
            <div className="hidden md:block"><Tabs /></div>
            <div className="p-8 flex flex-col gap-6 text-[15px] leading-relaxed">
              <PageTitle title="Skills" />
              {profile.resume && (
                <div className="mt-0 space-y-5">
                  <p className="text-white-500 text-sm max-w-xl">It focuses on Frontend & Backend Engineering, DevOps practices, and consistent DSA problem solving.</p>
                  <a
                    href={profile.resume}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#ffdb70] text-[#111] font-semibold text-sm shadow hover:brightness-95 active:scale-[.97] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffdb70]/60"
                  >
                    <span>Download My Resume</span>
                  </a>
                </div>
              )}
              {/* Education */}
              <div>
                <h3 className="text-lg font-semibold text-white mt-4 mb-3">Education</h3>
                <div className="flex flex-col gap-4">
                  {profile.education.map((ed, i) => (
                    <div key={i} className="text-gray-400 ml-2">
                      <span className="font-bold text-[#ffdb70]">{ed.institution}</span> <span className="text-white font-semibold">| {ed.period}</span><br />
                      {ed.program}{ed.notes &&  <span className="text-gray-500"> — {ed.notes} </span>}
                    </div>
                  ))}
                </div>
              </div>
              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 mt-4">My Skills</h3>
                <div className="bg-[#161616] rounded-2xl p-6 flex flex-col gap-6 border border-[#2a2a2a] text-sm">
                  {Object.entries(profile.skills).map(([category, list]) => (
                    <div key={category} className="flex flex-col gap-2">
                      <span className="text-white font-semibold">{category}</span>
                      <div className="flex flex-wrap gap-4">
                        {list.map(skill => (
                          <SkillIcon key={skill} name={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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
