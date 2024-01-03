import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import BackendLayout from "./layouts/BackendLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Product from "./pages/Admin/Product";
import Report from "./pages/Admin/Report";
import Setting from "./pages/Admin/Setting";
import {
  DASHBOARD_PATH,
  DASHBOARD_USER,
  LOGIN_PATH,
  PRODUCT_PATH,
  PRODUCT_USER,
  REGISTER_PATH,
  REPORT_PATH,
  REPORT_USER,
  SETTING_PATH,
  STUDNET_PATH,
  TEACHER_PATH,
  USER_PATH,
} from "./config/constants";
import User from "./pages/Admin/User";
import Studnet from "./pages/Admin/Studnet";
import Teacher from "./pages/Admin/Teacher";
import UserLayout from "./layouts/UserLayout";
import DashboardUser from "./pages/User/DashboardUser";
import ProductUser from "./pages/User/ProductUser";
import ReportUser from "./pages/User/ReportUser";
import Spinner from "./components/Spinner";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route path="/loading" element={<Spinner />} />
          <Route path={REGISTER_PATH} element={<Register />} />
        </Route>
        
        <Route element={<BackendLayout />}>
          <Route path={DASHBOARD_PATH} element={<Dashboard />} />
          <Route path={PRODUCT_PATH} element={<Product />} />
          <Route path={REPORT_PATH} element={<Report />} />
          <Route path={SETTING_PATH} element={<Setting />} />
          <Route path={USER_PATH} element={<User />} />
          <Route path={STUDNET_PATH} element={<Studnet />} />
          <Route path={TEACHER_PATH} element={<Teacher />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path={DASHBOARD_USER} element={<DashboardUser />} />
          <Route path={PRODUCT_USER} element={<ProductUser />} />
          <Route path={REPORT_USER} element={<ReportUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
