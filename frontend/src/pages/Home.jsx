import { Box, Container, Typography, Paper } from '@mui/material';
import UpcomingEventsSlider from '../components/UpcomingEventsSlider';
import RecentAchievements from '../components/RecentAchievements';
import SportsFacilities from '../components/SportsFacilities';
import ContactForm from '../components/ContactForm';

const Home = () => {
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
          backgroundImage: `url(/images/hero-bg.jpg)`,
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            p: { xs: 3, md: 6 },
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
          >
            PICT Sports Department
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Nurturing Champions, Building Character Through Sports Excellence
          </Typography>
        </Box>
      </Paper>

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Welcome to Sports Portal
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Your one-stop destination for sports events and achievements
          </Typography>
        </Box>

        {/* Upcoming Events Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom align="center">
            Upcoming Events
          </Typography>
          <UpcomingEventsSlider />
        </Box>

        {/* Recent Achievements Section */}
        <RecentAchievements />

        {/* Sports Facilities Section */}
        <SportsFacilities />

        {/* Contact Form Section */}
        <ContactForm />
      </Container>
    </Box>
  );
};

export default Home; 