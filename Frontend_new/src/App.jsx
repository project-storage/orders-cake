import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Admin/Admin";

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
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
