import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../../Components/PlayButton/PlayButton';
import { Button, Typography } from '@mui/material';

const SimulationLandingPage = () => {
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
                    Welcome to the Simulation Page!
                </Typography>
                <Typography variant="h6" style={{ color: '#fff', paddingLeft: '50px', paddingRight: '50px' }}>
                    Step into the realm of STEM exploration on our second page, where creativity meets computation. Engage in a
                    captivating simulation as multiple grids come to life, each telling a unique story through the artful dance
                    of randomly painted squares. Immerse yourself in the world of statistics and mathematics as we dissect the
                    data from these vibrant grids, offering you insights into the fascinating patterns and connections that
                    unfold before your eyes. Let the numbers guide you through a journey of discovery, bridging the gap between
                    imagination and STEM reality.
                </Typography>
            </div>

            <PlayButton />

            {/* Button to navigate to the form */}
            <div className="button-container">
                <Link to="/SimulationForm">
                    <Button variant="contained" color="primary">
                        Get Started
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SimulationLandingPage;
