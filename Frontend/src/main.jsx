import React from 'react';
import ReactDOM from 'react-dom'; // Correct import statement
import App from './App.jsx';
import './index.css';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { ThemeProvider } from '@mui/material';
import theme from './config/theme.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ProSidebarProvider>
  </React.StrictMode>
);
