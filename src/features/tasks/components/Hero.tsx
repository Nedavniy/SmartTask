import { ClipboardIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { useFetch } from "../../../hooks/useFetch";
import { getProjects } from "../../../services/api";
import type { Project } from "../../../types";
import { useState } from "react";

interface HeroProps {
  onSelectProject: (project: { id: number; name: string }) => void;
}

function Hero({ onSelectProject }: HeroProps) {
  const { data: projects, loading } = useFetch<Project[]>(() => getProjects());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "tasks">("name");

  if (loading)
    return <p className="text-center py-12 text-white">Loading projects...</p>;

  const filteredProjects = projects?.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return b.tasks - a.tasks;
  });

  return (
    <section className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">Welcome to SmartTask</h1>
          <p className="text-gray-400 text-lg">Manage your projects and tasks efficiently</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "tasks")}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="tasks">Sort by Tasks</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProjects.map(project => (
            <div
              key={project.id}
              className="bg-linear-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-64 border border-gray-700 hover:border-red-600"
            >
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-3">
                    <ClipboardIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Tasks</span>
                    <span className="font-semibold text-red-400">{project.tasks}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${(project.tasks / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onSelectProject({ id: project.id, name: project.name })}
                className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg font-semibold transition-colors w-full"
              >
                View Tasks
              </button>
            </div>
          ))}
        </div>

        {sortedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No projects found</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hero;