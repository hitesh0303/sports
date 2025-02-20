import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Box
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const levels = [
  'Khelo India',
  'All India Inter University',
  'South West Zone',
  'Division Level',
  'City Level'
];

const sports = [
  'Basketball',
  'Volleyball',
  'Table Tennis',
  'Carrom',
  'Chess',
  'Cricket',
  'Athletics'
];

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [formData, setFormData] = useState({
    level: '',
    sport: '',
    type: '',
    studentName: '',
    position: '',
    date: null,
    details: '',
    year: new Date().getFullYear()
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get('http://localhost:6000/api/achievements', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleOpen = (achievement = null) => {
    if (achievement) {
      setSelectedAchievement(achievement);
      setFormData({
        ...achievement,
        date: new Date(achievement.date)
      });
    } else {
      setSelectedAchievement(null);
      setFormData({
        level: '',
        sport: '',
        type: '',
        studentName: '',
        position: '',
        date: null,
        details: '',
        year: new Date().getFullYear()
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAchievement(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAchievement) {
        await axios.put(
          `http://localhost:6000/api/achievements/${selectedAchievement._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` }
          }
        );
      } else {
        await axios.post('http://localhost:6000/api/achievements', formData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
      fetchAchievements();
      handleClose();
    } catch (error) {
      console.error('Error saving achievement:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await axios.delete(`http://localhost:6000/api/achievements/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchAchievements();
      } catch (error) {
        console.error('Error deleting achievement:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Manage Achievements</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Achievement
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Level</TableCell>
              <TableCell>Sport</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {achievements.map((achievement) => (
              <TableRow key={achievement._id}>
                <TableCell>{achievement.level}</TableCell>
                <TableCell>{achievement.sport}</TableCell>
                <TableCell>{achievement.type}</TableCell>
                <TableCell>{achievement.studentName || 'Team'}</TableCell>
                <TableCell>{achievement.position}</TableCell>
                <TableCell>{achievement.year}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(achievement)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(achievement._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedAchievement ? 'Edit Achievement' : 'Add New Achievement'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              select
              label="Level"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              margin="normal"
              required
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Sport"
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
              margin="normal"
              required
            >
              {sports.map((sport) => (
                <MenuItem key={sport} value={sport}>
                  {sport}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              margin="normal"
              required
            >
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="team">Team</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Student Name"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              margin="normal"
              helperText="Leave empty for team achievement"
            />
            <TextField
              fullWidth
              label="Position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              margin="normal"
              required
            />
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={(newDate) => setFormData({ ...formData, date: newDate })}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
            />
            <TextField
              fullWidth
              label="Details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedAchievement ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ManageAchievements; 