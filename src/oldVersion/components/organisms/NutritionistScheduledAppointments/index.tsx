import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../providers/useAuth";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getNutritionistAppointments } from "../../../api/appointment";
import { styles } from "./styles";
import AppointmentRow from "../../molecules/AppointmentRow";
import { toast } from "react-toastify";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";

const NutritionistScheduledAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentType[]>();

  const fetchAvailability = useCallback(async () => {
    if (user) {
      try {
        const response = await getNutritionistAppointments(user!.id, user!.jwt);
        const orderedAppointments = response.sort((a: any, b: any) => {
          return a.attributes.nutritionist_availability.data.attributes.date <
            b.attributes.nutritionist_availability.data.attributes.date
            ? -1
            : a.attributes.nutritionist_availability.data.attributes.date >
              b.attributes.nutritionist_availability.data.attributes.date
            ? 1
            : 0;
        });

        setAppointments(orderedAppointments);
      } catch {
        toast.error("Erro ao carregar consultas");
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAvailability();
    }
  }, [fetchAvailability, user]);

  if (!appointments) {
    return <> </>;
  }

  return (
    <Box sx={styles.pageWrapper}>
      {appointments.length > 0 ? (
        <Box>
          <Box sx={styles.tableWrapper}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={styles.tableCell}>Cliente</TableCell>
                    <TableCell sx={styles.tableCell}>Data</TableCell>
                    <TableCell sx={styles.tableCell}>Hora</TableCell>
                    <TableCell sx={styles.tableCell}>Opções</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment: AppointmentType) => (
                    <AppointmentRow
                      key={`app-${appointment.id}`}
                      appointment={appointment}
                      fetchAppointments={fetchAvailability}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <Typography sx={styles.noAppointmentsLabel} variant="h6">
          Não existem consultas agendadas
        </Typography>
      )}
    </Box>
  );
};

export default NutritionistScheduledAppointments;
