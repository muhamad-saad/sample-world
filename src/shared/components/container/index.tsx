import React from 'react';
import Navbar from '../navbar';
import Container from '@mui/material/Container';
import "./styles.scss";

interface props {
    children: any
}

const CustomContainer:React.FC<props> = ({children}) => {
    return(
        <>
            <Navbar />
            <Container className="appContainer" maxWidth='xl'>
                {children}
            </Container>
        </>
    )
}


export default CustomContainer;