import { useEffect, useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/solid";

type Project = {
  id: number;
  name: string;
  tasks: number;
};

function Hero() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5240/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center py-12 text-white">Loading projects...</p>;

  return (
    <section className="bg-gray-900 text-white py-12 px-6">
      <h1 className="text-4xl font-bold !mb-8 text-center">Welcome to SmartTask</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-gray-800 !p-6 rounded-xl shadow-lg hover:!shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between h-64"
          >
            <div>
              <div className="flex items-center !mb-4">
                <ClipboardIcon className="w-6 h-6 text-white !mr-2" />
                <h2 className="!text-xl !font-semibold">{project.name}</h2>
              </div>
              <p className="text-gray-300 mb-4">{project.tasks} tasks</p>
            </div>
            <button className="!bg-red-600 hover:!bg-red-500 px-4 !py-2 !rounded-lg !font-semibold !transition-colors !mt-auto">
              View
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;