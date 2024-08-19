import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/auth/LoginPage';
import { DASHBOARD_PATH } from "./configs/constants";
import MainLayout from "./Layout/MainLayout";
import DashboardPage from "./pages/superAdmin/DashboardPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path={DASHBOARD_PATH} element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
