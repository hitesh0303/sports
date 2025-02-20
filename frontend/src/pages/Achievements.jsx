import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';
import { EmojiEvents, Groups, Person } from '@mui/icons-material';

// Static achievements data
const staticAchievements = [
  {
    level: "Khelo India",
    achievements: [
      {
        sport: "Wrestling",
        type: "individual",
        studentName: "Rahul Kumar",
        position: "Gold Medal",
        year: 2024
      },
      {
        sport: "Athletics",
        type: "individual",
        studentName: "Priya Sharma",
        position: "Silver Medal - 100m Sprint",
        year: 2024
      }
    ]
  },
  {
    level: "All India Inter University",
    achievements: [
      {
        sport: "Cricket",
        type: "team",
        position: "Winners",
        year: 2024
      },
      {
        sport: "Basketball",
        type: "team",
        position: "Runners Up",
        year: 2024
      }
    ]
  },
  {
    level: "South West Zone",
    achievements: [
      {
        sport: "Football",
        type: "team",
        position: "Champions",
        year: 2024
      },
      {
        sport: "Table Tennis",
        type: "individual",
        studentName: "Amit Patel",
        position: "Winner",
        year: 2024
      }
    ]
  },
  {
    level: "Division Level",
    achievements: [
      {
        sport: "Badminton",
        type: "individual",
        studentName: "Sneha Reddy",
        position: "Gold Medal",
        year: 2023
      }
    ]
  },
  {
    level: "City Level",
    achievements: [
      {
        sport: "Chess",
        type: "individual",
        studentName: "Rohan Shah",
        position: "Champion",
        year: 2023
      }
    ]
  }
];

const AchievementCard = ({ level, achievements }) => {
  const [expanded, setExpanded] = useState(false);

  const getLevelColor = (level) => {
    const colors = {
      "Khelo India": "#FFD700",
      "All India Inter University": "#C0C0C0",
      "South West Zone": "#CD7F32",
      "Division Level": "#4CAF50",
      "City Level": "#2196F3"
    };
    return colors[level] || "#1976d2";
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': { 
          transform: 'scale(1.02)',
          boxShadow: 6
        },
        position: 'relative',
        overflow: 'visible'
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -20,
          left: 20,
          backgroundColor: getLevelColor(level),
          color: 'white',
          padding: '5px 15px',
          borderRadius: '15px',
          boxShadow: 2
        }}
      >
        <Typography variant="subtitle2">
          {level}
        </Typography>
      </Box>
      <CardContent sx={{ pt: 4 }}>
        {!expanded ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmojiEvents sx={{ mr: 1, color: getLevelColor(level) }} />
              <Typography variant="h6">
                {achievements.length} Achievement{achievements.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {achievements.map((achievement, idx) => (
                <Chip
                  key={idx}
                  icon={achievement.type === 'team' ? <Groups /> : <Person />}
                  label={achievement.sport}
                  size="small"
                />
              ))}
            </Box>
          </>
        ) : (
          <>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Sport</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Year</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {achievements.map((achievement, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{achievement.sport}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {achievement.type === 'team' ? <Groups sx={{ mr: 1 }} /> : <Person sx={{ mr: 1 }} />}
                          {achievement.type}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {achievement.type === 'individual' ? achievement.studentName : 'Team'}
                      </TableCell>
                      <TableCell>{achievement.position}</TableCell>
                      <TableCell>{achievement.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const Achievements = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6 }}>
        Our Achievements
      </Typography>

      <Grid container spacing={4}>
        {staticAchievements.map((category) => (
          <Grid item xs={12} md={6} key={category.level}>
            <AchievementCard 
              level={category.level} 
              achievements={category.achievements} 
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Achievements; 