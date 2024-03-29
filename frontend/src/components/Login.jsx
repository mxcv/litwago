import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from "@mui/material/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import axios from "../axios.jsx";
import {useState} from "react";

function Login({setUser, setIsLoading, setError}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        axios.post('/account/login', {
                email: email,
                password: password
            })
            .then((response) => {
                setUser(response.data)
                navigate('/')
            })
            .catch(() => setError('Почта или пароль указаны неверно!'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Container maxWidth="xs" sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Вход</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        inputProps={{required: true}}
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <TextField
                        margin="normal"
                        inputProps={{required: true}}
                        fullWidth
                        label="Пароль"
                        type="password"
                        autoComplete="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Войти</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Нет аккаунта? Зарегистрируйтесь
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
