import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styles } from "./styles";
import NavigationBar from "../NavigationBar";
import { useAuth } from "../../../providers/useAuth";
import dayjs, { Dayjs } from "dayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createAppointmentByNutritionist,
  CreateAppointmentType,
} from "../../../api/appointment";
import { getUserByEmail } from "../../../api/user";
import PrimaryButton from "../../atoms/PrimaryButton";
import CustomTextField from "../../atoms/CustomTextField";

export type AppointmentFormType = {
  nutritionist: { id: number };
  client: { email: string };
  date: string;
  meetingUrl: string;
  medicalCondition: string;
  goal: string;
};

type ValidForm = {
  email: boolean;
  time: boolean;
};

function NewAppointmentForm() {
  const { user } = useAuth();

  const [appointment, setAppointment] = useState<AppointmentFormType>({
    date: `${dayjs()}`,
    client: { email: "" },
    nutritionist: { id: 1 },
    meetingUrl: "",
    medicalCondition: "",
    goal: "",
  });

  const [validForm, setValidForm] = useState<ValidForm>({
    email: false,
    time: false,
  });

  const setUserEmailOnAppointment = useCallback(() => {
    if (user) {
      setAppointment({
        date: `${dayjs()}`,
        client: { email: "" },
        nutritionist: { id: 1 },
        meetingUrl: "",
        medicalCondition: "",
        goal: "",
      });
    }
  }, [user]);

  useEffect(() => {
    setUserEmailOnAppointment();
  }, [setUserEmailOnAppointment]);

  const validateEmail = (email: string) => {
    if (email !== "") {
      setValidForm({ ...validForm, email: true });
    } else {
      setValidForm({ ...validForm, email: false });
    }
  };

  const validateTime = (time: string) => {
    if (dayjs(time).isValid()) {
      if (dayjs(time).toISOString().substring(14, 16) === "00") {
        setValidForm({ ...validForm, time: true });
      }
    } else {
      setValidForm({ ...validForm, time: false });
    }
  };

  const isFormValid = () => {
    return validForm.email && validForm.time;
  };

  const onChangeEmail = (e: any) => {
    const { value } = e.target;
    setAppointment({ ...appointment, client: { email: value } });
    validateEmail(value);
  };

  const onChangeMedicalConditions = (e: any) => {
    const { value } = e.target;
    setAppointment({ ...appointment, medicalCondition: value });
  };

  const onChangeAppointmentGoal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAppointment({ ...appointment, goal: value });
  };

  const onSubmit = async (e: any) => {
    e?.preventDefault();

    const client = await getUserByEmail(appointment.client.email, user!.jwt);

    if (client) {
      const appointmentObject: CreateAppointmentType = {
        nutritionist: { id: user!.id },
        client: { id: client.id },
        date: dayjs(appointment.date).format("YYYY-MM-DDTHH:mm") + ":00.000",
        medicalCondition: appointment.medicalCondition,
        jwt: user!.jwt,
        goal: appointment.goal,
      };

      createAppointmentByNutritionist(appointmentObject);
    } else {
      toast.error("Email de cliente não encontrado");
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setAppointment({ ...appointment, date: `${newValue}` });
    validateTime(`${newValue}`);
  };

  return (
    <Box>
      <NavigationBar />
      <Box sx={styles.pageWrapper}>
        <Box sx={styles.formWrapper}>
          <Typography sx={styles.formTitle} variant="h5">
            Agendar consulta
          </Typography>
          <Box sx={styles.inputs}>
            <Box sx={styles.leftColumn}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={5}>
                  <DesktopDatePicker
                    disablePast={true}
                    label="Data"
                    inputFormat="DD/MM/YYYY"
                    value={appointment.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <CustomTextField {...params} />}
                  />
                  <TimePicker
                    label="Hora"
                    value={appointment.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <CustomTextField {...params} />}
                    minutesStep={60}
                    minTime={dayjs("Fri, 25 Jan 2019 05:00:00 GMT")}
                    maxTime={dayjs("Fri, 26 Jan 2019 23:00:00 GMT")}
                  />
                </Stack>
              </LocalizationProvider>
            </Box>
            <Box sx={styles.rightColumn}>
              <CustomTextField
                onChange={onChangeEmail}
                label="Email do cliente"
                placeholder="Email do cliente"
                variant="outlined"
                name="email"
                required
              ></CustomTextField>

              <CustomTextField
                onChange={onChangeMedicalConditions}
                label="Condições médicas"
                placeholder="Condições médicas"
                variant="outlined"
                name="medical"
                required
              ></CustomTextField>
            </Box>
          </Box>

          <CustomTextField
            id="outlined-multiline-static"
            label="Objetivo da consulta"
            value={appointment.goal}
            onChange={onChangeAppointmentGoal}
            variant="outlined"
            rows={2}
            multiline
            sx={{ mb: 3, mt: 3 }}
          />

          <PrimaryButton
            disabled={!isFormValid()}
            sx={styles.submitButton}
            onClick={onSubmit}
          >
            Agendar
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
}

export default NewAppointmentForm;
