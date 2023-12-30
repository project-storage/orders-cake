// import { Button, Stack } from '@mui/material'
// import { Delete, Send, Photo } from '@mui/icons-material'

import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Login from "./pages/Auth/Login"
import BackendLayout from "./layouts/BackendLayout"
import Dashboard from "./pages/Admin/Dashboard"
import Product from "./pages/Admin/Product"
import Report from "./pages/Admin/Report"
import Setting from "./pages/Admin/Setting"
import { DASHBOARD_PATH, PRODUCT_PATH, REPORT_PATH, SETTING_PATH, STUDNET_PATH, TEACHER_PATH, USER_PATH  } from './config/constants'
import User from "./pages/Admin/User"
import Studnet from "./pages/Admin/Studnet"
import Teacher from "./pages/Admin/Teacher"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<BackendLayout />}>
          <Route path={DASHBOARD_PATH} element={<Dashboard />} />
          <Route path={PRODUCT_PATH} element={<Product />} />
          <Route path={REPORT_PATH} element={<Report />} />
          <Route path={SETTING_PATH} element={<Setting />} />
          <Route path={USER_PATH} element={<User/>}/>
          <Route path={STUDNET_PATH} element={<Studnet/>}/>
          <Route path={TEACHER_PATH} element={<Teacher/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )

}

export default App