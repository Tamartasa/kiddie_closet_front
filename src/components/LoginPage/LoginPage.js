// import axios from "axios";
// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserContext from "../../Contexts/UserContext";
// import { LOGIN } from "../../urls";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorText, setErrorText] = useState("");
//   const { setLoggedUser } = useContext(UserContext);

//   const navigate = useNavigate();
//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const formData = new FormData(event.target);

//     axios
//       .post(LOGIN, formData)
//       .then((responseData) => {
//         if (responseData.status === 200) {
//           localStorage.setItem("access", responseData.data.access);
//           localStorage.setItem("refresh", responseData.data.refresh);
//           setLoggedUser(username);
//           navigate("/");
//           //   window.open("/", "_self");
//         }
//       })
//       .catch((error) => {
//         if (error.response.status === 401) {
//           setErrorText("username or password incorrect, try again or signup");
//         } else {
//           console.log(error);
//           setErrorText(error.response.data.detail);
//         }
//       });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={username}
//           onChange={(event) => setUsername(event.target.value)}
//         ></input>

//         <br />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         ></input>

//         <br />

//         <input type="submit" value="Login"></input>
//       </form>
//       {errorText && <p>Error occurred: {errorText}</p>}
//     </>
//   );
// }

import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../../Contexts/UserContext";
import { GOOGLE_LOGIN, LOGIN } from "../../urls";
import { GoogleLogin } from "@react-oauth/google";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    backgroundColor: "#fbf5f0",
    borderRadius: theme.spacing(4),
    boxShadow: "1px 1px 1px rgba(0,0,0,0.3)",
  },
  form2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    backgroundColor: "#fbf5f0",
    borderRadius: theme.spacing(4),
  },
  textField: {
    margin: theme.spacing(1),
    width: "100%",
  },
  submitButton: {
    margin: theme.spacing(2),
    width: "100%",
    backgroundColor: "#e4c4a1",
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    axios
      .post(LOGIN, formData)
      .then((responseData) => {
        if (responseData.status === 200) {
          localStorage.setItem("access", responseData.data.access);
          localStorage.setItem("refresh", responseData.data.refresh);
          setLoggedUser(username);
          navigate("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorText("Username or password is incorrect.");
        } else {
          console.log(error);
          setErrorText(error.response.data.detail);
        }
      });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.form}>
        <Typography
          sx={{ fontFamily: "Georgia, serifOpen Sans" }}
          variant="h5"
          align="center"
        ></Typography>
        <form onSubmit={handleSubmit} className={classes.form2}>
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={classes.textField}
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={classes.textField}
            variant="outlined"
          />
          <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#e4c4a1" }}
            className={classes.submitButton}
            disabled={!username || !password}
          >
            Login
          </Button>
        </form>
        {errorText && (
          <Typography variant="body2" className={classes.errorText}>
            {errorText}
          </Typography>
        )}

        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            console.log(credentialResponse);
            const response = await axios.post(
              GOOGLE_LOGIN,
              {},
              { headers: { Authorization: credentialResponse.credential } }
            );
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </Box>
    </Box>
  );
}
