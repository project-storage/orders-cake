import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ThemeProvider } from "@emotion/react";
import theme from "./configs/theme.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProSidebarProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </ProSidebarProvider>
  </StrictMode>
);
