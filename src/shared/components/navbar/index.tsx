import React from 'react';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Grid from '@mui/material/Grid';
import "./styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getMode, setMode } from 'modules/country/redux/countrySlice';


const Navbar:React.FC = () => {
    const dispatch = useDispatch()
    const mode = useSelector(getMode)

    return(
        <>
            <Grid container alignItems="center" justifyContent={"space-between"} className='navbar'>
                <Grid item className='logo'>
                    Where in the world?
                </Grid>
                <Grid item className='mode' onClick={() => dispatch(setMode({mode: mode === 'light' ? 'dark' : 'light'}))}>
                    {mode === 'light' ? <DarkModeOutlinedIcon className='icon'/>: <DarkModeIcon className='icon'/>} &nbsp;&nbsp;Dark Mode
                </Grid>
            </Grid>
        </>
    )
}


export default Navbar;