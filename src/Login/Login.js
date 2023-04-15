import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import { Box, TextField, MenuItem, Button } from "@mui/material";
// import { PhoneNumberInput } from '@material-ui/lab';
import MuiPhoneNumber from 'material-ui-phone-number'

export default function SignUp() {
    const [userData, setUserData] = useState("");

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [neighborhoods, setNeighborhoods] = useState([]);
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
            const neighborhoodNames = response.data.results.map(neighborhood => neighborhood.neighborhood_name);
            allNeighborhoodNames = allNeighborhoodNames.concat(neighborhoodNames);
            nextUrl = response.data.next;
          } catch (error) {
            console.error(error);
            break;
          }
        }
        
        setNeighborhoods(allNeighborhoodNames)
        return allNeighborhoodNames;
      };


    // useEffect(() => {
    //     getUserData();
    //   }, []);
      
    //   const getUserData = async () => {
    //     try {
    //       const response = await axios.get("http://127.0.0.1:8000/me/", {
    //         headers: {
    //           authorization: "Bearer " + localStorage.getItem("access"),
    //         },
    //       });
    //       const { data } = response;
    //       if (data.code !== "token_not_valid") {
    //         setUserData(`Hello ${data.first_name} ${data.last_name}!`);

    //     } else {
    //         const refreshResponse = await axios.post(
    //           "http://127.0.0.1:8000/api/token/refresh/",
    //           {
    //             refresh: localStorage.getItem("refresh"),
    //           },
    //           {
    //             headers: {
    //               Accept: "application/json",
    //               "Content-type": "application/json",
    //             },
    //           }
    //         );
    //         localStorage.setItem("access", refreshResponse.data.access);
    //         getUserData();
    //       }
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };

      const obtainTokens = async (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/",
            formData
          );
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
        //   getUserData();
        } catch (error) {
          if (error.response.status === 401) {
            setUserData("username or password incorrect, try again or sign up");
          }
          console.error(error);
        }
      };


        return (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '600px',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}

            // noValidate
            // autoComplete="off"
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
                    inputProps: { min: 0, max: 30 }
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
                    <MenuItem key={option}>
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
                helperText="Please select your city"
                >
                     <MenuItem value="Tel Aviv">Tel Aviv</MenuItem>
                    </TextField>
            </div>
    
    
        <Button variant="outlined" sx={{ height: '40px', width: '120px' }}>
          Submit
        </Button>    
        
          </Box>
        );
      }
    //     <div className="container-md">
    //       <div>
    //         <p>{userData}</p>
    //       </div>
    //       <form onSubmit={obtainTokens}>
    //     <label htmlFor="username">Username:</label>
    //     <br />
    //     <input type="text" id="username" name="username" value="" />

    //     <br />

    //     <label htmlFor="password">Password:</label>
    //     <br />
    //     <input type="password" id="password" name="password" value="" />

    //     <br />

    //     <input type="submit" className="btn btn-primary" value="Login" />
    //   </form>

    //   <form action="sign_up.html">
    //     <input type="submit" className="btn btn-primary" value="Sign up" />
    //   </form>
    // </div>
//   );
// }    

//       return (
//         <div className="container-md">
//           <div>
//             <p>{userData}</p>
//           </div>
//           <form onSubmit={obtainTokens}>
//         <label htmlFor="username">Username:</label>
//         <br />
//         <input type="text" id="username" name="username" value="" />

//         <br />

//         <label htmlFor="password">Password:</label>
//         <br />
//         <input type="password" id="password" name="password" value="" />

//         <br />

//         <input type="submit" className="btn btn-primary" value="Login" />
//       </form>

//       <form action="sign_up.html">
//         <input type="submit" className="btn btn-primary" value="Sign up" />
//       </form>
//     </div>
//   );
// }    