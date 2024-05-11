import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProSidebarProvider } from 'react-pro-sidebar'
import ThemeProvider from '@mui/material/styles/ThemeProvider.js'
import theme from './configs/theme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ProSidebarProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ProSidebarProvider>
  </React.StrictMode>,
)
