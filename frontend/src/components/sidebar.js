import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaTwitter } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import profile from "../data/profile";

export default function Sidebar({ mobile = false }) {
  const containerClasses = mobile
    ? "w-full card px-8 pt-8 pb-12 flex flex-col items-center"
    : "card px-8 pt-10 pb-14 flex flex-col items-center min-w-[300px] max-w-[360px] mx-auto md:mx-0 md:sticky md:top-4 md:self-start";
  return (
    <aside className={containerClasses}>
      {profile.avatar && (
        <img
          src={profile.avatar}
          alt={profile.name}
          width="208"
          height="208"
          decoding="async"
          className="w-52 h-52 rounded-2xl object-cover mb-8 shadow-lg"
          loading="lazy"
        />
      )}
      <h1 className="sidebar-name mb-5 text-center w-full">{profile.name}</h1>
      {profile.role && <span className="sidebar-role mb-8 inline-block">{profile.role}</span>}
      <div className="flex gap-3 mb-10">
        {profile.socials?.linkedin && <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-btn"><FaLinkedin /></a>}
        {profile.socials?.twitter && <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-btn"><FaTwitter /></a>}
        {profile.socials?.github && <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-btn"><FaGithub /></a>}
  {profile.socials?.leetcode && <a href={profile.socials.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="social-btn"><SiLeetcode /></a>}
      </div>
      <div className="w-full flex flex-col gap-6 text-gray-300">
        <div className="contact-item">
          <span className="contact-icon"><FaEnvelope /></span>
          <div className="contact-meta">
            <span className="contact-label">Email</span>
            <span className="truncate max-w-[190px]">{profile.contact.email}</span>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon"><FaPhoneAlt /></span>
          <div className="contact-meta">
            <span className="contact-label">Phone</span>
            <span>{profile.contact.phone}</span>
          </div>
        </div>
        <div className="contact-item">
          <span className="contact-icon"><FaMapMarkerAlt /></span>
          <div className="contact-meta">
            <span className="contact-label">Location</span>
            <span>{profile.contact.location}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
