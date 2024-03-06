import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import DashboardSuper from "./pages/SuperAdmin/DashboardSuper";
import {
  ADMIN_PATH,
  ALL_DATA_USER_PATH,
  CREATE_USER_PATH,
  DASHBOARDTEACH_PATH,
  DASHBOARD_PATH,
  DEGREE_PATH,
  DEPARTMENT_PATH,
  DEPART_CAKE_PATH,
  DEPART_FINANCE_PATH,
  DEPART_PRODUCT_CAKE_PATH,
  DETAIL_USER_DATA_PATH,
  GROUP_TEACHER_PATH,
  LOGIN_PATH,
  PRODUCT_PATH,
  PROFILE_SUPERADMIN_PATH,
  PROFILE_TEACHER_PATH,
  REGISTER_PATH,
  SINGLE_PATH,
  STUDENT_PATH,
  STUDENT_TEACHER_PATH,
  TEACHER_PATH,
  TEAM_PATH,
  UPDATE_ADMIN_PATH,
  UPDATE_CAKEA_PATH,
  UPDATE_DEGREE_PATH,
  UPDATE_DEPARTMENT_PATH,
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
import DegreeSuper from "./pages/SuperAdmin/DegreeSuper";
import ProfileSuper from "./pages/SuperAdmin/ProfileSuper";
import TeacherLayout from "./layouts/TeacherLayout";
import DashboardTeach from "./pages/Teacher/DashboardTeach";
import ProfileTeach from "./components/Teacher/ProfileTeach";
import GroupTeach from "./pages/Teacher/GroupTeach";
import Spinner from "./components/Spinner";
import UpdateCakeSuper from "./pages/SuperAdmin/Update/UpdateCakeSuper";
import UpdateDepartmentSuper from "./pages/SuperAdmin/Update/UpdateDepartmentSuper";
import UpdateDegreeSuper from "./pages/SuperAdmin/Update/UpdateDegreeSuper";
import AllUserSuper from "./pages/SuperAdmin/AllUserSuper";
import UserDetailSuper from "./pages/SuperAdmin/DataDetails/UserDetailSuper";
import UpdateUserSuper from "./pages/SuperAdmin/Update/UpdateUserSuper";
import CreateUserSuper from "./pages/SuperAdmin/FormCreate/CreateUserSuper";
import Register from "./pages/Auth/Register";
import StudentTeach from "./pages/Teacher/StudentTeach";
import StudentDetails from "./pages/Teacher/DataDetails/StudentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route path={REGISTER_PATH} element={<Register />} />
          <Route path="/loading" element={<Spinner />} />
        </Route>

        <Route element={<SuperAdminLayout />}>
          <Route path={DASHBOARD_PATH} element={<DashboardSuper />} />
          <Route path={PROFILE_SUPERADMIN_PATH} element={<ProfileSuper />} />
          <Route path={CREATE_USER_PATH} element={<CreateUserSuper />} />
          <Route path={ALL_DATA_USER_PATH} element={<AllUserSuper />} />
          <Route
            path={`${DETAIL_USER_DATA_PATH}/:id`}
            element={<UserDetailSuper />}
          />
          <Route
            path={`${UPDATE_ADMIN_PATH}/:id`}
            element={<UpdateUserSuper />}
          />
          <Route path={PRODUCT_PATH} element={<CakeSuper />} />
          <Route
            path={`${UPDATE_CAKEA_PATH}/:id`}
            element={<UpdateCakeSuper />}
          />
          <Route path={STUDENT_PATH} element={<StudentSuper />} />
          <Route path={DEGREE_PATH} element={<DegreeSuper />} />
          <Route
            path={`${UPDATE_DEGREE_PATH}/:id`}
            element={<UpdateDegreeSuper />}
          />
          <Route path={DEPARTMENT_PATH} element={<DepartmentsSuper />} />
          <Route
            path={`${UPDATE_DEPARTMENT_PATH}/:id`}
            element={<UpdateDepartmentSuper />}
          />
          <Route path={TEACHER_PATH} element={<TeacherSuper />} />
          <Route path={DEPART_FINANCE_PATH} element={<DepartFinacesSuper />} />
          <Route path={DEPART_CAKE_PATH} element={<DepartCakeSuper />} />
          <Route path={ADMIN_PATH} element={<AdminSuper />} />
          <Route
            path={DEPART_PRODUCT_CAKE_PATH}
            element={<DepartProductCakeSuper />}
          />
          <Route path={TEAM_PATH} element={<TeamSuper />} />
          <Route path={SINGLE_PATH} element={<SingleSuper />} />
        </Route>

        <Route element={<TeacherLayout />}>
          <Route path={DASHBOARDTEACH_PATH} element={<DashboardTeach />} />
          <Route path={GROUP_TEACHER_PATH} element={<GroupTeach />} />
          <Route path={PROFILE_TEACHER_PATH} element={<ProfileTeach />} />
          <Route path={STUDENT_TEACHER_PATH} element={<StudentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
