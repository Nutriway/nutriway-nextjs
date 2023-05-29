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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getClientPaidAppointments } from "../../../api/appointment";
import { styles } from "./styles";
import AppointmentRow from "../../molecules/AppointmentRow";
import { toast } from "react-toastify";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";

const ClientAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentType[]>();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const fetchAvailability = useCallback(async () => {
    if (user) {
      try {
        const response = await getClientPaidAppointments(user.id, user!.jwt);
        const orderedAppointments = response.sort((a: any, b: any) => {
          return a?.attributes?.nutritionist_availability?.data?.attributes
            ?.date <
            b?.attributes?.nutritionist_availability?.data?.attributes?.date
            ? -1
            : a?.attributes?.nutritionist_availability?.data?.attributes?.date >
              b?.attributes?.nutritionist_availability?.data?.attributes?.date
            ? 1
            : 0;
        });

        setAppointments(orderedAppointments);
      } catch (error) {
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
    <Box>
      {appointments.length > 0 ? (
        <Box>
          <Box sx={styles.pageWrapper}>
            <TableContainer component={Paper}>
              <Table
                sx={isDesktop ? { minWidth: 650 } : { minWidth: 325 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {isDesktop ? (
                      <>
                        <TableCell sx={styles.tableCell}>
                          Nutricionista
                        </TableCell>
                        <TableCell sx={styles.tableCell}>Data</TableCell>
                        <TableCell sx={styles.tableCell}>Hora</TableCell>
                      </>
                    ) : (
                      <TableCell sx={styles.tableCell}>Data/Hora</TableCell>
                    )}
                    <TableCell sx={styles.tableCell}>Opções</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment: AppointmentType) => (
                    <AppointmentRow
                      key={appointment.id}
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

export default ClientAppointments;
