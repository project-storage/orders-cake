import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ThemeProvider } from "@emotion/react";
import theme from "./configs/theme.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";


createRoot(document.getElementById("root")!).render(
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
