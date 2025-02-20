import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import AdminSidebar from '../../components/AdminSidebar';
import Overview from './Overview';
import ManageEvents from './ManageEvents';
import ManageAchievements from './ManageAchievements';
import ManageGallery from './ManageGallery';
import ContactMessages from './ContactMessages';

const Admin = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="achievements" element={<ManageAchievements />} />
            <Route path="gallery" element={<ManageGallery />} />
            <Route path="messages" element={<ContactMessages />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default Admin; 