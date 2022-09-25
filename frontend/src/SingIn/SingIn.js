import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme();

export default function SignIn() {
  const [inputData, setInputData] = useState({
    email: null,
    password: null,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const validation = inputData.email && inputData.password;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  async function sendData() {
    const URL = "http://localhost:3001/api/login-data";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const data = await response.json();
    if (response.status === 200) {
      toast.success(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (response.status === 409) {
      toast.error(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (response.status === 404) {
      toast.error(data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              error={
                inputData.email == null
                  ? false
                  : inputData.email.length === 0
                  ? true
                  : false
              }
              onChange={handleChange}
              value={inputData.email == null ? "" : inputData.email}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              error={
                inputData.password == null
                  ? false
                  : inputData.password.length === 0
                  ? true
                  : false
              }
              onChange={handleChange}
              value={inputData.password == null ? "" : inputData.password}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <LoadingButton
              disabled={!validation}
              onClick={sendData}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="singup">Not have an acount? SingUp</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}
