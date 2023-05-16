import { useState, useEffect } from "react";
import axios from "axios";
import { CATEGORIES_URL, GET_ITEMS_BY_CATEGORY_URL } from "../../urls";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
  Link,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_IMG } from "../../tests";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(CATEGORIES_URL);
      console.log(response.data.results);
      const categories = await response.data.results;
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (event, categoryId) => {
    event.preventDefault();
    console.log("clicked category id:", categoryId);
    navigate(`/items/categories/${categoryId}`);
  };

  const handleGetAllItems = (event) => {
    event.preventDefault();
    navigate(`/items`);
  };

  const handleShareItem = (event) => {
    event.preventDefault();
    navigate("/shareitem");
  };

  const cardStyle = {
    background: "none",
    border: "none",
    elevation: 0,
  };

  const imgStyle = {
    marginLeft: "auto",
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            marginTop: "20px",
            marginLeft: "40px",
            height: "100%",
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              width: 200,
              marginBottom: "30px",
            }}
          >
            share and find second-hand kids' items
          </Typography>
          <Typography
            variant="body"
            sx={{
              width: 200,
              marginBottom: "30px",
            }}
          >
            encourage the preservation of the environment and community
          </Typography>
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGetAllItems}
              sx={{ marginRight: "10px", borderRadius: "12px" }}
            >
              Find
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShareItem}
              sx={{ marginRight: "10px", borderRadius: "12px" }}
            >
              Share
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginLeft: "50px",
            marginTop: "20px",
          }}
        >
          <img
            src={HOME_PAGE_IMG}
            alt="My Store"
            style={{ width: "100%", height: "90%", maxWidth: "100%" }}
          />
        </div>
      </Box>

      <h2>Categories</h2>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={3} md={3} key={category.id}>
            <Card sx={cardStyle}>
              <CardActionArea
                onClick={(event) => handleCategoryClick(event, category.id)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.category_image_url}
                  alt={category.category_name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.category_name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
