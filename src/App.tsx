import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import { useTasks } from "./hooks/useTasks";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import "./App.css";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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

        <Box>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                className="text-center"
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                MY TODO APP
              </Typography>

              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>

          <div id="app-body">
            <TaskInput onAddTask={handleAddTask} />
            <TaskList
              tasks={tasks}
              onToggleCompletion={handleToggleCompletion}
              onDeleteTask={handleDeleteTask}
              onDueDateChange={handleDueDateChangeTask}
            />
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
}
