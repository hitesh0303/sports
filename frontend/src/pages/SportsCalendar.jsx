import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Download } from '@mui/icons-material';

const TabPanel = ({ children, value, index }) => (
  <div hidden={value !== index} role="tabpanel">
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const SportsCalendar = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Sample data - replace with actual data from backend
  const elevateEvents = {
    title: "ELEVATE 2024",
    date: "March 15-17, 2024",
    sports: [
      { name: "Basketball", venue: "Main Court", date: "March 15" },
      { name: "Volleyball", venue: "Outdoor Court", date: "March 16" },
      { name: "Table Tennis", venue: "Indoor Hall", date: "March 16" },
      { name: "Chess", venue: "Recreation Room", date: "March 17" },
      { name: "Carrom", venue: "Recreation Room", date: "March 17" }
    ],
    brochureUrl: "/documents/elevate-2024-brochure.pdf"
  };

  const intraEvents = [
    {
      category: "Students",
      events: [
        { sport: "Basketball", date: "Feb 10-12, 2024", gender: "Boys & Girls" },
        { sport: "Volleyball", date: "Feb 13-15, 2024", gender: "Boys & Girls" },
        { sport: "Carrom", date: "Feb 16, 2024", gender: "Mixed" },
        { sport: "Chess", date: "Feb 17, 2024", gender: "Mixed" },
        { sport: "100m Sprint", date: "Feb 18, 2024", gender: "Boys & Girls" }
      ]
    },
    {
      category: "Teachers",
      events: [
        { sport: "Carrom", date: "Feb 24, 2024", gender: "Mixed" },
        { sport: "Table Tennis", date: "Feb 25, 2024", gender: "Mixed" },
        { sport: "Badminton", date: "Feb 26, 2024", gender: "Mixed" }
      ]
    }
  ];

  const prizeDistribution = {
    date: "March 30, 2024",
    time: "10:00 AM",
    venue: "College Auditorium",
    chiefGuest: "Mr. Sports Legend",
    details: "Annual Sports Prize Distribution Ceremony for all events conducted throughout the year"
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        Sports Calendar
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="ELEVATE" />
          <Tab label="INTRA College Events" />
          <Tab label="Prize Distribution" />
        </Tabs>
      </Box>

      {/* ELEVATE Events */}
      <TabPanel value={tabValue} index={0}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {elevateEvents.title}
          </Typography>
          <Typography variant="h6" gutterBottom color="text.secondary">
            {elevateEvents.date}
          </Typography>

          <TableContainer component={Paper} sx={{ my: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sport</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Venue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {elevateEvents.sports.map((sport) => (
                  <TableRow key={sport.name}>
                    <TableCell>{sport.name}</TableCell>
                    <TableCell>{sport.date}</TableCell>
                    <TableCell>{sport.venue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            startIcon={<Download />}
            href={elevateEvents.brochureUrl}
            target="_blank"
          >
            Download Brochure
          </Button>
        </Box>
      </TabPanel>

      {/* INTRA College Events */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {intraEvents.map((category) => (
            <Grid item xs={12} key={category.category}>
              <Typography variant="h5" gutterBottom>
                {category.category}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sport</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {category.events.map((event) => (
                      <TableRow key={event.sport}>
                        <TableCell>{event.sport}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.gender}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Prize Distribution */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Annual Prize Distribution Ceremony
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Date: {prizeDistribution.date}
            </Typography>
            <Typography variant="body1" paragraph>
              Time: {prizeDistribution.time}
            </Typography>
            <Typography variant="body1" paragraph>
              Venue: {prizeDistribution.venue}
            </Typography>
            <Typography variant="body1" paragraph>
              Chief Guest: {prizeDistribution.chiefGuest}
            </Typography>
            <Typography variant="body1">
              {prizeDistribution.details}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View Program Schedule
            </Button>
          </CardActions>
        </Card>
      </TabPanel>
    </Container>
  );
};

export default SportsCalendar; 