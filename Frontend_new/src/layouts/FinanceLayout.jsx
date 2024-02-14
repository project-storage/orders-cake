import { CssBaseline, Box } from "@mui/material";
import MainLayout from '../components/layouts/MainLayout';
import HeaderBar from '../components/layouts/Finance/HeaderBar';
import SideBar from '../components/layouts/Finance/SideBar';
import { Outlet } from "react-router-dom";
const FinacesLayout = () => {
  return (
    <MainLayout>
      <CssBaseline/> {/*กระชับหน้าจอ*/}
      <div className="app">
        <SideBar/>
          <main className="content">
            <HeaderBar/>
            <div className="content_body">
              <Box m="20px">
                <Outlet/>
              </Box>
            </div>
          </main>
      </div>
    </MainLayout>
  )
}

export default FinacesLayout