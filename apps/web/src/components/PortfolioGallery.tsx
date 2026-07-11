"use client";

import { useState } from "react";

const categories = ["All", "Kitchen", "Bathroom", "Exterior"];
const projects = [
  { id: 1, title: "Project 1", category: "Kitchen" },
  { id: 2, title: "Project 2", category: "Bathroom" },
  { id: 3, title: "Project 3", category: "Exterior" },
  { id: 4, title: "Project 4", category: "Kitchen" },
];

export default function PortfolioGallery() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex gap-4 justify-center mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="bg-gray-200 h-64 rounded-lg hover:shadow-lg transition-shadow flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">{project.category}</p>
              <p className="text-gray-900 font-bold text-lg">{project.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
