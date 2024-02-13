import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/SuperAdmin/Dashboard";
import Manage from "./pages/SuperAdmin/Manage";
import ViewData from "./pages/SuperAdmin/ViewData";
import AuthLayout from "./layouts/AuthLayout";
import {
  DASHBOARD_PATH,
  DEPARTMENTSTU_PATH,
  LOGIN_PATH,
  MANAGE_PATH,
  PRODUCT_PATH,
  STUDENT_PATH,
  TEACHER_PATH,
  VIEWDATA_PATH,
} from "./config/constants";
import AdminLayout from "./layouts/SuperAdminLayout";
import Products from "./pages/SuperAdmin/Products";
import Students from "./pages/SuperAdmin/Students";
import Teachers from "./pages/SuperAdmin/Teachers";
import DepartmentStu from "./pages/SuperAdmin/DepartmentStu";

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
              <Route element={<AuthLayout />}>
                <Route path={LOGIN_PATH} element={<Login />} />
              </Route>

              <Route element={<AdminLayout />}>
                <Route path={DASHBOARD_PATH} element={<Dashboard />} />
                <Route path={MANAGE_PATH} element={<Manage />} />
                <Route path={VIEWDATA_PATH} element={<ViewData />} />
                <Route path={PRODUCT_PATH} element={<Products />} />
                <Route path={`${STUDENT_PATH}/:id`} element={<Students />} />
                <Route path={TEACHER_PATH} element={<Teachers />} />
                <Route path={DEPARTMENTSTU_PATH} element={<DepartmentStu />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
