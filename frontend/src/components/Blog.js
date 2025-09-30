import React from "react";
import Sidebar from "./sidebar";
import SidebarMobile from "./SidebarMobile";
import PageTitle from "./PageTitle";
import Tabs from "./Tabs";
import BottomTabs from "./BottomTabs";


const blogs = [];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center relative pb-20 md:pb-0">
  <div className="w-full flex flex-col gap-6 pt-6 md:pt-12 px-4 max-w-6xl mx-auto">
        <SidebarMobile />
    <div className="w-full flex flex-col md:flex-row gap-10 justify-center">
  {/* Main Card */}
  <div className="flex-1 rounded-3xl shadow-xl flex flex-col bg-[#181818] border soft-border">
    <div className="hidden md:block"><Tabs /></div>
  <div className="p-8 flex flex-col gap-8">
          <PageTitle title="Blog" />
          {blogs.length === 0 ? (
            <div className="text-gray-400 text-sm">No blog posts yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog, idx) => (
                <div
                  key={idx}
                  className="bg-[#1d1d1d] rounded-2xl shadow hover:shadow-lg p-4 flex flex-col gap-3 border border-[#23221c]"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="rounded-xl h-40 object-cover w-full"
                    loading="lazy"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {blog.category} • {blog.date}
                  </div>
                  <div className="font-bold text-white text-lg mt-1 mb-1">{blog.title}</div>
                  <div className="text-gray-300 text-sm mb-2">
                    {blog.summary}
                  </div>
                </div>
              ))}
            </div>
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