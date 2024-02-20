import React from "react";
import ReactDOM from "react-dom/client"; // Update the import statement
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { ProSidebarProvider } from "react-pro-sidebar";
import theme from "./config/theme.jsx";

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Prompt", "sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);
