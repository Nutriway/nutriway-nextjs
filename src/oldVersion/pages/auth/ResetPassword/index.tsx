import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Copyright from '../../../components/molecules/Copyright';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../../api/auth';

const ResetPassword = () => {
    const theme = createTheme();

    const { push } = useRouter();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    const [recoverPasswordData, setRecoverPasswordData] = useState<any>({
        password: '',
        passwordConfirmation: '',
    });
    const [error, setError] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setRecoverPasswordData({ ...recoverPasswordData, [name]: value });
    };

    const onResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { password, passwordConfirmation } = recoverPasswordData;
            if (code) {
                const result = await resetPassword(code, password, passwordConfirmation);
                result ? push('/login') : setError(true);
            }
        } catch (error) {
            setError(true);
        }
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
                            Escreva a nova palavra-passe
                        </Typography>
                        <Box component="form" noValidate onSubmit={onResetPassword} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                onChange={handleChange}
                                name="password"
                                placeholder="Palavra-passe"
                                label="Palavra-passe"
                            ></TextField>
                            <TextField
                                onChange={handleChange}
                                name="passwordConfirmation"
                                placeholder="Confirmação de palavra-passe"
                                label="Confirmação de palavra-passe"
                                id="passwordConfirmation"
                                margin="normal"
                                required
                                fullWidth
                            ></TextField>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Submeter
                            </Button>
                            {error && <Typography>Ocorreu um erro. Por favor contacte-nos.</Typography>}
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};
export default ResetPassword;
