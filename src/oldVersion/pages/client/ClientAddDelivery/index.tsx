import React, { useState } from 'react';
import { Box, Button, Step, Stepper, Typography, useMediaQuery, useTheme } from '@mui/material';
import CustomStepLabel from '../../../components/atoms/CustomStepLabel';
import CustomTextField from '../../../components/atoms/CustomTextField';
import PaymentStep from '../../../components/molecules/PaymentStep';
import NavigationBar from '../../../components/organisms/NavigationBar';
import { styles } from './styles';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

const ClientAddDelivery = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState<string>();
    const [form, setForm] = useState<any>({
        city: '',
        street: '',
        zipCode: '',
        nif: '',
        date: '',
    });

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const { push } = useRouter();

    const onChange = (e: any) => {
        const { value, name } = e.target;

        setForm({ ...form, [name]: value });
    };

    const previousStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleDateChange = (newValue: Dayjs | null) => {
        setForm({ ...form, date: `${newValue}` });
    };

    return (
        <Box>
            <NavigationBar />
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',

                    p: 4,
                }}
            >
                <Stepper activeStep={activeStep}>
                    <Step>
                        <CustomStepLabel>{!isDesktop && activeStep !== 0 ? '' : 'Nutricionista'}</CustomStepLabel>
                    </Step>
                    <Step>
                        <CustomStepLabel>{!isDesktop && activeStep !== 1 ? '' : 'Pagamento'}</CustomStepLabel>
                    </Step>
                </Stepper>

                {activeStep === 0 && (
                    <Box sx={styles.addressWrapper}>
                        <Typography variant="h6" component="h2" sx={{ mt: 4 }}>
                            Informações para entrega
                        </Typography>
                        <Typography sx={{ mt: 2 }}>Preencha as informações para a sua entrega</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 4 }}>
                            <CustomTextField
                                onChange={onChange}
                                label="Rua"
                                placeholder="Rua"
                                variant="outlined"
                                name="street"
                                value={form?.street}
                                fullWidth
                            ></CustomTextField>
                            <CustomTextField
                                sx={{ ml: 1 }}
                                onChange={onChange}
                                label="Código-postal"
                                placeholder="Código-postal"
                                variant="outlined"
                                name="zipCode"
                                value={form?.zipCode}
                                fullWidth
                            ></CustomTextField>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    disablePast={true}
                                    label="Data"
                                    inputFormat="DD/MM/YYYY"
                                    value={form.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <CustomTextField {...params} sx={{ flex: 1 }} />}
                                />
                                <TimePicker
                                    label="Hora"
                                    value={form.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => (
                                        <CustomTextField {...params} sx={{ flex: 1, ml: 2, mr: 2 }} />
                                    )}
                                />
                                <CustomTextField
                                    sx={{ flex: 1 }}
                                    onChange={onChange}
                                    label="NIF"
                                    placeholder="NIF"
                                    variant="outlined"
                                    name="nif"
                                    value={form?.nif}
                                    fullWidth
                                ></CustomTextField>
                            </LocalizationProvider>
                        </Box>
                    </Box>
                )}
                {activeStep === 1 && (
                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <PaymentStep
                            onPaymentDone={(isPaid: boolean) => {
                                if (isPaid) {
                                    push('/clienttHomePage');
                                }
                            }}
                            setSelectedPaymentMethod={() => {}}
                            delivery={form}
                            price={'6,15€'}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                    </Box>
                )}

                <Box sx={styles.modalFooter}>
                    {activeStep === 1 && (
                        <Button sx={styles.previousStepButton} onClick={previousStep}>
                            voltar
                        </Button>
                    )}

                    {activeStep === 0 && (
                        <Button sx={styles.nextStepButton} onClick={nextStep}>
                            avançar
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default ClientAddDelivery;
