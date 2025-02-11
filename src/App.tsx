import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { useTasks } from "./hooks/useTasks";

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function App() {
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleToggleCompletion,
    handleDueDateChangeTask,
  } = useTasks();

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <TaskInput onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleCompletion={handleToggleCompletion}
          onDeleteTask={handleDeleteTask}
          onDueDateChange={handleDueDateChangeTask}
        />
      </ThemeProvider>
    </>
  );
}
