import { Box, Button, Modal, TableCell, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import {
    deleteAppointment,
    nutritionistEntersOnAppointment,
    updateAppointmentByClient,
    updateAppointmentByNutritionist,
} from '../../../api/appointment';
import { useAuth } from '../../../providers/useAuth';
import { styles } from './styles';
import { AppointmentType } from '../../../pages/nutritionist/NutritionistAppointments';
import CancelButton from '../../atoms/CancelButton';
import StartButton from '../../atoms/StartButton';
import PrimaryButton from '../../atoms/StartButton';
import EditButton from '../../atoms/EditButton';
import SubmitButton from '../../atoms/PrimaryButton';
import CustomTextField from '../../atoms/CustomTextField';
import { isPlanFinished } from '../../../util/dietPlans';
import { createSearchParams, useNavigate } from 'react-router-dom';
import NutritionistAppointment from '../../organisms/NutritionistAppointment';

type AppointmentRowProps = {
    appointment: AppointmentType;
    fetchAppointments: () => Promise<void>;
    setActiveAppointment?: (appointment: AppointmentType) => void;
};

type FormType = {
    dateTime: Dayjs;
};
const AppointmentRow = ({ appointment, setActiveAppointment, fetchAppointments }: AppointmentRowProps) => {
    const { user } = useAuth();
    const { push } = useRouter();

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openInfoModal, setOpenInfoModal] = useState(false);

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const handleOpenEditModal = () => setOpenEditModal(true);
    const handleCloseEditModal = () => setOpenEditModal(false);
    const handleOpenInfoModal = () => setOpenInfoModal(true);
    const handleCloseInfoModal = () => setOpenInfoModal(false);

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => setOpenDeleteModal(true);
    const handleCloseDeleteModal = () => setOpenDeleteModal(false);

    const date =
        appointment.attributes?.nutritionist_availability?.data?.attributes?.date || appointment.attributes?.date;

    const initialForm: FormType = {
        dateTime: dayjs(date),
    };

    const [form, setForm] = useState<FormType>(initialForm);

    const startAppointment = async () => {
        if (setActiveAppointment) {
            setActiveAppointment(appointment);
            return;
        }

        if (user?.type === 'client') navigateToClientAppointment();
        if (user?.type === 'nutritionist') {
            await nutritionistEntersOnAppointment(appointment, user.jwt);
            navigateToNutritionistAppointment();
        }
    };

    const navigateToAppointmentHistory = () => {
        if (appointment) {
            push({
                pathname: '/appointmentHistoryItem',
                search: createSearchParams({
                    appointment: appointment.id.toString(),
                }).toString(),
            });
        }
    };

    const navigateToNutritionistAppointment = () => {
        if (appointment) {
            push({
                pathname: '/nutritionistAppointmentPage',
                search: createSearchParams({
                    appointment: appointment.id.toString(),
                }).toString(),
            });
        }
    };

    const navigateToClientAppointment = () => {
        if (appointment) {
            push({
                pathname: '/clientAppointmentPage',
                search: createSearchParams({
                    appointment: appointment.id.toString(),
                }).toString(),
            });
        }
    };

    const cancelAppointment = async () => {
        await deleteAppointment(appointment.id, user!.jwt);
        await fetchAppointments();
    };

    const onChangeDateTime = (value: Dayjs | null) => {
        if (value) {
            setForm({ ...form, dateTime: value });
        }
    };

    const isFormValid = () => {
        if (form.dateTime.isValid()) {
            return form.dateTime.toISOString().substring(14, 16) === '00';
        }
        return false;
    };

    const formChanged = () => {
        return dateTimeChanged();
    };

    const dateTimeChanged = () => {
        if (form.dateTime.isValid()) {
            return form.dateTime.toISOString() !== initialForm.dateTime.toISOString();
        }
        return false;
    };

    const onSubmit = async () => {
        try {
            if (user) {
                if (user.type === 'client') {
                    await updateAppointmentByClient(form.dateTime.toISOString(), appointment, user.jwt);
                }

                if (user.type === 'nutritionist') {
                    await updateAppointmentByNutritionist(form.dateTime.toISOString(), appointment, user);
                }

                await fetchAppointments();
            }
        } catch (error) {
        } finally {
            handleCloseEditModal();
        }
    };

    const checkButtonText = (): string => {
        let text = 'entrar';
        if (user?.type === 'client') {
            if (appointment.attributes.appointment_payment?.data?.attributes.status !== 'completed') {
                text = 'pagar';
            }
        } else {
            if (appointment.attributes?.appointment_result?.data?.attributes) {
                text = 'retomar';
            }
        }
        return text;
    };
    const checkHistoryButtonText = (): string => {
        let text = 'Adicionar plano';
        if (user?.type === 'nutritionist') {
            if (
                isPlanFinished(
                    appointment.attributes?.appointment_result?.data?.attributes?.nutritionist_diet_plan?.data
                        ?.attributes,
                )
            ) {
                return 'Detalhes';
            }

            if (
                appointment.attributes?.appointment_result?.data?.attributes?.nutritionist_diet_plan?.data?.attributes
                    ?.plan
            ) {
                return 'Concluir plano';
            }
        }
        return text;
    };

    return (
        <TableRow sx={styles.tableRow}>
            {isDesktop ? (
                <>
                    <TableCell sx={styles.tableCell}>
                        {user?.type === 'client'
                            ? appointment.attributes?.nutritionist_availability?.data?.attributes.nutritionist?.data
                                  ?.attributes?.username || 'Por atribuir...'
                            : appointment.attributes?.client.data.attributes.username}
                    </TableCell>
                    <TableCell sx={styles.tableCell}>{dayjs(date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell sx={styles.tableCell}>{dayjs(date).format('HH:00')}</TableCell>
                </>
            ) : (
                <TableCell sx={isDesktop ? styles.tableCell : styles.mobileTableCell}>
                    {dayjs(date).format('DD/MM/YYYY')}-{dayjs(date).format('HH:00')}
                </TableCell>
            )}

            <TableCell sx={isDesktop ? styles.tableCell : styles.mobileTableActionsCell}>
                {!appointment.attributes?.appointment_result?.data?.attributes?.notes ? (
                    <Box>
                        <StartButton
                            sx={isDesktop ? { mr: 2 } : {}}
                            variant="contained"
                            onClick={startAppointment}
                            disabled={
                                !appointment.attributes?.nutritionist_availability?.data?.attributes.nutritionist
                                    ?.data ||
                                (!(new Date(date || '').getTime() - 60 * 60 * 1000 < Date.now()) &&
                                    checkButtonText() === 'entrar') ||
                                (user?.type === 'client' &&
                                    !appointment.attributes?.nutritionist_availability?.data?.attributes.nutritionist
                                        ?.data &&
                                    checkButtonText() === 'pagar')
                            }
                        >
                            {checkButtonText()}
                        </StartButton>

                        <Button
                            sx={isDesktop ? { mr: 2 } : { mt: 2, mb: 2 }}
                            variant="contained"
                            onClick={handleOpenInfoModal}
                            disabled={
                                user?.type === 'client' &&
                                !appointment.attributes?.nutritionist_availability?.data?.attributes.nutritionist?.data
                            }
                        >
                            Info
                        </Button>

                        <EditButton
                            sx={isDesktop ? { mr: 2 } : { mt: 2, mb: 2 }}
                            variant="contained"
                            onClick={handleOpenEditModal}
                        >
                            Reagendar
                        </EditButton>
                        <CancelButton variant="contained" onClick={handleOpenDeleteModal}>
                            Cancelar
                        </CancelButton>
                    </Box>
                ) : (
                    <StartButton sx={{ mr: 2 }} variant="contained" onClick={navigateToAppointmentHistory}>
                        {checkHistoryButtonText()}
                    </StartButton>
                )}
            </TableCell>

            <Modal
                open={openInfoModal}
                onClose={handleCloseInfoModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.infoModal}>
                    <NutritionistAppointment appointment={appointment} showOnlyInfo />
                </Box>
            </Modal>

            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.editModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Reagendar consulta
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Submeta a data e hora desejada.
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box sx={styles.formField}>
                            <DesktopDatePicker
                                disablePast={true}
                                label="Data"
                                inputFormat="DD/MM/YYYY"
                                value={form.dateTime}
                                onChange={onChangeDateTime}
                                renderInput={(params) => <CustomTextField {...params} />}
                            />
                        </Box>
                        <Box sx={styles.formField}></Box>
                        <Box sx={styles.editModalFooter}>
                            <TimePicker
                                label="Hora"
                                value={form.dateTime}
                                onChange={onChangeDateTime}
                                renderInput={(params) => (
                                    <CustomTextField
                                        /* sx={{
                      svg: { color: pallete.colors.primaryColor },
                    }} */
                                        {...params}
                                    />
                                )}
                                minutesStep={60}
                                minTime={dayjs('Fri, 25 Jan 2019 05:00:00 GMT')}
                                maxTime={dayjs('Fri, 26 Jan 2019 23:00:00 GMT')}
                            />

                            <SubmitButton
                                disabled={!formChanged() || !isFormValid()}
                                variant="contained"
                                onClick={onSubmit}
                                sx={{ ml: 2 }}
                            >
                                Reagendar
                            </SubmitButton>
                        </Box>
                    </LocalizationProvider>
                </Box>
            </Modal>

            <Modal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.deleteModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Desmarcar consulta
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tem a certeza que pretende desmarcar esta consulta?
                    </Typography>

                    <Box sx={styles.deleteModalFooter}>
                        <PrimaryButton sx={{ mr: 2 }} variant="contained" onClick={cancelAppointment}>
                            Sim
                        </PrimaryButton>
                        <CancelButton variant="contained" onClick={handleCloseDeleteModal}>
                            Não
                        </CancelButton>
                    </Box>
                </Box>
            </Modal>
        </TableRow>
    );
};

export default AppointmentRow;
