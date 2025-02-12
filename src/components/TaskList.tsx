import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Archive } from "@mui/icons-material";
import IconAsDatePicker from "./IconAsDatePicker";
import { Task } from "../hooks/useTasks";
import TaskName from "./TaskName";
import TaskSkeleton from "./TaskSkeleton";

interface TaskListProps {
  tasks: Task[];
  onToggleCompletion: (id: number, status: string) => void;
  onDeleteTask: (id: number) => void;
  onDueDateChange: (id: number, date: any) => void;
}

export default function TaskList({
  tasks,
  onToggleCompletion,
  onDeleteTask,
  onDueDateChange,
}: TaskListProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <>
      <hr className="my-6" />

      <h2 className="text-2xl text-left">
        {loading
          ? "Loading..."
          : `${tasks.filter((t) => t.status === "Pending").length} Pending`}
      </h2>

      <ul className="mt-4">
        {loading ? (
          <TaskSkeleton count={3} />
        ) : (
          tasks
            .filter((task) => task.status === "Pending")
            .map((task) => (
              <li key={task.id} className="flex items-start gap-3">
                <Checkbox
                  onChange={() => onToggleCompletion(task.id, "Completed")}
                />
                <TaskName taskName={task.task_name} duedate={task.due_date} />
                <IconAsDatePicker
                  onDateSelect={(date: any) => onDueDateChange(task.id, date)}
                />
                <Archive
                  className="mt-2 cursor-pointer text-2xl text-gray-600 hover:text-green-500"
                  onClick={() => onDeleteTask(task.id)}
                />
              </li>
            ))
        )}
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl text-left">
        {loading
          ? "Loading..."
          : `${tasks.filter((t) => t.status === "Completed").length} Completed`}
      </h2>

      <ul className="mt-4">
        {loading ? (
          <TaskSkeleton count={3} />
        ) : (
          tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <li key={task.id} className="flex items-start gap-3">
                <Checkbox
                  defaultChecked
                  onChange={() => onToggleCompletion(task.id, "Pending")}
                />
                <TaskName taskName={task.task_name} duedate={task.due_date} />
                <Archive
                  className="mt-2 cursor-pointer text-2xl text-gray-600 hover:text-green-500"
                  onClick={() => onDeleteTask(task.id)}
                />
              </li>
            ))
        )}
      </ul>
    </>
  );
}
