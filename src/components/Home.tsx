import React from "react";
import '../styles/home.css';
import { Button, Box, Typography } from '@mui/material';
import useAuthStore from "../store/authStore";



const Home: React.FC = () => {

    const logout = useAuthStore((state) => state.logout)
    const handleLogout = () => {
        logout();
    }
    return (
        <Box className='header-box'>
            <div className="home">
                <h1>Welcome...!</h1>
                <p>You are now logged in.....</p>
                <Button className='log-out-btn' onClick={handleLogout} variant='contained' fullWidth sx={{mt: 2}}>Log Out</Button>
            </div>
        </Box>
        
    );
};

export default Home; 