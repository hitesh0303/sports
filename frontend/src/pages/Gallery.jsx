import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Modal,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';

// Static gallery data
const galleryImages = [
  {
    id: 1,
    title: "Cricket Championship 2024",
    description: "PICT Cricket Team winning the inter-college tournament",
    url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600",
    category: "Cricket"
  },
  {
    id: 2,
    title: "Basketball Tournament",
    description: "Basketball team during South West Zone tournament",
    url: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=600",
    category: "Basketball"
  },
  {
    id: 3,
    title: "Athletics Meet",
    description: "Annual athletics meet - 100m sprint finals",
    url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&h=600",
    category: "Athletics"
  },
  {
    id: 4,
    title: "Football Match",
    description: "Football team in action during division level match",
    url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600",
    category: "Football"
  },
  {
    id: 5,
    title: "Table Tennis Championship",
    description: "Table Tennis singles final match",
    url: "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&h=600",
    category: "Table Tennis"
  },
  {
    id: 6,
    title: "Chess Tournament",
    description: "Inter-college chess tournament finals",
    url: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&h=600",
    category: "Chess"
  },
  {
    id: 7,
    title: "Badminton Finals",
    description: "Inter-college badminton championship match",
    url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=600",
    category: "Badminton"
  },
  {
    id: 8,
    title: "Swimming Competition",
    description: "Annual swimming championship",
    url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600",
    category: "Swimming"
  },
  {
    id: 9,
    title: "Volleyball Tournament",
    description: "PICT Volleyball team in action",
    url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600",
    category: "Volleyball"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 6 }}>
        Sports Gallery
      </Typography>

      <Grid container spacing={3}>
        {galleryImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.03)',
                }
              }}
              onClick={() => setSelectedImage(image)}
            >
              <CardMedia
                component="img"
                height="260"
                image={image.url}
                alt={image.title}
                sx={{ 
                  objectFit: 'cover',
                  backgroundColor: 'grey.200'
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {image.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {image.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Image Modal */}
      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 0,
            overflow: 'hidden'
          }}
        >
          <IconButton
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.7)'
              }
            }}
          >
            <Close />
          </IconButton>
          {selectedImage && (
            <>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: 'calc(90vh - 100px)',
                  objectFit: 'contain'
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">
                  {selectedImage.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedImage.description}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default Gallery; 