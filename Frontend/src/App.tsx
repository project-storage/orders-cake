import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import {
  CAKE_PATH,
  DASHBOARD_PATH,
  DASHBOARD_TEACHERPATH,
  DEGREE_PATH,
  DEPARTMENT_PATH,
  GROUP_TEACHERPATH,
  UPDATE_CAKEA_PATH,
  UPDATE_DEGREE_PATH,
  UPDATE_DEPARTMENT_PATH,
} from "./configs/constants";
import MainLayout from "./Layout/MainLayout";
import DashboardPageSPAM from "./pages/superAdmin/DashboardPageSPAM";
import DashboardPageTC from "./pages/Teacher/DashboardPageTc";
import CakePage from "./pages/superAdmin/table/CakePage";
import UpdateCakePageSPAM from "./pages/superAdmin/from/UpdateCakePageSPAM";
import DepartmentPageSPAM from "./pages/superAdmin/table/DepartmentPageSPAM";
import UpdateDepartmentSPAM from "./pages/superAdmin/from/UpdateDepartmentSPAM";
import DegreePageSPAM from "./pages/superAdmin/table/DegreePageSPAM";
import UpdateDegreeSPAM from "./pages/superAdmin/from/UpdateDegreeSPAM";
import GroupPageTc from './pages/Teacher/GroupPageTc';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path={DASHBOARD_PATH} element={<DashboardPageSPAM />} />
          <Route path={CAKE_PATH} element={<CakePage />} />
          <Route
            path={`${UPDATE_CAKEA_PATH}/:id`}
            element={<UpdateCakePageSPAM />}
          />
          <Route
            path={`${UPDATE_DEPARTMENT_PATH}/:id`}
            element={<UpdateDepartmentSPAM />}
          />
          <Route path={DEPARTMENT_PATH} element={<DepartmentPageSPAM />} />
          <Route path={DEGREE_PATH} element={<DegreePageSPAM />} />
          <Route
            path={`${UPDATE_DEGREE_PATH}/:id`}
            element={<UpdateDegreeSPAM />}
          />
          <Route path={DASHBOARD_TEACHERPATH} element={<DashboardPageTC />} />
          <Route path={GROUP_TEACHERPATH} element={<GroupPageTc />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
