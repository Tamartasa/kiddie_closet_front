import { CardContent, IconButton, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { green, grey } from '@mui/material/colors';

export default function CardContentText(props) {
  const { date, amount, additionalInfo } = props;

  return (
    <CardContent> 
      <IconButton aria-label="amount" sx={{ fontSize: '10px' }}>
        <ShoppingBagIcon /> {amount}
      </IconButton>  
      <IconButton aria-label="published date" sx={{ fontSize: '10px' }}>
        <CalendarMonthIcon /> {date}
      </IconButton>  
      <Typography paragraph>{additionalInfo}</Typography>
      <IconButton sx={{ color: green[500] }} aria-label="contact">
        <WhatsAppIcon />
      </IconButton>
    </CardContent>
  );
}