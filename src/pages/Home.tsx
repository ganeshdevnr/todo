import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTasks } from "../hooks/useTasks";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../App.css";

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function Home() {
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleToggleCompletion,
    handleDueDateChangeTask,
  } = useTasks();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
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
