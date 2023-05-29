import React from "react";
import {
    Box,
    TableCell,
    useMediaQuery,
    useTheme,
    Modal,
    Typography,
} from "@mui/material";
import {
    DesktopDatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styles } from "./styles";
import CancelButton from "../../atoms/CancelButton";
import StartButton from "../../atoms/StartButton";
import EditButton from "../../atoms/EditButton";
import SubmitButton from "../../atoms/PrimaryButton";
import PrimaryButton from "../../atoms/PrimaryButton";
import CustomTextField from "../../atoms/CustomTextField";
import { useState } from "react";
import { OrderType } from "../../../pages/client/ClientOrders";
import { cancelFoodDelivery, changeFoodDeliveryDate } from "../../../api/clientFoodDelivery";
import { useAuth } from "../../../providers/useAuth";
import PaymentStep from "../PaymentStep";
type FormType = {
    dateTime: Dayjs;
};
type ClientOrdersActionsProps = {
    order: OrderType;
    fetchOrders: () => Promise<void>;
}
const ClientOrdersActions = ({ order, fetchOrders }: ClientOrdersActionsProps) => {
    const { user } = useAuth();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

    const initialForm: FormType = {
        dateTime: dayjs().add(1, 'day'),
    };
    const [form, setForm] = useState<FormType>(initialForm);

    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = () => { setOpenEditModal(true); }
    const handleCloseEditModal = () => { setOpenEditModal(false); }

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDeleteModal = () => { setOpenDeleteModal(true); }
    const handleCloseDeleteModal = () => { setOpenDeleteModal(false); }

    const [openPayModal, setOpenPayModal] = useState(false);
    const handleOpenPayModal = () => { setOpenPayModal(true); }
    const handleClosePayModal = () => { setOpenPayModal(false); }

    const [isPaid, setIsPaid] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState<string>();

    const onChangeDateTime = (value: Dayjs | null) => {
        if (value) {
            setForm({ ...form, dateTime: value });
        }
    };
    const isFormValid = () => {
        if (form.dateTime.isValid()) {
            return form.dateTime.toISOString().substring(14, 16) === "00";
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
            await changeFoodDeliveryDate(
                order.id,
                form.dateTime.toISOString(),
                user!.jwt
            );
            await fetchOrders();
        } catch (error) {
        } finally {
            handleCloseEditModal();
        }
    };

    const cancelOrder = async () => {
        await cancelFoodDelivery(order.id, user!.jwt);
        await fetchOrders();
    }

    const submitPayment = async () => {
        if (isPaid)
            await fetchOrders();
    }
    return (<TableCell sx={isDesktop ? styles.tableCell : styles.mobileTableActionsCell}>
        <Box>
            {order.attributes.delivery_date !== null && (
                <StartButton
                    sx={isDesktop ? { mr: 2 } : {}}
                    variant="contained"
                    onClick={handleOpenPayModal}
                >
                    Pagar
                </StartButton>)}



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

        <Modal open={openEditModal}
            onClose={handleCloseEditModal}>
            <Box sx={styles.editModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Reagendar Encomenda
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                    Submeta a data e hora desejada.
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={styles.formField}>
                        <DesktopDatePicker
                            disablePast={true}
                            minDate={dayjs().add(1, 'day')}
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
                                    {...params}
                                />
                            )}
                            minutesStep={60}
                            minTime={dayjs("Fri, 25 Jan 2019 05:00:00 GMT")}
                            maxTime={dayjs("Fri, 26 Jan 2019 23:00:00 GMT")}
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


        <Modal open={openDeleteModal}
            onClose={handleCloseDeleteModal}>
            <Box sx={styles.deleteModal}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Cancelar Encomenda
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Tem a certeza que pretende cancelar esta encomenda?
                </Typography>

                <Box sx={styles.deleteModalFooter}>
                    <PrimaryButton
                        sx={{ mr: 2 }}
                        variant="contained"
                        onClick={cancelOrder}
                    >
                        Sim
                    </PrimaryButton>
                    <CancelButton
                        variant="contained"
                        onClick={handleCloseDeleteModal}
                    >
                        Não
                    </CancelButton>
                </Box>
            </Box>
        </Modal>


        <Modal open={openPayModal}
            onClose={handleClosePayModal}>
            <Box sx={styles.payModel}>
                <PaymentStep
                    onPaymentDone={(isPaid: boolean) => {
                        setIsPaid(isPaid);
                        submitPayment();
                        handleClosePayModal();
                    }}
                    setSelectedPaymentMethod={() => { }}
                    price={order.attributes.price}
                    delivery={order}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                />
            </Box>
        </Modal>


    </TableCell>
    );

}
export default ClientOrdersActions;
