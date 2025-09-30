import React from "react";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";
import { FaRegFileCode, FaServer, FaTools, FaPenNib, FaBrain } from "react-icons/fa";
import profile from "../data/profile";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
      <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
    <div className="w-full flex flex-col md:flex-row gap-10 justify-center">

  {/* Main Card */}
  <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
          <div className="hidden md:block"><Tabs /></div>
          <div className="p-8 flex flex-col gap-8">
          {/* About */}
          <div id="about">
            <PageTitle title="About Me" />
            <div className="body-copy space-y-4">
              {profile.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
          {/* Skills / Services */}
          <div id="skills">
            <h3 className="text-lg font-semibold text-white mb-4">What I'm Doing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {profile.services.map(s => {
                const Icon = s.key === 'frontend' ? FaRegFileCode
                  : s.key === 'backend' ? FaServer
                  : s.key === 'devops' ? FaTools
                  : s.key === 'dsa' ? FaBrain
                  : FaPenNib;
                return (
                  <div key={s.key} className={`bg-[#161616] rounded-xl p-5 flex items-start gap-4 hover:bg-[#1b1b1b] transition border soft-border ${s.wide ? 'sm:col-span-2' : ''}`}>
                    <span className="w-10 h-10 rounded-lg bg-[#1e1e1e] flex items-center justify-center text-[#ffdb70] text-xl"><Icon /></span>
                    <div>
                      <div className="font-semibold text-white mb-1">{s.title}</div>
                      <div className="text-gray-400 text-sm">{s.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> {/* end What I'm Doing */}
          {/* Projects placeholder */}
          <div id="projects">{/* Projects are rendered on Projects page; anchor kept for consistency */}</div>
          {/* Blog placeholder */}
          <div id="blog">{/* Blog is intentionally empty */}</div>
          {/* Contact anchor */}
          <div id="contact">{/* Contact form lives on Contact page but anchor reserved */}</div>
    </div> {/* end content container */}
  </div> {/* end main card */}
  <div className="hidden md:block"><Sidebar /></div>
  </div> {/* inner flex row wrapper */}
      </div> {/* outer content wrapper */}
      <BottomTabs />
    </div>
  );
}