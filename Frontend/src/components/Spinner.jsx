import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Spinner = ({ path = "/" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate(`${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", 
      }}
    >
      <div>
        <CircularProgress />
      </div>
    </Box>
  );
};

export default Spinner;
