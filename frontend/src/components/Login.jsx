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
import {Alert, Snackbar} from "@mui/material";

function Login({setUser}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.post('/account/login', {
                email: email,
                password: password
            })
            .then((response) => {
                setUser(response.data)
                navigate('/')
            })
            .catch(() => setError(true))
            .finally(() => setIsLoading(false))
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Вход</Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        inputProps={{required: true}}
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        error={error}
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <TextField
                        margin="normal"
                        inputProps={{required: true}}
                        fullWidth
                        label="Пароль"
                        type="password"
                        autoComplete="password"
                        error={error}
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>Войти</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                Нет аккаунта? Зарегистрируйтесь
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar
                open={error}
                onClose={() => setError(false)}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Почта или пароль указаны неверно!
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Login
