import { CardMedia } from '@mui/material';

export default function ItemCardImage(props) {
  const { image, alt } = props;

  return (
    <CardMedia
      component="img"
      height="170"
      image={image}
      alt={alt}
      style={{ width: '100%' }}
    />
  );
}