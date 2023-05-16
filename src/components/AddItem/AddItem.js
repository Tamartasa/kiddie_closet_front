import axios from "axios";
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
// import { PhoneNumberInput } from '@material-ui/lab';
import UserContext from "../../Contexts/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import { GET_ADD_ITEM, SIGNUP } from "../../urls";
import { useNavigate } from "react-router-dom";
import { InputLabel, Select } from "@material-ui/core";
import { AGES, CONDITIONS } from "../../tests";

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

export default function AddItem() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [numberOfItems, setNumberOfItems] = useState("");
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const { loggedUser, setLoggedUser } = useContext(UserContext);
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const ages = AGES;
  const conditions = CONDITIONS;

  useEffect(() => {
    getAllNeighborhoodNames();
  }, []);

  const getAllNeighborhoodNames = async () => {
    console.log("getting neighborhoods");
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

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    console.log("getting categories");
    let allCategories = [];
    let nextUrl = "http://127.0.0.1:8000/api/categories/";

    while (nextUrl) {
      try {
        const response = await axios.get(nextUrl);
        const categories = response.data.results.map(
          (categoryName) => categoryName.category_name
        );
        allCategories = allCategories.concat(categories);
        nextUrl = response.data.next;
      } catch (error) {
        console.error(error);
        break;
      }
    }

    setAllCategories(allCategories);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (
      !title ||
      !numberOfItems ||
      !age ||
      !neighborhood ||
      !city ||
      !category ||
      !imageURL
    ) {
      setErrorText("Please fill all the required fields");
      return;
    }

    try {
      const myHeaders = {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      };

      console.log(myHeaders);

      const body = {
        size: 5,
        category: 2,
        ad: "1",
        image: imageURL,
        condition: "E",
        description,
        title,
      };
      console.log(body, { myHeaders });

      const result = await axios.post(GET_ADD_ITEM, body, {
        headers: myHeaders,
      });
      console.log(`trying to add item: ${body}`);
      console.log(
        `result data: ${result.data}, result status: ${result.status}`
      );
      navigate("/thankforshare");
    } catch (error) {
      console.log(`Error in ${handleSubmit.name}: ${error}`);
      console.log(error.response.data);
      setErrorText(error.response.data.detail);
    }
  };

  return (
    <Box
      className={classes.root}
      sx={{ marginTop: { xs: "15px", md: "30px" } }}
    >
      <h3>
        Share the joy of second-hand kids items and make a difference in our
        community!
      </h3>
      <Box
        className={classes.form}
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "25ch",
            textAlign: "center",
          },
          padding: "10px 40px",
        }}
      >
        <TextField
          required
          id="outlined-required"
          label="Title"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !title ? "Title is required" : ""}
            </Typography>
          }
        />

        <TextField
          id="outlined-number"
          label="Number of items"
          type="number"
          required
          placeholder="Number of items"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputProps: { min: 0, max: 30 },
          }}
          onChange={(event) => setNumberOfItems(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !city ? "Please select number of items" : ""}
            </Typography>
          }
        />

        <TextField
          id="outlined-select"
          required
          select
          label="neighborhood"
          placeholder="Neighborhood"
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
          required
          select
          defaultValue="Tel Aviv"
          placeholder="City"
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

        <TextField
          id="outlined-select"
          label="Category"
          required
          select
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !category ? "Please select category" : ""}
            </Typography>
          }
        >
          {allCategories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select"
          label="Age"
          required
          select
          placeholder="Age"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !age ? "Please select age" : ""}
            </Typography>
          }
        >
          {ages.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-select"
          label="Condition"
          select
          placeholder="Condition"
          value={condition}
          onChange={(event) => setCondition(event.target.value)}
        >
          {conditions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          id="outlined-required"
          label="Image URL"
          placeholder="Image URL"
          value={imageURL}
          onChange={(event) => setImageURL(event.target.value)}
          helperText={
            <Typography style={{ color: "red" }}>
              {formSubmitted && !imageURL ? "Image URL is required" : ""}
            </Typography>
          }
        />

        <TextField
          id="outlined-required"
          label="Description"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          style={{ backgroundColor: "#e4c4a1" }}
          sx={{
            height: "40px",
            width: "120px",
            borderRadius: "20px",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {errorText && (
          <Typography variant="body2" className={classes.errorText}>
            {errorText}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
