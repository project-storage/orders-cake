import { TextField, Button } from "@mui/material";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form>
        <div>
          <TextField label="Username" type="text" variant="outlined" />
        </div>

        <div>
          <TextField label="Password" type="password" variant="outlined" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
