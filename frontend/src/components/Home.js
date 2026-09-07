import React from "react";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";
import {
  SiShopify,
  SiReact,
  SiPython,
} from "react-icons/si";
import { FaCogs, FaBrain } from "react-icons/fa";
import profile from "../data/profile";

// Map service keys to icons
const serviceIcons = {
  shopify:  <SiShopify />,
  webapps:  <SiReact />,
  business: <FaCogs />,
  ai:       <FaBrain />,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
      <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
        <div className="w-full flex flex-col md:flex-row gap-10 justify-center">

          {/* ── Main Card ─────────────────────────────────────────────── */}
          <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
            <div className="hidden md:block"><Tabs /></div>
            <div className="p-6 md:p-8 flex flex-col gap-10">

              {/* ── About ─────────────────────────────────────────────── */}
              <section id="about">
                <PageTitle title="About">
                  Software developer. Mumbai, India.
                </PageTitle>
                <div className="body-copy space-y-4">
                  {profile.about.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* ── What I Build ──────────────────────────────────────── */}
              <section id="what-i-build">
                <h3 className="text-lg font-semibold text-white mb-5">
                  What I Build
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.services.map((s) => (
                    <div key={s.key} className="service-card">
                      <span className="service-icon">
                        {serviceIcons[s.key] || <FaCogs />}
                      </span>
                      <div>
                        <div className="font-semibold text-white mb-1 text-[15px]">
                          {s.title}
                        </div>
                        <div className="text-gray-400 text-[13px] leading-relaxed">
                          {s.description}
                        </div>
                      </div>
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