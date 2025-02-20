import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Paper,
  Divider,
  Button
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  SportsSoccer,
  Timer,
  Event
} from '@mui/icons-material';
import eventsData, { getEventTypeColor, getEventTypeLabel } from '../data/eventsData';

const UpcomingEvents = () => {
  const [selectedType, setSelectedType] = useState('all');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredEvents = selectedType === 'all' 
    ? eventsData 
    : eventsData.filter(event => event.type === selectedType);

  const eventTypes = ['all', ...new Set(eventsData.map(event => event.type))];

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
        Upcoming Events
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
        {eventTypes.map((type) => (
          <Chip
            key={type}
            label={type === 'all' ? 'All Events' : getEventTypeLabel(type)}
            onClick={() => setSelectedType(type)}
            color={type === selectedType ? 'primary' : 'default'}
            variant={type === selectedType ? 'filled' : 'outlined'}
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} key={event.id}>
            <Paper elevation={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={getEventTypeLabel(event.type)}
                      color={getEventTypeColor(event.type)}
                      icon={<Event />}
                    />
                    {event.registrationDeadline && (
                      <Chip 
                        label={`Registration Deadline: ${formatDate(event.registrationDeadline)}`}
                        color="warning"
                        icon={<Timer />}
                        variant="outlined"
                      />
                    )}
                  </Box>

                  <Typography variant="h4" gutterBottom>
                    {event.title}
                  </Typography>
                  
                  <Typography variant="body1" paragraph>
                    {event.description}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ mr: 1 }} color="primary" />
                      <Typography>
                        {formatDate(event.startDate)}
                        {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 1 }} color="primary" />
                      <Typography>{event.venue}</Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Sports & Activities:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {event.sports.map((sport) => (
                      <Chip
                        key={sport}
                        icon={<SportsSoccer />}
                        label={sport}
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  {event.highlights && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Event Highlights:
                      </Typography>
                      <ul>
                        {event.highlights.map((highlight, index) => (
                          <li key={index}>
                            <Typography variant="body1">{highlight}</Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  )}

                  {event.registrationLink && (
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        href={event.registrationLink}
                        target="_blank"
                      >
                        Register Now
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UpcomingEvents; 