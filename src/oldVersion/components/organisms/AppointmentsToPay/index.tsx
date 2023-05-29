import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../providers/useAuth";
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  getAppointmentPrice,
  getClientAppointments,
  getClientTentativeAppointmentsByDate,
} from "../../../api/appointment";
import { styles } from "./styles";
import AppointmentRow from "../../molecules/AppointmentRow";
import PaymentStep from "../../molecules/PaymentStep";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";

type AppointmentsToPayProps = {
  onTabChange: (method: string) => void;
};

const AppointmentsToPay = ({ onTabChange }: AppointmentsToPayProps) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentType[]>();
  const [activeAppointment, setActiveAppointment] = useState<AppointmentType>();
  const [price, setPrice] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<string>();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  //needed when multiple payment methods available
  //const [paymentMethod, setPaymentMethod] = useState<String>();

  const fetchAvailability = useCallback(async () => {
    if (user) {
      const clientAppointments = await getClientAppointments(
        user!.id,
        user!.jwt
      );

      const clientTentativeAppointments =
        await getClientTentativeAppointmentsByDate(user!.id, user!.jwt);

      const response = clientAppointments.concat(clientTentativeAppointments);

      let orderedAppointments;
      if (response) {
        orderedAppointments = response
          .filter(
            (e: AppointmentType) =>
              e?.attributes?.appointment_payment?.data?.attributes?.status !==
              "completed"
          )
          .sort((a: any, b: any) => {
            if (a?.attributes?.nutritionist_availability?.data) {
              return a?.attributes?.nutritionist_availability?.data?.attributes
                ?.date <
                b?.attributes?.nutritionist_availability?.data?.attributes?.date
                ? -1
                : a?.attributes?.nutritionist_availability?.data?.attributes
                    ?.date >
                  b?.attributes?.nutritionist_availability?.data?.attributes
                    ?.date
                ? 1
                : 0;
            } else {
              return a?.attributes?.date < b?.attributes?.date
                ? -1
                : a?.attributes?.date > b?.attributes?.date
                ? 1
                : 0;
            }
          });
      }
      orderedAppointments
        ? setAppointments(orderedAppointments)
        : setAppointments(response);
    }
  }, [user]);

  useEffect(() => {
    fetchAvailability();
  }, [fetchAvailability]);

  const handlePrice = useCallback(async () => {
    if (user) {
      const newPrice = await getAppointmentPrice(user!.jwt);

      setPrice(newPrice);
    }
  }, [user]);

  useEffect(() => {
    handlePrice();
  }, [handlePrice]);

  const handleActiveAppointment = (appointment: AppointmentType) => {
    setActiveAppointment(appointment);
    handleOpenPaymentModal();
  };

  const handleClosePaymentModal = () => setOpenPaymentModal(false);
  const handleOpenPaymentModal = () => setOpenPaymentModal(true);

  if (!appointments) {
    return <> </>;
  }

  return (
    <Box>
      <Box>
        {appointments && appointments.length > 0 ? (
          <Box>
            <Box sx={styles.pageWrapper}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={styles.tableCell}>Nutricionista</TableCell>
                      <TableCell sx={styles.tableCell}>Data</TableCell>
                      <TableCell sx={styles.tableCell}>Hora</TableCell>
                      <TableCell sx={styles.tableCell}>Opções</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map((appointment: AppointmentType) => (
                      <AppointmentRow
                        key={appointment.id}
                        appointment={appointment}
                        setActiveAppointment={handleActiveAppointment}
                        fetchAppointments={fetchAvailability}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography
                sx={styles.expirationLabel}
                variant="body1"
                component="h2"
              >
                * As consultas devem ser pagas num período máximo de 24 horas.
              </Typography>
            </Box>

            <Box>
              <Modal
                open={openPaymentModal}
                onClose={() => {
                  handleClosePaymentModal();
                  setPaymentMethod(undefined);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styles.modal}>
                  <PaymentStep
                    onPaymentDone={() => onTabChange("1")}
                    appointmentId={activeAppointment?.id}
                    setSelectedPaymentMethod={() => {}}
                    price={price}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                  />
                </Box>
              </Modal>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography sx={styles.noAppointmentsLabel} variant="h6">
              Não existem consultas por pagar
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AppointmentsToPay;
