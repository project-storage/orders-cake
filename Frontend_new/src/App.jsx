import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/admin/Dashboard";
import Manage from "./pages/admin/Manage";
import ViewData from "./pages/admin/ViewData";
import AuthLayout from "./layouts/AuthLayout";
import { DASHBOARD_PATH, LOGIN_PATH, MANAGE_PATH, PRODUCT_PATH, VIEWDATA_PATH } from "./config/constants";
import AdminLayout from "./layouts/AdminLayout";
import Product from "./pages/admin/Product";

const defaultTheme = createTheme({
  typography: {
    fontFamily: ["Prompt", "sans-serif"].join(","),
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout/>}>
              <Route path={LOGIN_PATH} element={<Login/>}/>
            </Route>

            <Route element={<AdminLayout/>}>
              <Route path={DASHBOARD_PATH} element={<Dashboard/>} />
              <Route path={MANAGE_PATH} element={<Manage/>} />
              <Route path={VIEWDATA_PATH} element={<ViewData/>}/>
              <Route path={PRODUCT_PATH} element={<Product/>}/>
            </Route>
            
          </Routes>
        </BrowserRouter>
        
      </ThemeProvider>
    </>
  );
}

export default App;
