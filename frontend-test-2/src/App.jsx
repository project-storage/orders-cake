import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CAKE_PATH, DASHBOARD_PATH, DEGREE_PATH, DEPARTMENT_PATH, GROUP_PATH, UPDATE_CAKEA_PATH, UPDATE_DEGREE_PATH, UPDATE_DEPARTMENT_PATH, UPDATE_GROUP_PATH } from './configs/constrants'
import Login from './pages/auth/Login'
import SuperAdminLayout from './layout/SuperAdminLayout'
import DashboardPageSuperAdmin from './pages/super-admin/DashboardPageSuperAdmin'
import CakePageSuperAdmin from './pages/super-admin/CakePageSuperAdmin'
import UpdateCakePageSuperAdmin from './pages/super-admin/form-update/cake/UpdateCakePageSuperAdmin'
import GroupPageSuperAdmin from './pages/super-admin/study-group-page/GroupPageSuperAdmin'
import DegreePageSuperAdmin from './pages/super-admin/study-group-page/DegreePageSuperAdmin'
import UpdateDegreePageSuperAdmin from './pages/super-admin/form-update/study-group/UpdateDegreePageSuperAdmin'
import DepartPageSuperAdmin from './pages/super-admin/study-group-page/DepartPageSuperAdmin'
import UpdateDepartPageSuperAdmin from './pages/super-admin/form-update/study-group/UpdateDepartPageSuperAdmin'
import UpdateGroupPageSuperAdmin from './pages/super-admin/form-update/study-group/UpdateGroupPageSuperAdmin'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<SuperAdminLayout />}>
          <Route path={DASHBOARD_PATH} element={<DashboardPageSuperAdmin />} />
          <Route path={CAKE_PATH} element={<CakePageSuperAdmin />} />
          <Route path={`${UPDATE_CAKEA_PATH}/:id`} element={<UpdateCakePageSuperAdmin />} />
          <Route path={GROUP_PATH} element={<GroupPageSuperAdmin />} />
          <Route path={`${UPDATE_GROUP_PATH}/:id`} element={<UpdateGroupPageSuperAdmin />} />
          <Route path={DEGREE_PATH} element={<DegreePageSuperAdmin/>} />
          <Route path={`${UPDATE_DEGREE_PATH}/:id`} element={<UpdateDegreePageSuperAdmin/>} />
          <Route path={DEPARTMENT_PATH} element={<DepartPageSuperAdmin/>} />
          <Route path={`${UPDATE_DEPARTMENT_PATH}/:id`} element={<UpdateDepartPageSuperAdmin/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App