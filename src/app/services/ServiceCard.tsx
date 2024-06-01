import { pink } from '@mui/material/colors';
import {
  Grid,
  Card,
  styled,
  Button,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  ButtonProps,
} from '@mui/material';

interface ServiceCardProps {
  image: string;
  description: string;
  price: number;
  name: string;
}

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(pink[300]),
  backgroundColor: pink[300],
  paddingLeft: '10px',
  paddingRight: '10px',
  '&:hover': {
    backgroundColor: pink[400],
  },
}));

export function ServiceCard({ price, name, image, description }: ServiceCardProps) {
  return (
    <Card sx={{ maxWidth: 345, height: 350, overflow: 'auto' }}>
      <CardMedia component="img" alt="green iguana" height="140" src={`${image}`} />
      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              // display={'flex'}
              // justifyContent={'space-between'}
            >
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} textAlign="end">
            <Typography color="" variant="h6">
              {`$${price}`}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <ColorButton size="small">Learn more</ColorButton>
      </CardActions>
    </Card>
  );
}

export default ServiceCard;
