import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { fetchGroupInfo } from "../../../slices/groupSlice";
import { Grid, Paper, TableContainer } from "@mui/material";

const Group = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { group, loading, error } = useSelector(
    (state: RootState) => state.groups
  );

  useEffect(() => {
    dispatch(fetchGroupInfo());
  }, [dispatch]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: "20px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      }}
      id="table-cakes"
    >
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={6}>
          
        </Grid>
      </Grid>


    </TableContainer>
  );
};

export default Group;
