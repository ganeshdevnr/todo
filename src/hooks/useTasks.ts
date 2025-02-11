import { useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  getTasks,
  toggleTaskCompletion,
  updateDueDate,
} from "../services/taskService";
import dayjs from "dayjs";

export type Task = {
  id: number;
  task_name: string;
  status: string;
  due_date: string;
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function handleAddTask(taskName: string) {
    if (!taskName.trim()) return;
    await addTask(taskName);
    fetchTasks();
  }

  async function handleDeleteTask(id: number) {
    await deleteTask(id);
    fetchTasks();
  }

  async function handleToggleCompletion(id: number, status: string) {
    await toggleTaskCompletion(id, status);
    fetchTasks();
  }

  async function handleDueDateChangeTask(id: number, date: any) {
    const formattedDate = dayjs(date).format("YYYY-MM-DD") + "T00:00:00.000Z";
    await updateDueDate(id, formattedDate);
    fetchTasks();
  }

  return {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleToggleCompletion,
    handleDueDateChangeTask,
  };
}
