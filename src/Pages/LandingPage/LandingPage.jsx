import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../../Components/PlayButton/PlayButton';
import { Button, Typography } from '@mui/material';

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ 
        backgroundColor: '#272833', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        textAlign: 'center'
        }}>
      

      {/* App description */}
      <div>
        <Typography variant="h2" style={{ color: '#fff', paddingBottom: '5px' }}>
          Welcome to Artistic Uncertainty!
        </Typography>
        <Typography variant="h6" style={{ color: '#fff', paddingLeft: '50px', paddingRight: '50px' }}>
          Artistic Uncertainty is an interactive art generator that allows you to create beautiful patterns using a blend of colors. Watch the tutorial video below then click GET STARTED!
        </Typography>
      </div>

<PlayButton />
      
      {/* Button to navigate to the form */}
      <div className="button-container">
        <Link to="/form">
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
