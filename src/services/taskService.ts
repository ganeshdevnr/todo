import { supabase } from "../supabase";

// Fetch all tasks
export const getTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) throw new Error(error.message);
  return data;
};

// Insert a new task
export const addTask = async (task: string) => {
  const { data, error } = await supabase.from("tasks").insert([
    {
      task_name: task,
      status: "Pending",
      uid: localStorage.getItem("uid"),
    },
  ]);
  if (error) throw new Error(error.message);
  return data;
};

// Delete a task by ID
export const deleteTask = async (taskId: number) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);
  if (error) throw new Error(error.message);
  return data;
};

// Update a task's completion status
export const toggleTaskCompletion = async (taskId: number, status: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId);
  if (error) throw new Error(error.message);
  return data;
};

// Update a task's completion status
export const updateDueDate = async (taskId: number, duedate: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .update({ due_date: duedate })
    .eq("id", taskId);
  if (error) throw new Error(error.message);
  return data;
};
