import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import NavigationBar from '../../../components/organisms/NavigationBar';
import { useRouter } from 'next/navigation';
import Footer from '../../../components/molecules/Footer';
const styles = {
    firstCardBackground: {
        backgroundImage: `url('../../../../images/firstCardBackground.jpg')`,
        height: '500px',
        width: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
    firstCardContainer: {
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50,
    },
    firstCardContainerMobile: {
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '8px',
        marginRight: '8px',
        textAlign: 'center',
    },
    keyPoints: {
        height: '50px',
        width: '100%',
        display: 'flex',
        flexDireciton: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#C2FFE7',
    },
    secondCard: {
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    secondCardMobile: {
        width: '100%',
        height: '800px',
        marginTop: '5px',
        marginBottom: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    secondCardImagesContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '16px',
    },
    secondCardImagesContainerMobile: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    secondCardImage: { width: 250, textAlign: 'center' },
    secondCardImageMobile: {
        width: 250,
        textAlign: 'center',
        marginBottom: '16px',
    },
    thirdCardContainer: {
        width: '100%',
        height: '1418px',
        display: 'flex',
        flexDirection: 'column',

        backgroundColor: '#C2FFE7',
        textAlign: 'center',
    },
    thirdCardContainerMobile: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        backgroundColor: '#C2FFE7',
        textAlign: 'center',
        paddingTop: '8px',
        paddingBottom: '8px',
    },
    thirdCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '20px',
    },
    thirdCardMobile: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: '16px',
    },
    cardsContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    cardsContainerMobile: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: "space-evenly",
        alignItems: 'center',
    },
    thirdCardImage: { width: 350, textAlign: 'center' },
    thirdCardImageMobile: { textAlign: 'center', marginBottom: '16px' },
    fourthCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        backgroundColor: 'black',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
};

const HomePage = () => {
    const { push } = useRouter();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    return (
        <>
            <NavigationBar />
            <Box sx={styles.firstCardBackground}>
                <Box sx={isDesktop ? styles.firstCardContainer : styles.firstCardContainerMobile}>
                    <Typography typography={'h3'}>Nutrição com resultados</Typography>
                    <Typography sx={{ marginTop: '16px', marginBottom: '16px' }}>
                        Plano nutricional e os ingredientes prescritos a crú ou cozinhados sem sair de casa.
                    </Typography>

                    <PrimaryButton
                        onClick={() => {
                            push('/register');
                        }}
                    >
                        Marcar consulta
                    </PrimaryButton>
                </Box>
            </Box>
            {isDesktop && (
                <Box sx={styles.keyPoints}>
                    <Typography>Nutricionistas certificados</Typography>
                    <Typography>Planos personalizados</Typography>
                    <Typography>Entregas em casa</Typography>
                    <Typography>Resultados garantidos</Typography>
                </Box>
            )}
            <Box sx={isDesktop ? styles.secondCard : styles.secondCardMobile}>
                <Box sx={isDesktop ? styles.secondCardImagesContainer : styles.secondCardImagesContainerMobile}>
                    <Box sx={isDesktop ? styles.secondCardImage : styles.secondCardImageMobile}>
                        <img src={'../../../../images/Calendar.png'} alt="calendar" />
                        <Typography>Marca a tua consulta no dia e hora que te seja mais conveniente</Typography>
                    </Box>
                    <Box sx={isDesktop ? styles.secondCardImage : styles.secondCardImageMobile}>
                        <img src={'../../../../images/Carrinho.png'} alt="Cart" />
                        <Typography>
                            Recebe o teu plano nutriconal prescrito por um nutricionista certificado
                        </Typography>
                    </Box>
                    <Box sx={isDesktop ? styles.secondCardImage : styles.secondCardImageMobile}>
                        <img src={'../../../../images/Casa.png'} alt="Home" />
                        <Typography>Recebe os ingredientes prescritos no teu plano, em casa</Typography>
                    </Box>
                </Box>
                <PrimaryButton
                    onClick={() => {
                        push('/register');
                    }}
                >
                    Começa já
                </PrimaryButton>
            </Box>
            <Box sx={isDesktop ? styles.thirdCardContainer : styles.thirdCardContainerMobile}>
                <Typography sx={{ marginTop: '16px' }}>Quais as Vantagens?</Typography>
                <Typography typography={'h5'}> Comer Sem Sacrifício</Typography>
                <Box sx={isDesktop ? styles.thirdCard : styles.thirdCardMobile}>
                    <Box sx={isDesktop ? styles.cardsContainer : styles.cardsContainerMobile}>
                        <Box sx={isDesktop ? styles.thirdCardImage : styles.thirdCardImageMobile}>
                            <img
                                style={isDesktop ? {} : { width: 250 }}
                                src={'../../../../images/IMAGE_1.jpg'}
                                alt="calendar"
                            />
                            <Typography>Consultas no conforto da tua casa</Typography>
                        </Box>
                        <Box sx={isDesktop ? styles.thirdCardImage : styles.thirdCardImageMobile}>
                            <img
                                style={isDesktop ? {} : { width: 250 }}
                                src={'../../../../images/IMAGE_3.jpg'}
                                alt="Cart"
                            />
                            <Typography>
                                Entrega dos produtos do teu plano alimentar em casa aos melhores preços
                            </Typography>
                        </Box>
                        <Box sx={isDesktop ? styles.thirdCardImage : styles.thirdCardImageMobile}>
                            <img
                                style={isDesktop ? {} : { width: 250 }}
                                src={'../../../../images/IMAGE_5.jpg'}
                                alt="Home"
                            />
                            <Typography>Resultados garantidos sem dietas restritivas</Typography>
                        </Box>
                    </Box>
                    <Box sx={isDesktop ? styles.cardsContainer : styles.cardsContainerMobile}>
                        <Box sx={isDesktop ? styles.thirdCardImage : styles.thirdCardImageMobile}>
                            <img
                                style={isDesktop ? {} : { width: 250 }}
                                src={'../../../../images/IMAGE_2.jpg'}
                                alt="Home"
                            />
                            <Typography>Planos personalizados aos teus gostos e objetivos</Typography>
                        </Box>
                        <Box sx={isDesktop ? styles.thirdCardImage : styles.thirdCardImageMobile}>
                            <img
                                style={isDesktop ? {} : { width: 250 }}
                                src={'../../../../images/IMAGE_4.jpg'}
                                alt="Home"
                            />
                            <Typography>Receitas deliciosas aprovadas pelos nossos nutricionistas</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={styles.fourthCard}>
                <Typography>
                    Como sabemos que seguir uma dieta saudável pode ser difícil, tornamo-lo fácil entregando refeições
                    frescas diretamente na tua casa. Podes desfrutar de refeições deliciosas e caseiras sem ter de
                    sacrificar sabor ou conveniência.
                </Typography>
                <img
                    src={'../../../../images/delivery.png'}
                    style={isDesktop ? {} : { width: 250, marginTop: '16px', marginBottom: '16px' }}
                    alt="Home"
                />
                <PrimaryButton
                    onClick={() => {
                        push('/register');
                    }}
                >
                    Começa já
                </PrimaryButton>
            </Box>
            <Footer />
        </>
    );
};
export default HomePage;
