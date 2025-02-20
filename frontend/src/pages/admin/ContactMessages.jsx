import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  TablePagination
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  MarkEmailRead as MarkEmailReadIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get('http://localhost:6000/api/contact', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(
        `http://localhost:6000/api/contact/${id}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:6000/api/contact/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Contact Messages
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Sport</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((message) => (
                <TableRow key={message._id}>
                  <TableCell>
                    {new Date(message.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.sport}</TableCell>
                  <TableCell>
                    <Chip
                      label={message.read ? 'Read' : 'Unread'}
                      color={message.read ? 'default' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setSelectedMessage(message)}>
                      <VisibilityIcon />
                    </IconButton>
                    {!message.read && (
                      <IconButton onClick={() => handleMarkAsRead(message._id)}>
                        <MarkEmailReadIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(message._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={messages.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog
        open={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Message Details</DialogTitle>
        {selectedMessage && (
          <DialogContent>
            <Typography variant="subtitle2" gutterBottom>
              From: {selectedMessage.name}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Email: {selectedMessage.email}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Phone: {selectedMessage.phone}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Sport: {selectedMessage.sport}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Date: {new Date(selectedMessage.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Message:
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedMessage.message}
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setSelectedMessage(null)}>Close</Button>
          {selectedMessage && !selectedMessage.read && (
            <Button
              onClick={() => {
                handleMarkAsRead(selectedMessage._id);
                setSelectedMessage(null);
              }}
              color="primary"
            >
              Mark as Read
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactMessages; 