import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import profile from "../data/profile";

export default function SidebarMobile() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden w-full flex flex-col gap-4">
      <div className="bg-[#181818] border border-[#262626] rounded-3xl shadow-xl p-4 flex items-start gap-4 relative">
        <img
          src={profile.avatar}
          alt={profile.name}
          width="80"
          height="80"
          decoding="async"
          className="w-20 h-20 rounded-xl object-cover"
          loading="lazy"
        />
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-start justify-between">
            <h1 className="text-xl font-bold text-white leading-6">{profile.name}</h1>
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? "Collapse details" : "Expand details"}
              className="ml-2 shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#222] text-gray-300 hover:text-white transition"
            >
              <FaChevronDown className={"transition-transform duration-300 text-[#ffdb70] " + (open ? "rotate-180" : "rotate-0")} />
            </button>
          </div>
          <span className="inline-block px-3 py-1 bg-[#22221e] text-[#ffdb70] rounded-full text-xs font-medium w-fit">{profile.role || profile.tagline}</span>
          <div className="flex items-center gap-4 text-lg text-gray-400">
            {profile.socials?.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#ffdb70]"><FaLinkedin /></a>
            )}
            {profile.socials?.github && (
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#ffdb70]"><FaGithub /></a>
            )}
            {profile.socials?.twitter && (
              <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-[#ffdb70]"><FaTwitter /></a>
            )}
            {profile.socials?.leetcode && (
              <a href={profile.socials.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="hover:text-[#ffdb70]"><SiLeetcode /></a>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          "bg-[#181818] border border-[#262626] rounded-3xl shadow-xl overflow-hidden transition-[max-height,opacity] duration-400 " +
          (open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")
        }
        aria-hidden={!open}
      >
        <div className="p-5 flex flex-col gap-5 text-gray-400 text-sm">
          <div className="flex items-center gap-3"><FaEnvelope className="text-[#ffdb70]" /><span>{profile.contact.email}</span></div>
          <div className="flex items-center gap-3"><FaPhoneAlt className="text-[#ffdb70]" /><span>{profile.contact.phone}</span></div>
          <div className="flex items-center gap-3"><FaMapMarkerAlt className="text-[#ffdb70]" /><span>{profile.contact.location}</span></div>
        </div>
      </div>
    </div>
  );
}
