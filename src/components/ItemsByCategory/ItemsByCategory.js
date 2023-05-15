import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { GET_ITEMS_BY_CATEGORY_URL } from "../../urls";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9 aspect ratio
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function ItemsByCategory() {
  const classes = useStyles();

  const [allItems, setAllItems] = useState([]);
  const { category_id } = useParams();

  useEffect(() => {
    console.log("items by category page");
    const fetchItem = async () => {
      try {
        const allItemsREsult = await axios.get(
          `${GET_ITEMS_BY_CATEGORY_URL}${category_id}`
        );
        console.log(allItemsREsult);
        console.log(allItemsREsult.data.results);
        const AllItems = allItemsREsult.data.results;
        const itemElements = AllItems.map((item) => {
          return (
            <div key={item.id}>
              <p>{item.id}</p>
              <p>{item.size}</p>
              <p>{item.condition}</p>
              <p>{item.gender}</p>
              <img src={item.image} alt={item.description} />
            </div>
          );
        });
        setAllItems(AllItems);
        // setItemElements(itemElements);
      } catch (error) {
        console.log(`error: ${error}`);
      }
    };
    fetchItem();
  }, []);

  if (!allItems) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <h1>items from category: {category_id} </h1>
      <Grid container spacing={4}>
        {allItems.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to={`/items/${item.id}`}>
                <CardMedia
                  className={classes.cardMedia}
                  image={item.image}
                  title={item.title}
                />

                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {item.description}
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
