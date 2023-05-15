import axios from "axios";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
// import { PhoneNumberInput } from '@material-ui/lab';
import MuiPhoneNumber from "material-ui-phone-number";
import UserContext from "../../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { SIGNUP } from "../../urls";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
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
    flexWrap: "wrap",
    maxWidth: "600px",
  },
  errorText: {
    color: theme.palette.error.main,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [errorText, setErrorText] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    getAllNeighborhoodNames();
  }, []);

  const getAllNeighborhoodNames = async () => {
    let allNeighborhoodNames = [];
    let nextUrl = "http://127.0.0.1:8000/api/neighborhoods/";

    while (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        const neighborhoodNames = response.data.results.map(
          (neighborhood) => neighborhood.neighborhood_name
        );
        allNeighborhoodNames = allNeighborhoodNames.concat(neighborhoodNames);
        nextUrl = response.data.next;
      } catch (error) {
        console.error(error);
        break;
      }
    }

    setNeighborhoods(allNeighborhoodNames);
    return allNeighborhoodNames;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (
      !firstName ||
      !lastName ||
      !userName ||
      !phoneNumber ||
      !neighborhood ||
      !city ||
      !email ||
      !password
    ) {
      setErrorText("Please fill all the required fields");
      return;
    }

    try {
      const body = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        phone_number: phoneNumber,
        neighborhood,
        city,
        email,
        password,
      };
      const result = await axios.post(SIGNUP, body);
      console.log(
        `result data: ${result.data}, result status: ${result.status}`
      );
      navigate("/login");
    } catch (error) {
      console.log(`Error in ${handleSubmit.name}: ${error}`);
      console.log(error.response.data);
      if (error.response && error.response.data) {
        let errorMessage = "";
        for (const key in error.response.data) {
          errorMessage += `${key} - ${error.response.data[key][0]}\n`;
        }
        setErrorText(errorMessage);
      } else {
        setErrorText("An error occurred. Please try again.");
      }
    }
  };

  return (
    <Box
      className={classes.root}
      sx={{ marginTop: { xs: "15px", md: "30px" } }}
    >
      <Box
        className={classes.form}
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch", textAlign: "center" },
          padding: "10px 40px",
        }}
      >
        {/* <div> */}
        <TextField
          required
          id="outlined-required"
          label="Username"
          placeholder="Username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !userName ? "Username is required" : ""}
            </Typography>
          }
        />
        <TextField
          required
          id="outlined-required"
          label="First Name"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !firstName ? "First name is required" : ""}
            </Typography>
          }
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !lastName ? "Last name is required" : ""}
            </Typography>
          }
        />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !password ? "Password is required" : ""}
            </Typography>
          }
        />

        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !email ? "Email is required" : ""}
            </Typography>
          }
        />

        <MuiPhoneNumber
          required
          defaultCountry="il"
          id="outlined-required"
          label="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !phoneNumber ? "Phone number is required" : ""}
            </Typography>
          }
        />

        {/* <TextField
            id="outlined-number"
            label="Number of items"
            type="number"
            placeholder="Number of items"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: { min: 0, max: 30 },
            }}
          /> */}

        <TextField
          id="outlined-select"
          required
          select
          label="neigborhood"
          placeholder="neighborhood"
          value={neighborhood}
          onChange={(event) => setNeighborhood(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !neighborhood
                ? "Please select your neighborhood"
                : ""}
            </Typography>
          }
        >
          {neighborhoods.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select"
          label="city"
          select
          defaultValue="Tel Aviv"
          placeholder="city"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !city ? "Please select your city" : ""}
            </Typography>
          }
        >
          <MenuItem value="Tel Aviv">Tel Aviv</MenuItem>
        </TextField>
        {/* </div> */}

        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#e4c4a1" }}
          sx={{ height: "40px", width: "120px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {errorText && (
          <Typography variant="body2" className={classes.errorText}>
            {errorText}
          </Typography>
        )}
        <p>
          Already registered? <a href="/login">Login here</a>
        </p>
      </Box>
    </Box>
  );
}
