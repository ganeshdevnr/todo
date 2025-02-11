import AppRoutes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";

const darkTheme = createTheme({ palette: { mode: "dark" } });

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
