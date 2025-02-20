import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import facilitiesData from '../data/facilitiesData';

const SportsFacilities = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Our Sports Facilities
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
        State-of-the-art facilities to support your athletic journey
      </Typography>

      <Grid container spacing={4}>
        {facilitiesData.map((facility) => (
          <Grid item key={facility.id} xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 6
                }
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={facility.image}
                alt={facility.name}
                sx={{ 
                  objectFit: 'cover',
                  borderBottom: '4px solid',
                  borderColor: 'primary.main'
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom component="h2">
                  {facility.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {facility.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    Features:
                  </Typography>
                  <List dense>
                    {facility.features.map((feature, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SportsFacilities; 