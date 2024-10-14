import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
  fetchDegreesById,
  updateDegree,
} from "../../../../../slices/degreeSlice";
import Swal from "sweetalert2";
import { DEGREE_PATH } from "../../../../../configs/constants";
import { Button, Card, Grid, TextField, Typography } from "@mui/material";

const UpdateDegree = () => {
  const [degreeName, setDegreeName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    degree,
    loading,
    error: fetchError,
  } = useSelector((state: RootState) => state.degrees);

  useEffect(() => {
    if (id) {
      dispatch(fetchDegreesById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (degree) {
      setDegreeName(degree.degreeName);
    }
  }, [degree]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(
        updateDegree({
          id,
          data: { degreeName },
        })
      ).unwrap();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "อัพเดทข้อมูลสำเร็จ!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(DEGREE_PATH);
    } catch (error) {
      setError(error.message || "An error occurred while updating the degree.");
    }
  };

  const handleCancelClick = () => {
    navigate(DEGREE_PATH);
  };
  return (
    <Card id="update-degree" sx={{ padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        {fetchError && <Typography color="error">{fetchError}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          autoFocus
          required
          margin="dense"
          id="degreeName"
          name="degreeName"
          label="ระดับชั้น"
          type="text"
          fullWidth
          value={degreeName}
          onChange={(e) => setDegreeName(e.target.value)}
        />
        <Grid item md={4} xs={12}>
          <Button color="success" variant="contained" type="submit">
            อัพเดทข้อมูล
          </Button>
          <Button
            sx={{ ml: 1 }}
            color="error"
            variant="contained"
            onClick={handleCancelClick}
          >
            ยกเลิก
          </Button>
        </Grid>
      </form>
    </Card>
  );
};

export default UpdateDegree;
