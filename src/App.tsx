import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  addTask,
  deleteTask,
  getTasks,
  toggleTaskCompletion,
  updateDueDate,
} from "./taskService";
import { filter, fromEvent, map } from "rxjs";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Archive, Timer } from "@mui/icons-material";
import Task from "./components/common/TaskName";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import IconAsDatePicker from "./components/common/IconAsDatePicker";

dayjs.extend(utc);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export type Task = {
  id: number;
  task_name: string;
  status: string;
  due_date: string; // ISO string format for timestamps
};

function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Load all the tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!inputRef.current) return;

    const subscription = fromEvent(inputRef.current, "keydown")
      .pipe(
        filter((event: any) => event.key === "Enter"), // Only process Enter key
        map((event: any) => event.target.value)
      )
      .subscribe(async (taskName) => {
        await handleAddTask(taskName);
        fetchTasks(); // Refresh tasks after adding
        setTask(taskName);
        if (inputRef.current) inputRef.current.value = "";
      });

    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, [task]);

  async function fetchTasks() {
    try {
      const data = await getTasks();
      //const pendingTasks = data.filter(t => t.status === 'Pending');
      setTasks(data);
    } catch (error: any) {
      console.log("Error fetching tasks:", error.message);
    }
  }

  async function handleAddTask(taskName: string) {
    if (!taskName.trim()) return;

    try {
      await addTask(taskName);
    } catch (error: any) {
      console.error("Error adding task:", error.message);
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error: any) {
      console.error("Error deleting task:", error.message);
    }
  }

  async function handleToggleCompletion(id: number, status: string) {
    try {
      await toggleTaskCompletion(id, status);
      fetchTasks(); // Refresh tasks after updating
    } catch (error: any) {
      console.error("Error updating task:", error.message);
    }
  }

  async function handleDueDateChangeTask(id: number, args: any) {
    // Remove timezone and treat it as UTC
    const formattedDate = dayjs(args).format("YYYY-MM-DD") + "T00:00:00.000Z";

    await updateDueDate(id, formattedDate);
    fetchTasks();
  }

  const archiveStyle =
    "ml-auto mt-2 cursor-pointer text-gray-600 hover:text-green-500";

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <input
          ref={inputRef}
          placeholder="Enter Task Description"
          className="w-full opacity-90 focus:outline-none bg-gray-300  text-black px-2 py-2"
          type="text"
        />

        <hr className="my-6" />

        <h2 className="text-2xl text-left">
          {tasks.filter((t) => t.status === "Pending").length} Pending
        </h2>
        <ul className="mt-4">
          {tasks
            .filter((task) => task.status === "Pending")
            .map((task) => (
              <li
                key={task.id}
                className="text-gray-300 text-left p-0 m-0 -ml-3 flex flex-row gap-3 items-start justify-between"
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    onChange={() =>
                      handleToggleCompletion(task.id, "Completed")
                    }
                  />

                  <Task taskName={task.task_name} duedate={task.due_date} />
                </div>

                <IconAsDatePicker
                  onDateSelect={(args: any) =>
                    handleDueDateChangeTask(task.id, args)
                  }
                />

                <Archive
                  onClick={() => handleDeleteTask(task.id)}
                  titleAccess="Delete"
                  className={archiveStyle}
                />
              </li>
            ))}
        </ul>

        <hr className="my-6" />
        <h2 className="text-2xl text-left">
          {tasks.filter((t) => t.status === "Completed").length} Completed
        </h2>
        <ul className="mt-4">
          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <li
                key={task.id}
                className="text-gray-300 text-left p-0 m-0 -ml-3 flex flex-row gap-3 items-center"
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    defaultChecked
                    onChange={() => handleToggleCompletion(task.id, "Pending")}
                  />
                  <Task taskName={task.task_name} duedate={task.due_date} />
                </div>

                <div className="ml-auto flex gap-3">
                  <Archive
                    onClick={() => handleDeleteTask(task.id)}
                    titleAccess="Delete"
                    className={archiveStyle}
                  />
                </div>
              </li>
            ))}
        </ul>
      </ThemeProvider>
    </>
  );
}

export default App;
