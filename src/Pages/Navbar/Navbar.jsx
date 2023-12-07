import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <AppBar sx={{
            position: 'fixed'
        }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Artistic Uncertainty
                </Typography>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
                    <li style={{ margin: '0 10px' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            Home
                        </Link>
                    </li>
                    <li style={{ margin: '0 10px' }}>
                        <Link to="/form" style={{ textDecoration: 'none', color: 'white' }}>
                            Single Grid Form
                        </Link>
                    </li>
                    <li style={{ margin: '0 10px' }}>
                        <Link to="/simulationLandingPage" style={{ textDecoration: 'none', color: 'white' }}>
                            Experiment Home
                        </Link>
                    </li>
                    <li style={{ margin: '0 10px' }}>
                        <Link to="/simulationForm" style={{ textDecoration: 'none', color: 'white' }}>
                            Experiment Form
                        </Link>
                    </li>
                    
                </ul>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar