import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import {
  Event,
  CalendarToday,
  EmojiEvents,
  Mail,
  SportsScore
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 3,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      bgcolor: `${color}.light`,
      color: `${color}.dark`
    }}
  >
    <Box>
      <Typography variant="h6" color="inherit">
        {title}
      </Typography>
      <Typography variant="h4" color="inherit">
        {value}
      </Typography>
    </Box>
    {icon}
  </Paper>
);

const Overview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:6000/api/admin/stats', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.token]);

  if (loading) return <CircularProgress />;
  if (!stats) return <Typography color="error">Error loading dashboard data</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            icon={<Event sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Events"
            value={stats.upcomingEvents}
            icon={<CalendarToday sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Achievements"
            value={stats.totalAchievements}
            icon={<EmojiEvents sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Unread Messages"
            value={stats.unreadMessages}
            icon={<Mail sx={{ fontSize: 40 }} />}
            color="error"
          />
        </Grid>

        {/* Achievement Charts */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Achievements by Level
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.achievementsByLevel}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Achievements by Sport
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.achievementsBySport}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Lists */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Recent Achievements" />
            <CardContent>
              <List>
                {stats.recentAchievements.map((achievement) => (
                  <ListItem key={achievement._id}>
                    <ListItemText
                      primary={`${achievement.sport} - ${achievement.position}`}
                      secondary={`${achievement.studentName || 'Team'} | ${new Date(
                        achievement.date
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Upcoming Events" />
            <CardContent>
              <List>
                {stats.nextEvents.map((event) => (
                  <ListItem key={event._id}>
                    <ListItemText
                      primary={event.title}
                      secondary={`${new Date(
                        event.startDate
                      ).toLocaleDateString()} | ${event.venue}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Overview; 