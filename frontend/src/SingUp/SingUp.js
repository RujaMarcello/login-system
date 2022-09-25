import * as React from "react";
import Avatar from "@mui/material/Avatar";
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
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [inputFormData, setInputFormData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });
  const isValidData =
    inputFormData.firstName &&
    inputFormData.lastName &&
    inputFormData.email &&
    inputFormData.password;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  function isEmailCorrectWrite() {
    const mustInclude = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    console.log(mustInclude.test(inputFormData.email));
    return mustInclude.test(inputFormData.email);
  }
  async function sendData(event) {
    const emailIsCorectWriten = isEmailCorrectWrite();
    console.log(emailIsCorectWriten);
    if (emailIsCorectWriten) {
      event.preventDefault();
      setLoading(true);
      const URL = "http://localhost:3001/api/register";
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputFormData),
      }).finally(() => setLoading(false));

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
        setInputFormData({
          firstName: null,
          lastName: null,
          email: null,
          password: null,
        });
      } else {
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
    } else {
      event.preventDefault();
      toast.warn("Incorect email form", {
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    inputFormData.firstName == null
                      ? false
                      : inputFormData.firstName.length === 0
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  value={
                    inputFormData.firstName == null
                      ? ""
                      : inputFormData.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={
                    inputFormData.lastName == null
                      ? false
                      : inputFormData.lastName.length === 0
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={
                    inputFormData.lastName == null ? "" : inputFormData.lastName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    inputFormData.email == null
                      ? false
                      : inputFormData.email.length === 0
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={inputFormData.email == null ? "" : inputFormData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={
                    inputFormData.password == null
                      ? false
                      : inputFormData.password.length < 6
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={
                    inputFormData.password == null ? "" : inputFormData.password
                  }
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <LoadingButton
              disabled={!isValidData}
              loading={loading}
              onClick={sendData}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
