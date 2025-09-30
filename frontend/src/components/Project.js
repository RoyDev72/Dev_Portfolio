import React from "react";

export default function Project({
  image,
  title,
  type,
  tags,
  collaborative,
  inProgress,
  live,
  repo,
}) {
  return (
    <div className="bg-[#181818] rounded-2xl shadow-md p-3 flex flex-col hover:bg-[#22221c] transition border border-[#23221c]">
      <img
        src={image}
        alt={title}
        className="rounded-xl h-32 object-cover mb-4 w-full bg-[#23221c]"
      />
      <span className="font-bold text-white text-md mb-1">{title}</span>
      <span className="text-xs text-gray-400 font-medium">
        {type}
  {collaborative && <span className="ml-2 bg-[#ffdb70]/10 text-[#ffdb70] rounded px-2 py-0.5">Collaborative</span>}
  {inProgress && <span className="ml-2 bg-[#ffdb70]/10 text-[#ffdb70] rounded px-2 py-0.5">In Progress</span>}
      </span>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags?.map((tag) => (
          <span key={tag} className="text-xs text-gray-500 bg-[#23221c] px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      {(live || repo) && (
        <div className="mt-3 flex gap-2">
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[11px] font-medium px-3 py-1.5 rounded-md bg-[#ffdb70] text-[#111] hover:brightness-95 active:scale-[.97] transition"
            >See It</a>
          )}
          {repo && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[11px] font-medium px-3 py-1.5 rounded-md border border-[#30302a] text-gray-300 hover:text-[#ffdb70] hover:border-[#ffdb70] transition"
            >Repo</a>
          )}
        </div>
      )}
    </div>
  );
}