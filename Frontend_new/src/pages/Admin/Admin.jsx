// import React from 'react'
SideBar
import { CssBaseline, Box } from "@mui/material";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import MainLayout from './../../components/layouts/MainLayout';
import HeaderBar from './../../components/layouts/HeaderBar';
import SideBar from './../../components/layouts/SidenBar';
const Home = () => {
  return (
    <MainLayout>
      
      <CssBaseline/> {/*กระชับหน้าจอ*/}
      <div className="app">
        <SideBar/>
          <main className="content">
            <HeaderBar/>
            <div className="content_body">
              <Box m="20px">
                <Routes>
                  <Route />
                </Routes>
              </Box>
            </div>
          </main>
      </div>
        
        
    </MainLayout>
  )
}

export default Home