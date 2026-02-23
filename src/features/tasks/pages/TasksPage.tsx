import { useState } from "react";
import Hero from "../components/Hero";
import TaskList from "../components/TaskList";

interface SelectedProject {
  id: number;
  name: string;
}

function TasksPage() {
  const [selectedProject, setSelectedProject] = useState<SelectedProject | null>(null);

  if (selectedProject) {
    return (
      <div>
        <button
          onClick={() => setSelectedProject(null)}
          className="m-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
        >
          ← Back to Projects
        </button>
        <TaskList
          projectId={selectedProject.id}
          projectName={selectedProject.name}
        />
      </div>
    );
  }

  return <Hero onSelectProject={setSelectedProject} />;
}

export default TasksPage;