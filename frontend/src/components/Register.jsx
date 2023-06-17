import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "../axios.jsx";
import {Alert, Snackbar} from "@mui/material";

function Register({setUser}) {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setIsLoading(true)
        axios.post('/account/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            .then((response) => {
                setUser(response.data)
                navigate('/')
            })
            .catch((e) => {
                setError(true)
                console.log(e)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Регистация</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputProps={{required: true, maxLength: 30}}
                                fullWidth
                                label="Имя"
                                autoComplete='off'
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputProps={{required: true, maxLength: 30}}
                                fullWidth
                                label="Фамилия"
                                autoComplete='off'
                                value={lastName}
                                onChange={e => setLastName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{required: true}}
                                fullWidth
                                label="Email"
                                type="email"
                                autoComplete='off'
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{required: true, minLength: 5, maxLength: 30}}
                                fullWidth
                                label="Пароль"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)} />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
                        Зарегистрироваться
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Уже есть аккаунт? Войдите
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
                    Не удалось зарегистрировать пользователя. Проверьте правильность внесеных даных.
                    Возможно, данный email уже зарегистрирован.
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Register
