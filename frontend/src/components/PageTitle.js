import React from "react";

export default function PageTitle({ title, className = "", children }) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-3xl font-semibold text-white accent-underline">
        {title}
      </h2>
      {children && (
        <p className="text-gray-400 text-sm mt-2 max-w-3xl leading-relaxed">{children}</p>
      )}
    </div>
  );
}
