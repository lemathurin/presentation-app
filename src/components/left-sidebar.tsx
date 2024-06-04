import React from "react";
import "../index.css";

interface LeftSidebarProps {
  text: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ text }) => {
  const segments = text.split(/---|&&&|—/);

  return (
    <div className="h-full bg-secondary overflow-auto p-2 min-w-36">
      {segments.map((segment, index) => (
        <div
          key={index}
          className="mb-4 aspect-[5/3] p-2 bg-white text-black border border-gray-300 rounded shadow"
        >
          <pre>{segment.trim()}</pre>
        </div>
      ))}
    </div>
  );
};

export default LeftSidebar;
