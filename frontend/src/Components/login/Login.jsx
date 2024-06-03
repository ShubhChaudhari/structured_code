import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { getUsers, login } from "../../services/services";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    const res = await login(data);
    localStorage.setItem("token", res.token);

    navigate("/dashboard");
    const users = await getUsers();
    console.log(users);
    console.log(res);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            name="username"
            variant="standard"
            fullWidth
            margin="normal"
            value={data.username}
            onChange={onChange}
          />
          <TextField
            label="Password"
            name="password"
            variant="standard"
            type="password"
            fullWidth
            margin="normal"
            value={data.password}
            onChange={onChange}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={onSubmit}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account ?{" "}
            <Link to="/register" color="primary">
              Register
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
