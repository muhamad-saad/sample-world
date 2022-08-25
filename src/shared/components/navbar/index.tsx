import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import "./styles.css";


const Navbar:React.FC = () => {
    return(
        <>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static" className='navbar'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <TravelExploreIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Explore
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}


export default Navbar;