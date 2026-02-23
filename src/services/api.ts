import type { Project, Task } from "../types";

const API_BASE_URL = "http://localhost:5240/api";

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/projects`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  }
  
  return response.json();
}

export async function getTasks(projectId: number): Promise<Task[]> {
  const response = await fetch(`${API_BASE_URL}/tasks?projectId=${projectId}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  
  return response.json();
}