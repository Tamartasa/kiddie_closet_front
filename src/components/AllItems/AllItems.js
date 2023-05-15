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

const images = [
  {
    title: "Image 1",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW4VsLtCue88uQwYYSg0AEmi94aBVdtf2yqA&usqp=CAU",
  },
  {
    title: "Image 2",
    src: "https://xcdn.next.co.uk/COMMON/Items/Default/Default/Publications/G76/shotview/4209/C48-385s.jpg",
  },
  {
    title: "Image 3",
    src: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFieSUyMGNsb3RoZXN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    title: "Image 4",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdIQ9q1owaWlJ8k944ZPWk7kqihDZ5ZyxDcA&usqp=CAU",
  },
  {
    title: "Image 5",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW4VsLtCue88uQwYYSg0AEmi94aBVdtf2yqA&usqp=CAU",
  },
  {
    title: "Image 6",
    src: "https://xcdn.next.co.uk/COMMON/Items/Default/Default/Publications/G76/shotview/4209/C48-385s.jpg",
  },
  {
    title: "Image 7",
    src: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFieSUyMGNsb3RoZXN8ZW58MHx8MHx8&w=1000&q=80",
  },
  {
    title: "Image 8",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdIQ9q1owaWlJ8k944ZPWk7kqihDZ5ZyxDcA&usqp=CAU",
  },
];

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

export default function AllItems() {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={4}>
        {images.map((image) => (
          <Grid item key={image.title} xs={12} sm={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea component={Link} to={`login/`}>
                <CardMedia
                  className={classes.cardMedia}
                  image={image.src}
                  title={image.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {image.title}
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
