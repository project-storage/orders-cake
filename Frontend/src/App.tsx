import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/auth/LoginPage';
import { DASHBOARD_PATH, DASHBOARD_TEACHERPATH } from "./configs/constants";
import MainLayout from "./Layout/MainLayout";
import DashboardPageSPAM from "./pages/superAdmin/DashboardPageSPAM";
import DashboardPageTC from "./pages/Teacher/DashboardPageTC";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path={DASHBOARD_PATH} element={<DashboardPageSPAM />} />
          <Route path={DASHBOARD_TEACHERPATH} element={<DashboardPageTC />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
