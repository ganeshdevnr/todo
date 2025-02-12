import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useTasks } from "../hooks/useTasks";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../App.css";

export default function Home() {
  const {
    tasks,
    handleAddTask,
    handleDeleteTask,
    handleToggleCompletion,
    handleDueDateChangeTask,
  } = useTasks();

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
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
            {user?.email}'s TODO
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
  );
}
