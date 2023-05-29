import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from '../../../providers/useAuth';
import { useRouter } from 'next/navigation';
import { styles } from './styles';
import NutriWayLogo from '../../../assets/images/NutriWayLogo';
import { useMediaQuery, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PrimaryButton from '../../atoms/PrimaryButton';

function NavigationBar() {
    const { push } = useRouter();
    const { user, logout } = useAuth();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    let pages;
    let settings;

    switch (user?.type) {
        case 'client':
            settings = [
                {
                    name: 'Informações pessoais',
                    target: '/clientPersonalInformation',
                },
                { name: 'Mudar palavra passe', target: '/changePassword' },
                { name: 'Terminar sessão', target: '/login' },
            ];
            break;
        default:
            settings = [
                { name: 'Mudar palavra passe', target: '/changePassword' },
                { name: 'Terminar sessão', target: '/login' },
            ];
    }

    const handleUserMenuClick = (setting: { name: string; target: string }) => {
        if (setting.name.includes('Terminar')) {
            logout();
        }
        handleCloseUserMenu();
        push(setting.target);
    };

    const handleNavClick = (target: string) => {
        handleCloseNavMenu();
        push(target);
    };

    switch (user?.type) {
        case 'client':
            pages = [
                { name: 'Agendar consulta', target: '/clientScheduleAppointment' },

                { name: 'Eventos', target: '/clientEvents' },

                { name: 'Plano Alimentar', target: '/clientDietPlans' },
            ];
            break;
        case 'consultant':
            pages = [
                { name: 'Nutricionistas', target: '/' },
                { name: 'Clientes', target: '/' },
                { name: 'Consultas', target: '/' },
                { name: 'Encomendas', target: '/' },
            ];
            break;
        case 'nutritionist':
            pages = [
                { name: 'Agendar consulta', target: '/newAppointment' },
                { name: 'Consultas', target: '/nutritionistAppointments' },

                { name: 'Clientes', target: '/nutritionistHomePage' },

                { name: 'Encomendas', target: '/nutritionistClientsOrders' },

                { name: 'Disponibilidade', target: '/nutritionistAvailability' },
                { name: 'Planos', target: '/nutritionistPlans' },
                { name: 'Receitas', target: '/nutritionistRecipes' },
            ];
            break;
        default:
            pages = !isDesktop
                ? [
                      { name: 'Iniciar sessão', target: '/login' },
                      { name: 'Registar', target: '/register' },
                  ]
                : [];
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    /*  const onNavigateToHomePage = () => {
    user && push(`/${user.type}HomePage`);
  }; */

    return (
        <AppBar sx={styles.navbarWrapper} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {isDesktop && <NutriWayLogo />}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages?.map((page) => (
                                <MenuItem key={page.name} onClick={() => handleNavClick(page.target)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages?.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleNavClick(page.target)}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    fontWeight: '500',
                                    letterSpacing: '1px',
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {user ? (
                            <>
                                {' '}
                                <Tooltip title="Abrir menu">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <AccountCircleIcon fontSize="large" sx={{ color: 'white' }} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting.name} onClick={() => handleUserMenuClick(setting)}>
                                            <Typography textAlign="center">{setting.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>{' '}
                            </>
                        ) : isDesktop ? (
                            <>
                                <PrimaryButton
                                    onClick={() => {
                                        push('/login');
                                    }}
                                >
                                    Iniciar Sessão
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={() => {
                                        push('/register');
                                    }}
                                >
                                    Registar
                                </PrimaryButton>
                            </>
                        ) : (
                            <NutriWayLogo />
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavigationBar;
