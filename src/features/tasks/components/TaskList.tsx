import { useState } from "react";
import { CheckCircleIcon, ClockIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useFetch } from "../../../hooks/useFetch";
import { getTasks } from "../../../services/api";
import type { Task } from "../../../types";

interface TaskListProps {
  projectId: number;
  projectName: string;
}

function TaskList({ projectId, projectName }: TaskListProps) {
  const { data: tasks, loading } = useFetch<Task[]>(() => getTasks(projectId));
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "in-progress" | "completed">("all");

  if (loading)
    return <p className="text-center py-12 text-white">Loading tasks...</p>;

  const pendingTasks = tasks?.filter(t => t.status === "pending") || [];
  const inProgressTasks = tasks?.filter(t => t.status === "in-progress") || [];
  const completedTasks = tasks?.filter(t => t.status === "completed") || [];

  const getFilteredTasks = () => {
    if (filterStatus === "pending") return pendingTasks;
    if (filterStatus === "in-progress") return inProgressTasks;
    if (filterStatus === "completed") return completedTasks;
    return tasks || [];
  };

  const filteredTasks = getFilteredTasks();
  const stats = {
    total: tasks?.length || 0,
    pending: pendingTasks.length,
    inProgress: inProgressTasks.length,
    completed: completedTasks.length,
  };

  return (
    <section className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-2">{projectName}</h1>
          <p className="text-gray-400">Manage your project tasks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Tasks" value={stats.total} color="bg-blue-600" />
          <StatCard label="Pending" value={stats.pending} color="bg-yellow-600" />
          <StatCard label="In Progress" value={stats.inProgress} color="bg-purple-600" />
          <StatCard label="Completed" value={stats.completed} color="bg-green-600" />
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === "all"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            All Tasks ({stats.total})
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === "pending"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilterStatus("in-progress")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === "in-progress"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            In Progress ({stats.inProgress})
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              filterStatus === "completed"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:text-white"
            }`}
          >
            Completed ({stats.completed})
          </button>
        </div>

        {filterStatus === "all" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <KanbanColumn
              title="Pending"
              icon={ExclamationCircleIcon}
              tasks={pendingTasks}
              color="yellow"
            />
            <KanbanColumn
              title="In Progress"
              icon={ClockIcon}
              tasks={inProgressTasks}
              color="blue"
            />
            <KanbanColumn
              title="Completed"
              icon={CheckCircleIcon}
              tasks={completedTasks}
              color="green"
            />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <TaskCardLarge key={task.id} task={task} />
            ))}
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No tasks in this category</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <div className="flex items-center">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
          <span className="text-white text-2xl font-bold">{value}</span>
        </div>
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  icon: React.ComponentType<{ className: string }>;
  tasks: Task[];
  color: "yellow" | "blue" | "green";
}

function KanbanColumn({ title, icon: Icon, tasks, color }: KanbanColumnProps) {
  const colorMap = {
    yellow: "text-yellow-400",
    blue: "text-blue-400",
    green: "text-green-400",
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-700">
        <Icon className={`w-6 h-6 ${colorMap[color]} mr-2`} />
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="ml-auto bg-gray-700 px-3 py-1 rounded-full text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const statusColors = {
    pending: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
    "in-progress": "bg-blue-500/10 border-blue-500/30 text-blue-300",
    completed: "bg-green-500/10 border-green-500/30 text-green-300",
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">
            {task.title}
          </h3>
          <p className="text-gray-300 text-sm mt-1">{task.description}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      <p className="text-gray-400 text-xs mt-3">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

function TaskCardLarge({ task }: { task: Task }) {
  const statusColors = {
    pending: "bg-yellow-600 hover:bg-yellow-500",
    "in-progress": "bg-blue-600 hover:bg-blue-500",
    completed: "bg-green-600 hover:bg-green-500",
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
          <p className="text-gray-300">{task.description}</p>
        </div>
        <button className={`px-4 py-2 rounded-lg text-white font-semibold transition-colors ${statusColors[task.status]}`}>
          {task.status}
        </button>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <span>ID: {task.id}</span>
        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default TaskList;