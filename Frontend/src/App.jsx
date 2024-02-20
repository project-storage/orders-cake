import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import DashboardSuper from "./pages/SuperAdmin/DashboardSuper";
import {
  ADMIN_PATH,
  DASHBOARD_PATH,
  DEPARTMENT_PATH,
  DEPART_CAKE_PATH,
  DEPART_FINANECE_PATH,
  DEPART_PRODUCT_CAKE_PATH,
  LOGIN_PATH,
  PRODUCT_PATH,
  SINGLE_PATH,
  STUDENT_PATH,
  TEACHER_PATH,
  TEAM_PATH,
} from "./config/constants";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import CakeSuper from "./pages/SuperAdmin/CakeSuper";
import StudentSuper from "./pages/SuperAdmin/StudentSuper";
import DepartmentsSuper from "./pages/SuperAdmin/DepartmentsSuper";
import TeacherSuper from "./pages/SuperAdmin/TeacherSuper";
import DepartFinacesSuper from "./pages/SuperAdmin/DepartFinacesSuper";
import DepartCakeSuper from "./pages/SuperAdmin/DepartCakeSuper";
import DepartProductCakeSuper from "./pages/SuperAdmin/DepartProductCakeSuper";
import AdminSuper from "./pages/SuperAdmin/AdminSuper";
import TeamSuper from "./pages/SuperAdmin/TeamSuper";
import SingleSuper from "./pages/SuperAdmin/SingleSuper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={LOGIN_PATH} element={<Login />} />
        </Route>

        <Route element={<SuperAdminLayout />}>
          <Route path={DASHBOARD_PATH} element={<DashboardSuper />} />
          <Route path={PRODUCT_PATH} element={<CakeSuper />} />
          <Route path={STUDENT_PATH} element={<StudentSuper />} />
          <Route path={DEPARTMENT_PATH} element={<DepartmentsSuper />} />
          <Route path={TEACHER_PATH} element={<TeacherSuper />} />
          <Route path={DEPART_FINANECE_PATH} element={<DepartFinacesSuper />} />
          <Route path={DEPART_CAKE_PATH} element={<DepartCakeSuper />} />
          <Route path={ADMIN_PATH} element={<AdminSuper />} />
          <Route
            path={DEPART_PRODUCT_CAKE_PATH}
            element={<DepartProductCakeSuper />}
          />
          <Route path={TEAM_PATH} element={<TeamSuper />} />
          <Route path={SINGLE_PATH} element={<SingleSuper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
