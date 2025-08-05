import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import useAuthStore from '../store/authStore';
import '../styles/style.css';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const login  = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();
        const success = await login(username,password);
        if (!success) setError('Invalid Username or password');

    };

    return(
        <Box className="login-box">
            <h1 className='h1'>
                Login
            </h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="User Name"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                {error && <Typography color='error'>{error}</Typography>}
                <Button type='submit' variant='contained' fullWidth sx={{mt: 5}}>Login</Button>
            </form>
        </Box>
    );
};

export default LoginForm;