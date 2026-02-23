export type Project = {
  id: number;
  name: string;
  tasks: number;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  projectId: number;
  createdAt: string;
};