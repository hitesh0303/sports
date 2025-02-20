import { useState } from 'react';
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';

const galleryImages = [
  {
    img: '/images/elevate/basketball.jpg',
    title: 'Basketball Finals',
    cols: 2
  },
  {
    img: '/images/elevate/volleyball.jpg',
    title: 'Volleyball Match',
    cols: 1
  },
  {
    img: '/images/elevate/cricket.jpg',
    title: 'Cricket Tournament',
    cols: 1
  },
  {
    img: '/images/elevate/ceremony.jpg',
    title: 'Opening Ceremony',
    cols: 1
  },
  {
    img: '/images/elevate/awards.jpg',
    title: 'Prize Distribution',
    cols: 2
  },
  {
    img: '/images/elevate/chess.jpg',
    title: 'Chess Competition',
    cols: 1
  }
];

const ElevateGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ width: '100%', mb: 6 }}>
      <ImageList
        variant="quilted"
        cols={isMobile ? 1 : 3}
        rowHeight={isMobile ? 200 : 300}
        gap={16}
      >
        {galleryImages.map((item) => (
          <ImageListItem
            key={item.img}
            cols={isMobile ? 1 : item.cols}
            sx={{
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
                transition: 'opacity 0.3s ease-in-out'
              }
            }}
            onClick={() => setSelectedImage(item)}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>

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
            overflow: 'hidden'
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
            onClick={() => setSelectedImage(null)}
          >
            <Close />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage.img}
              alt={selectedImage.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ElevateGallery; 