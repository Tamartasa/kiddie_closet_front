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
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { GET_ADD_ITEM } from "../../urls";

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

export default function AllItems2() {
  const classes = useStyles();

  const [itemElements, setItemElements] = useState([]);
  const [AllItems, setAllItems] = useState([]);

  const handleGetAllItems = async (event) => {
    event.preventDefault();
    console.log("calling all items from api");

    try {
      const allItemsREsult = await axios.get(GET_ADD_ITEM);
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
      setItemElements(itemElements);
    } catch (error) {
      console.log(`error in ${handleGetAllItems.name}: ${error}`);
    }
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <button onClick={handleGetAllItems}>get all items</button>
      <h1>items from rest api kiddie_closet_back</h1>
      <Grid container spacing={4}>
        {AllItems.map((item) => (
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
