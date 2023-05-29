import React from "react";
import { useState } from "react";
import { Box, FormControlLabel, RadioGroup, Typography } from "@mui/material";
import { styles } from "./styles";
import "react-toastify/dist/ReactToastify.css";
import {
  createAppointmentByNutritionist,
  CreateAppointmentType,
} from "../../../api/appointment";

import {
  LocalizationProvider,
  DesktopDatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { AppointmentFormType } from "../NewAppointmentForm";
import { useAuth } from "../../../providers/useAuth";
import CustomTextField from "../../atoms/CustomTextField";
import CustomRadio from "../../atoms/CustomRadio";
import PrimaryButton from "../../atoms/PrimaryButton";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";
import NoBackgroundButton from "../../atoms/NoBackgroundButton";

type AppointmentLastStepProps = {
  appointment: AppointmentType;
  handlePlanDurationDays(duration: string): void;
  handlePlanType(planType: string): void;
  onSubmitPlan(e: any): Promise<void>;
};

function NutritionistAppointmentLastStep({
  appointment,
  handlePlanDurationDays,
  handlePlanType,
  onSubmitPlan,
}: AppointmentLastStepProps) {
  const { user } = useAuth();

  const [newAppointment, setNewAppointment] = useState<AppointmentFormType>({
    date: `${dayjs().set("minute", 0)}`,
    client: { email: appointment.attributes.client.data.attributes.email },
    nutritionist: { id: user!.id },
    meetingUrl: "",
    medicalCondition: "",
    goal: "",
  });
  const [planType, setPlanType] = useState("nutritionistIngredients");
  const [planDurationDays, setPlanDurationDays] = useState("4");
  const [isScheduling, setIsScheduling] = useState(false);

  const onChangePlanDurationDays = (e: any) => {
    const { value } = e.target;
    setPlanDurationDays(value);
    handlePlanDurationDays(value);
  };

  const onChangePlanType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanType((event.target as HTMLInputElement).value);
    handlePlanType((event.target as HTMLInputElement).value);
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setNewAppointment({ ...newAppointment, date: `${newValue}` });
  };

  const ScheduleNewAppointment = () => {
    const [paymentMessage, setPaymentMessage] = useState(false);
    const [medicalCondition, setMedicalCondition] = useState("");
    const [appointmentGoal, setAppointmentGoal] = useState("");

    const handleMedicalInputChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = e.target;
      setMedicalCondition(value);
    };

    const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setAppointmentGoal(value);
    };

    const scheduleAppointment = async () => {
      try {
        const appointmentObject: CreateAppointmentType = {
          nutritionist: { id: user!.id },
          client: { id: appointment.attributes.client.data.id },
          date:
            dayjs(newAppointment.date).format("YYYY-MM-DDTHH:mm") + ":00.000",
          medicalCondition: medicalCondition,
          jwt: user!.jwt,
          goal: appointmentGoal,
        };

        const response = await createAppointmentByNutritionist(
          appointmentObject
        );

        if (response) {
          setPaymentMessage(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const validateTime = (time: string): boolean => {
      if (dayjs(time).isValid()) {
        if (dayjs(time).toISOString().substring(14, 16) === "00") {
          return true;
        }
      }
      return false;
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={styles.newAppointmentWrapper}>
          <Box>
            <DesktopDatePicker
              disablePast={true}
              label="Data"
              inputFormat="DD/MM/YYYY"
              value={newAppointment.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <CustomTextField sx={{ flex: 2, mr: 3, mb: 4 }} {...params} />
              )}
            />
            <TimePicker
              label="Hora"
              value={newAppointment.date}
              onChange={handleDateChange}
              renderInput={(params) => (
                <CustomTextField sx={{ flex: 1, mb: 4 }} {...params} />
              )}
              minutesStep={60}
              minTime={dayjs("Fri, 25 Jan 2019 05:00:00 GMT")}
              maxTime={dayjs("Fri, 26 Jan 2019 23:00:00 GMT")}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomTextField
              id="outlined-multiline-static"
              label="Objetivo"
              value={appointmentGoal}
              onChange={handleGoalInputChange}
              variant="outlined"
              rows={2}
              multiline
              sx={{ mr: 3, flex: 1 }}
            />

            <CustomTextField
              id="outlined-multiline-static"
              label="Condições / Restrições"
              value={medicalCondition}
              onChange={handleMedicalInputChange}
              variant="outlined"
              rows={2}
              multiline
              sx={{ mr: 3, flex: 1 }}
            />

            <Box>
              <PrimaryButton
                disabled={!validateTime(newAppointment.date)}
                onClick={scheduleAppointment}
              >
                Agendar
              </PrimaryButton>

              <NoBackgroundButton
                disabled={false}
                onClick={() => {
                  setIsScheduling(false);
                }}
                sx={styles.newAppointmentButton}
              >
                Cancelar
              </NoBackgroundButton>
            </Box>
          </Box>
        </Box>

        {paymentMessage && (
          <Typography sx={{ mt: 1 }}>
            Aguarda por pagamento nas consultas do cliente.
          </Typography>
        )}
      </LocalizationProvider>
    );
  };

  return (
    <Box>
      <Box sx={styles.pageWrapper}>
        <Box sx={styles.finalFormWrapper}>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={planType}
            onChange={onChangePlanType}
          >
            <FormControlLabel
              value="nutritionistIngredients"
              control={<CustomRadio />}
              label="Plano alimentar"
            />
            <FormControlLabel
              value="nutritionistDeliverIngredients"
              control={<CustomRadio />}
              label="Plano alimentar - entrega ao domicílio."
              disabled
            />

            {/*  <FormControlLabel
              value="2"
              control={<Radio />}
              label="Pretende adquirir as receitas para selecionar - entrega ao domicílio."
              disabled
            /> */}

            {/*  <FormControlLabel
              value="4"
              control={<Radio />}
              label="Pretende adquirir as receitas para selecionar."
              disabled
            /> */}
            {/*  <FormControlLabel
              value="5"
              control={<Radio />}
              label="Pretende adquirir apenas a lista de compras dos produtos que constituem as receitas."
            /> */}
          </RadioGroup>
          <Box sx={styles.planDurationWrapper}>
            <CustomTextField
              onChange={onChangePlanDurationDays}
              label="Duração do plano (semanas)"
              placeholder="Duração do Plano"
              variant="outlined"
              name="duration"
              type="number"
              value={`${planDurationDays}`}
              required
            />

            <PrimaryButton
              disabled={false}
              onClick={onSubmitPlan}
              sx={styles.newAppointmentButton}
            >
              Submeter duração
            </PrimaryButton>
          </Box>
        </Box>
        {!isScheduling && (
          <PrimaryButton
            disabled={false}
            onClick={() => {
              setIsScheduling(true);
            }}
            sx={styles.newAppointmentButton}
          >
            Agendar nova consulta
          </PrimaryButton>
        )}
        {isScheduling && <ScheduleNewAppointment />}
      </Box>
    </Box>
  );
}

export default NutritionistAppointmentLastStep;
