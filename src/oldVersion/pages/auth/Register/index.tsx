import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../../../providers/useAuth';
import Copyright from '../../../components/molecules/Copyright';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type RegisterType = {
    email: string;
    password: string;
    name: string;
    type: 'client' | 'nutritionist' | 'consultant';
};

const Register = () => {
    const theme = createTheme();
    const { register } = useAuth();
    const { push } = useRouter();
    const [userData, setUserData] = useState<RegisterType>({
        email: '',
        password: '',
        name: '',
        type: 'client',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setUserData({ ...userData, [name]: value });
    };

    const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { type } = await register(userData.email, userData.password, userData.name, userData.type);
            if (type === 'client') {
                push('/clientScheduleAppointment');
                return;
            }
            push(`/${type}HomePage`);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    };

    const navigateToLogin = () => {
        push('/login');
    };

    const navigateToForgotPassword = () => {
        push('/forgotPassword');
    };

    return (
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
                            Registar
                        </Typography>
                        <Box component="form" noValidate onSubmit={onRegister} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleChange}
                                id="email"
                                type={'email'}
                                name="email"
                                label="Email"
                                autoFocus
                            ></TextField>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                type={'password'}
                                onChange={handleChange}
                                name="password"
                                placeholder="Palavra-passe"
                                label="Palavra-passe"
                            ></TextField>
                            <TextField
                                onChange={handleChange}
                                name="name"
                                placeholder="Nome"
                                label="Nome"
                                id="name"
                                margin="normal"
                                required
                                fullWidth
                            ></TextField>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Registar
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link onClick={navigateToForgotPassword} variant="body2">
                                        Esqueceu a palavra-passe?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link variant="body2" onClick={navigateToLogin}>
                                        {'Já tem uma conta? Inicie sessão'}
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
export default Register;
