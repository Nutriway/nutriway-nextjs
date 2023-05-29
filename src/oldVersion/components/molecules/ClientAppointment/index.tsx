import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import { AppointmentType } from '../../../pages/nutritionist/NutritionistAppointments';
import { useRouter } from 'next/navigation';
import PrimaryButton from '../../atoms/PrimaryButton';
import { pallete } from '../../../util/styles/pallete';
import { getAppointmentResultByAppointmentId } from '../../../api/appointment';
import { useAuth } from '../../../providers/useAuth';

type AppointmentProps = {
    appointment: AppointmentType;
};

function ClientAppointment({ appointment }: AppointmentProps) {
    const { user } = useAuth();
    const { push } = useRouter();
    const onSubmit = async (e: any) => {
        e?.preventDefault();

        try {
            const appointmentResult = await getAppointmentResultByAppointmentId(appointment.id, user!.jwt);

            appointmentResult?.attributes?.planType === 'nutritionistDeliverIngredients'
                ? push('/clientAddDelivery')
                : push('/clientDietPlans');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={styles.pageWrapper}>
            <Box>
                <iframe
                    allow="camera;microphone"
                    title="meeting"
                    height="620"
                    width="100%"
                    src={appointment.attributes.meeting_url}
                ></iframe>
                <Box sx={styles.appointmentInfo}>
                    <Box>
                        <Typography variant="h5">
                            {`${appointment.attributes.nutritionist_availability.data.attributes.nutritionist.data.attributes.username} `}
                        </Typography>
                        <Typography variant="subtitle1" sx={styles.appointmentDate}>
                            {` ${dayjs(appointment.attributes.nutritionist_availability.data.attributes.date).format(
                                'DD/MM/YYYY HH:mm',
                            )}`}
                        </Typography>
                        <Typography variant="subtitle1" sx={styles.appointmentDate}>
                            Se não conseguir visualizar a consulta neste ecrã clique{' '}
                            <a href={appointment.attributes?.meeting_url} target="_blank" rel="noreferrer noopener">
                                aqui
                            </a>
                        </Typography>
                    </Box>

                    <PrimaryButton
                        sx={{ backgroundColor: pallete.colors.cancelColor }}
                        variant="contained"
                        onClick={onSubmit}
                    >
                        terminar consulta
                    </PrimaryButton>
                </Box>{' '}
            </Box>
        </Box>
    );
}

export default ClientAppointment;
