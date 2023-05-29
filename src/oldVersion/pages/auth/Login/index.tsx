import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';

import { LockOutlined } from '@mui/icons-material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAuth } from '../../../providers/useAuth';
import { useRouter } from 'next/navigation';
import Copyright from '../../../components/molecules/Copyright';
import { toast } from 'react-toastify';

type CredentialsType = {
    email: string;
    password: string;
};

const Auth = () => {
    const theme = createTheme();

    const { login } = useAuth();
    const { push } = useRouter();

    const [credentials, setCrendentials] = useState<CredentialsType>({
        email: '',
        password: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setCrendentials({ ...credentials, [name]: value });
    };

    const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const { type } = await login(credentials.email, credentials.password);

            type !== 'client' ? push(`/${type}HomePage`) : push('/clientScheduleAppointment');
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const navigateToRegister = () => {
        push('/register');
    };

    const navigateToForgotPassword = () => {
        push('/forgotPassword');
    };

    return (
        //A PARTIR DAQUI

        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(../../../../images/login.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Iniciar Sessão
                        </Typography>
                        <Box component="form" noValidate onSubmit={onLogin} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Palavra-passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Iniciar sessão
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={navigateToForgotPassword} variant="body2">
                                        Esqueceu a palavra-passe?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link variant="body2" onClick={navigateToRegister}>
                                        {'Não tem uma conta? Registe-se'}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
export default Auth;
