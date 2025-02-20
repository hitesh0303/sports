import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  EmojiEvents,
  SportsSoccer,
  Groups,
  School,
  DateRange,
  LocationOn
} from '@mui/icons-material';
import ElevateSchedule from '../components/ElevateSchedule';
import ElevateGallery from '../components/ElevateGallery';
import ElevateRegistration from '../components/ElevateRegistration';

const Elevate = () => {
  const sports = [
    { name: 'Basketball', participants: '16 teams' },
    { name: 'Volleyball', participants: '20 teams' },
    { name: 'Cricket', participants: '24 teams' },
    { name: 'Table Tennis', participants: '32 players' },
    { name: 'Chess', participants: '48 players' },
    { name: 'Carrom', participants: '32 players' }
  ];

  const highlights = [
    'Cash prizes worth ₹2,00,000',
    'Professional referees and officials',
    'Live streaming of finals',
    'Celebrity guest appearances',
    'Cultural events and performances',
    'Food stalls and entertainment'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(/images/elevate-hero.jpg)`,
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,.6)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            ELEVATE 2024
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Annual Inter-College Sports Championship
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ mr: 2 }}
              href="#register"
            >
              Register Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ color: 'white', borderColor: 'white' }}
              href="#schedule"
            >
              View Schedule
            </Button>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Event Details */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              About ELEVATE
            </Typography>
            <Typography variant="body1" paragraph>
              ELEVATE is PICT's flagship inter-college sports championship that brings together
              the best sporting talent from colleges across Maharashtra. Now in its 8th year,
              ELEVATE has become a prestigious platform for collegiate athletes to showcase
              their skills and compete at the highest level.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DateRange color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Date"
                  secondary="March 15-17, 2024"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOn color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Venue"
                  secondary="PICT Campus, Pune"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Groups color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Participation"
                  secondary="Over 1000 athletes from 50+ colleges"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image="/images/elevate-collage.jpg"
                alt="ELEVATE moments"
              />
            </Card>
          </Grid>
        </Grid>

        {/* Sports Categories */}
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Sports Categories
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {sports.map((sport) => (
            <Grid item xs={12} sm={6} md={4} key={sport.name}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SportsSoccer color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">{sport.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {sport.participants}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Schedule Section */}
        <ElevateSchedule />

        {/* Event Highlights */}
        <Paper sx={{ p: 4, bgcolor: 'grey.100', mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Event Highlights
          </Typography>
          <Grid container spacing={2}>
            {highlights.map((highlight, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiEvents color="primary" sx={{ mr: 1 }} />
                  <Typography>{highlight}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Gallery Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Previous Events Gallery
          </Typography>
          <ElevateGallery />
        </Box>

        {/* Registration Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
            Registration
          </Typography>
          <ElevateRegistration />
        </Box>
      </Container>
    </Box>
  );
};

export default Elevate; 