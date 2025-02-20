import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Chip,
  Grid
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  CalendarToday,
  LocationOn,
  SportsSoccer
} from '@mui/icons-material';

// Static upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "PICT ELEVATE 2024",
    description: "Annual Sports Festival featuring multiple sports competitions and events",
    startDate: "2024-02-24",
    endDate: "2024-02-27",
    venue: "PICT Campus Ground",
    sports: ["Cricket", "Football", "Basketball", "Volleyball", "Athletics"],
    type: "elevate",
    registrationLink: "https://elevate.pict.edu"
  },
  {
    id: 2,
    title: "Inter-College Cricket Tournament",
    description: "Annual cricket championship between engineering colleges",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    venue: "PICT Cricket Ground",
    sports: ["Cricket"],
    type: "tournament"
  },
  {
    id: 3,
    title: "PICT Athletics Meet 2024",
    description: "Annual athletics competition featuring track and field events",
    startDate: "2024-04-05",
    endDate: "2024-04-07",
    venue: "PICT Sports Complex",
    sports: ["Athletics", "Running", "Long Jump", "High Jump"],
    type: "intra"
  },
  {
    id: 4,
    title: "Basketball Championship",
    description: "Inter-department basketball tournament",
    startDate: "2024-03-01",
    endDate: "2024-03-03",
    venue: "PICT Basketball Court",
    sports: ["Basketball"],
    type: "intra"
  }
];

const UpcomingEventsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? upcomingEvents.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === upcomingEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      elevate: 'error',
      tournament: 'primary',
      intra: 'success'
    };
    return colors[type] || 'default';
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', my: 4 }}>
      <Card 
        sx={{ 
          minHeight: 300,
          backgroundColor: theme.palette.background.paper,
          boxShadow: 3
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip 
                  label={upcomingEvents[currentIndex].type.toUpperCase()}
                  color={getEventTypeColor(upcomingEvents[currentIndex].type)}
                  size="small"
                />
                {upcomingEvents[currentIndex].registrationLink && (
                  <Chip 
                    label="Registration Open"
                    color="success"
                    size="small"
                    onClick={() => window.open(upcomingEvents[currentIndex].registrationLink)}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {upcomingEvents[currentIndex].title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" paragraph>
                {upcomingEvents[currentIndex].description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>
                  {formatDate(upcomingEvents[currentIndex].startDate)} - {formatDate(upcomingEvents[currentIndex].endDate)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography>
                  {upcomingEvents[currentIndex].venue}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {upcomingEvents[currentIndex].sports.map((sport) => (
                  <Chip
                    key={sport}
                    icon={<SportsSoccer />}
                    label={sport}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'grey.200' }
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'grey.200' }
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

export default UpcomingEventsSlider; 