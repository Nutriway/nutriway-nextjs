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
import { getAppointmentsRequest } from "../../../api/appointment";
import { styles } from "./styles";
import NutritionistAppointment from "../NutritionistAppointment";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";
import RequestAppointmentRow from "../../molecules/RequestAppointmentRow";

const AppointmentsWithoutNutritionist = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentType[]>();
  const [activeAppointment, setActiveAppointment] = useState<AppointmentType>();

  const fetchAvailability = useCallback(async () => {
    if (user) {
      const response = await getAppointmentsRequest(user.jwt);

      setAppointments(response.data);
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
          {!activeAppointment ? (
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
                      <RequestAppointmentRow
                        key={`app-${appointment.id}`}
                        appointment={appointment}
                        setActiveAppointment={() => {
                          setActiveAppointment(appointment);
                        }}
                        fetchAppointments={fetchAvailability}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Box>
              <NutritionistAppointment appointment={activeAppointment} />
            </Box>
          )}
        </Box>
      ) : (
        <Typography sx={styles.noAppointmentsLabel} variant="h6">
          Não existem consultas agendadas
        </Typography>
      )}
    </Box>
  );
};

export default AppointmentsWithoutNutritionist;
