// Item: A component to display a single item for sale, with an image and text description. This component could be composed of the ImageItem and TextItem components.

// ImageItem: A component to display the image of an item for sale.

// TextItem: A component to display the text description of an item for sale.

// Ad: A component to display one or more items in an advertisement. This component could be composed of one, two, or three Item components.

// TextAd: A component to display a text-based advertisement.

// AdsList: A component to display a list of ads, which could include a combination of Ad and TextAd components.

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { green, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ItemCardImage from "../ItemCardImage/ItemCardImage";
import CardContentText from "../CardContentText/CardContentText";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ItemCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: 200, textAlign: "center", backgroundColor: "#fffaf0" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="clothes">
            C
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="3 Months baby clothes"
        subheader="צפון הישן"
      />
      <ItemCardImage
        image="https://www.adtiny.com/images/listings/2022-07/bigThmb/872a7be0-1659006856-295.jpg"
        alt="3mbc"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          בגדי גוף לתינוק במצב מעולה
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContentText
          date="13.2.23"
          amount="15"
          additionalInfo="למסירה באהבה. בנוסף, מספר בגדים לקיץ"
        />
      </Collapse>
    </Card>
  );
}
