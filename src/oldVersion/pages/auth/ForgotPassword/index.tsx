import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../../../components/molecules/Copyright';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '../../../api/auth';

const ForgotPassword = () => {
    const theme = createTheme();

    const { push } = useRouter();
    const [forgotPasswordData, setForgotPasswordData] = useState<any>({
        email: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setForgotPasswordData({ ...forgotPasswordData, [name]: value });
    };

    const onForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await forgotPassword(forgotPasswordData.email);
        } catch (error) {
            console.log('Error on forgot password', error);
        }
    };

    const navigateToLogin = () => {
        push('/login');
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
                        backgroundImage: 'url(https://source.unsplash.com/random)',
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
                            Forgot password
                        </Typography>
                        <Box component="form" noValidate onSubmit={onForgotPassword} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleChange}
                                id="email"
                                name="email"
                                label="Email"
                                autoFocus
                            ></TextField>

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Submit
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link variant="body2" onClick={navigateToLogin}>
                                        {'Did you remember the password? Back to sign in'}
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
export default ForgotPassword;
