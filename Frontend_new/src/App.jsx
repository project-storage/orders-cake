import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./pages/Admin/Dashboard";
import Manage from "./pages/Admin/Manage";
import ViewData from "./pages/Admin/ViewData";
import AuthLayout from "./layouts/AuthLayout";
import { DASHBOARD_PATH, LOGIN_PATH, MANAGE_PATH, PRODUCT_PATH, STUDNET_PATH, TEACHER_PATH, VIEWDATA_PATH } from "./config/constants";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/Admin/Products";
import Students from './pages/Admin/Students';
import Teachers from './pages/Admin/Teachers';


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
            <Route element={<AuthLayout/>}>
              <Route path={LOGIN_PATH} element={<Login/>}/>
            </Route>

            <Route element={<AdminLayout/>}>
              <Route path={DASHBOARD_PATH} element={<Dashboard/>} />
              <Route path={MANAGE_PATH} element={<Manage/>} />
              <Route path={VIEWDATA_PATH} element={<ViewData/>}/>
              <Route path={PRODUCT_PATH} element={<Products/>}/>
              <Route path={STUDNET_PATH} element={<Students/>}/>
              <Route path={TEACHER_PATH} element={<Teachers/>}/>
            </Route>
            
          </Routes>
        </BrowserRouter>
        
      </ThemeProvider>
    </>
  );
}

export default App;
