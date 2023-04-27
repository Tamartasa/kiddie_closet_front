import axios from "axios";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
// import { PhoneNumberInput } from '@material-ui/lab';
import MuiPhoneNumber from "material-ui-phone-number";
import UserContext from "../Contexts/UserContext";

export default function SignUp() {
  const [userData, setUserData] = useState("");
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  useEffect(() => {
    getAllNeighborhoodNames();
  }, []);

  function onSignUp(user) {
    setLoggedUser(user);
  }

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

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexWrap: "wrap",
        maxWidth: "600px",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Username"
          placeholder="Username"
        />
        <TextField
          required
          id="outlined-required"
          label="First Name"
          placeholder="First Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          placeholder="Last Name"
        />

        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          placeholder="Password"
          // autoComplete="current-password"
        />

        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder="Email"
        />

        <MuiPhoneNumber
          required
          defaultCountry="il"
          id="outlined-required"
          label="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />

        <TextField
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
        />

        <TextField
          id="outlined-select"
          required
          select
          label="neigborhood"
          placeholder="neighborhood"
          helperText="Please select your neighborhood"
        >
          {neighborhoods.map((option) => (
            <MenuItem key={option}>{option}</MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select"
          label="city"
          select
          defaultValue="Tel Aviv"
          placeholder="city"
          helperText="Please select your city"
        >
          <MenuItem value="Tel Aviv">Tel Aviv</MenuItem>
        </TextField>
      </div>

      <Button variant="outlined" sx={{ height: "40px", width: "120px" }}>
        Submit
      </Button>
    </Box>
  );
}
