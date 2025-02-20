import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const RecentAchievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await axios.get('http://localhost:6000/api/achievements');
        const currentYear = new Date().getFullYear();
        const recentAchievements = data.filter(achievement => achievement.year === currentYear);
        setAchievements(recentAchievements);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Recent Achievements
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Sport</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {achievements.map((achievement) => (
              <TableRow key={achievement._id}>
                <TableCell>{achievement.eventName}</TableCell>
                <TableCell>{achievement.sport}</TableCell>
                <TableCell>{achievement.type}</TableCell>
                <TableCell>{achievement.studentName || 'Team'}</TableCell>
                <TableCell>{achievement.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentAchievements; 