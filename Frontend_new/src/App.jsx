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
  ORDERALL_ADMINPATH,
  ORDERSTU_TEACHERPATH,
  ORDER_FINANCEPATH,
  ORDER_GIVINGPATH,
  PRODUCT_PATH,
  REGISTER_PATH,
  ROOMSTU_TEACHERPATH,
  ROOM_TEACHERPATH,
  SETTING_ADMINPATH,
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
import Finances from "./pages/SuperAdmin/Finances";
import Teams from "./pages/SuperAdmin/Teams";
import Singles from "./pages/SuperAdmin/Singles";
import Register from "./pages/Auth/Register";
import Orders from "./pages/Admin/Orders";
import AdminLayout from "./layouts/AdminLayout";
import SettingAdmin from "./pages/Admin/SettingAdmin";
import TeacherLayout from "./layouts/TeacherLayout";
import Rooms from "./pages/Teacher/Rooms";
import RoomStu from "./pages/Teacher/RoomStu";
import OrderStu from "./pages/Teacher/OrderStus";
import FinanceLayout from "./layouts/FinanceLayout";
import OrdersFi from './pages/Finance/OrdersFi';
import GivingLayout from "./layouts/GivingLaout";
import OrderGiv from "./pages/Giving/OrderGiv";

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
              <Route path={REGISTER_PATH} element={<Register />} />
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
              <Route path={TEAM_PATH} element={<Teams />} />
              <Route path={SINGLE_PATH} element={<Singles />} />
            </Route>

            <Route element={<AdminLayout />}>
              <Route path={ORDERALL_ADMINPATH} element={<Orders />} />
              <Route path={SETTING_ADMINPATH} element={<SettingAdmin />} />
            </Route>

            <Route element={<TeacherLayout />}>
              <Route path={ROOMSTU_TEACHERPATH} element={<RoomStu />} />
              <Route path={ROOM_TEACHERPATH} element={<Rooms />} />
              <Route path={ORDERSTU_TEACHERPATH} element={<OrderStu />} />
            </Route>

            <Route element={<FinanceLayout />}>
              <Route path={ORDER_FINANCEPATH} element={<OrdersFi />} />
            </Route>

            <Route element={<GivingLayout />}>
              <Route path={ORDER_GIVINGPATH} element={<OrderGiv />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
