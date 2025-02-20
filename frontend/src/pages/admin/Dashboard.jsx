import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Event,
  EmojiEvents,
  PhotoLibrary,
  Mail,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Manage Events', icon: <Event />, path: '/admin/events' },
    { text: 'Manage Achievements', icon: <EmojiEvents />, path: '/admin/achievements' },
    { text: 'Manage Gallery', icon: <PhotoLibrary />, path: '/admin/gallery' },
    { text: 'Contact Messages', icon: <Mail />, path: '/admin/messages' }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* Sidebar */}
      <Paper
        sx={{
          width: 240,
          flexShrink: 0,
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              component={Link}
              to={item.path}
              key={item.text}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard; 