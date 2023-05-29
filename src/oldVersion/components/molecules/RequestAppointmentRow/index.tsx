import {
  Box,
  Modal,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { createAppointmentAvailability } from "../../../api/appointment";
import { useAuth } from "../../../providers/useAuth";
import { styles } from "./styles";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";
import CancelButton from "../../atoms/CancelButton";
import StartButton from "../../atoms/StartButton";

type RequestAppointmentRowProps = {
  appointment: AppointmentType;
  fetchAppointments: () => Promise<void>;
  setActiveAppointment?: (appointment: AppointmentType) => void;
};

const RequestAppointmentRow = ({
  appointment,
  fetchAppointments,
}: RequestAppointmentRowProps) => {
  const { user } = useAuth();

  const [openEditModal, setOpenEditModal] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const handleOpenConfirmModal = () => setOpenEditModal(true);
  const handleCloseConfirmModal = () => setOpenEditModal(false);

  const date = appointment.attributes?.date;

  const onSubmit = async () => {
    try {
      await createAppointmentAvailability(appointment, user!.jwt);
      await fetchAppointments();
    } catch (error) {
    } finally {
      handleCloseConfirmModal();
    }
  };

  return (
    <TableRow sx={styles.tableRow}>
      {isDesktop ? (
        <>
          <TableCell sx={styles.tableCell}>
            {appointment.attributes?.client.data.attributes.username}
          </TableCell>
          <TableCell sx={styles.tableCell}>
            {dayjs(date).format("DD/MM/YYYY")}
          </TableCell>
          <TableCell sx={styles.tableCell}>
            {dayjs(date).format("HH:00")}
          </TableCell>
        </>
      ) : (
        <TableCell sx={isDesktop ? styles.tableCell : styles.mobileTableCell}>
          {dayjs(date).format("DD/MM/YYYY")}-{dayjs(date).format("HH:00")}
        </TableCell>
      )}

      <TableCell
        sx={isDesktop ? styles.tableCell : styles.mobileTableActionsCell}
      >
        <StartButton
          sx={{ mr: 2 }}
          variant="contained"
          onClick={() => {
            handleOpenConfirmModal();
          }}
        >
          aceitar
        </StartButton>
      </TableCell>

      <Modal
        open={openEditModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.editModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deseja confirmar que tem disponibilidade para{" "}
            {dayjs(date).format("DD/MM/YYYY")}-{dayjs(date).format("HH:00")}
            (Atenção, para esta consulta se confirmar, o cliente terá que pagar
            a mesma após tê-la aceite)
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <StartButton variant="contained" onClick={onSubmit}>
              Confirmar
            </StartButton>

            <CancelButton
              onClick={handleCloseConfirmModal}
              sx={{ color: "#FFFFFF" }}
            >
              Cancelar
            </CancelButton>
          </Box>
        </Box>
      </Modal>
    </TableRow>
  );
};

export default RequestAppointmentRow;
