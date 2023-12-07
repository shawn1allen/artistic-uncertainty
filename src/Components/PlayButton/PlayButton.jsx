import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; import './PlayButton.css'

function PlayButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="play-button-container">
      <IconButton
        className="play-button"
        color="primary"
        onClick={handleOpen}
        sx={{
          fontSize: '8rem',
          padding: '30px',
          border: '2px solid',
          borderRadius: '50%',
          color: 'white',
          transition: 'transform .3s ease',
          '&:hover': {
            transform: 'scale(1.2)',
            color: '#ff002b',
          },
        }}
      >
        <PlayArrowIcon fontSize="inherit" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        {/* Embedded YouTube video with responsive dimensions */}
        <div style={{ position: 'relative', width: '100%', height: '0', overflow: 'hidden', paddingBottom: '56.25%' }}>
          <iframe
            title="Tutorial Video"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', width: '100%', height: '101%' }}
          ></iframe>
        </div>
      </Dialog>
    </div>
  );
}

export default PlayButton;
