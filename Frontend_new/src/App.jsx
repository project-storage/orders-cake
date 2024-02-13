import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/SuperAdmin/Dashboard";
import Manage from "./pages/SuperAdmin/Manage";
import ViewData from "./pages/SuperAdmin/ViewData";
import AuthLayout from "./layouts/AuthLayout";
import {
  ADMIN_PATH,
  DASHBOARD_PATH,
  DEPARTMENTSTU_PATH,
  FINANECE_PATH,
  LOGIN_PATH,
  MANAGE_PATH,
  PRODUCT_PATH,
  SINGLE_PATH,
  STUDENT_PATH,
  TEACHER_PATH,
  TEAM_PATH,
  VIEWDATA_PATH,
} from "./config/constants";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import Products from "./pages/SuperAdmin/Products";
import Students from "./pages/SuperAdmin/Students";
import Teachers from "./pages/SuperAdmin/Teachers";
import DepartmentStu from "./pages/SuperAdmin/DepartmentStu";
import Admins from "./pages/SuperAdmin/Admins";
import Finances from './pages/SuperAdmin/Finances';
import Teams from "./pages/SuperAdmin/Teams";
import Singles from "./pages/SuperAdmin/Singles";

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

              <Route element={<SuperAdminLayout />}>
                <Route path={DASHBOARD_PATH} element={<Dashboard />} />
                <Route path={MANAGE_PATH} element={<Manage />} />
                <Route path={VIEWDATA_PATH} element={<ViewData />} />
                <Route path={PRODUCT_PATH} element={<Products />} />
                <Route path={`${STUDENT_PATH}/:id`} element={<Students />} />
                <Route path={TEACHER_PATH} element={<Teachers />} />
                <Route path={DEPARTMENTSTU_PATH} element={<DepartmentStu />} />
                <Route path={ADMIN_PATH} element={<Admins />} />
                <Route path={FINANECE_PATH} element={<Finances />} />
                <Route path={TEAM_PATH} element={< Teams/>} />
                <Route path={SINGLE_PATH} element={< Singles/>} />
              </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
