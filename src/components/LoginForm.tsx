import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import useAuthStore from '../store/authStore';
import '../styles/style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
   const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
    } catch (err: any) {
      setError(err.message);
    }
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
                {error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                    </Typography>
                )}
                <Button type='submit' variant='contained' fullWidth sx={{mt: 5}}>Login</Button>
            </form>
        </Box>
    );
};

export default Login;