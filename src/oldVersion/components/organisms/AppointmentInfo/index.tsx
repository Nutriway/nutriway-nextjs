import { Box, Typography } from "@mui/material";
import React from "react";
import { AppointmentType } from "../../../pages/nutritionist/NutritionistAppointments";
import { styles } from "./styles";

type AppointmentInfoProps = {
  appointment?: AppointmentType;
};

function AppointmentInfo({ appointment }: AppointmentInfoProps) {
  return (
    <Box sx={styles.pageWrapper}>
      {appointment && (
        <Box sx={styles.wrapper}>
          <Box sx={styles.infoColumn}>
            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              {appointment?.attributes?.nutritionist_availability?.data?.attributes?.date?.substring(
                0,
                10
              )}
            </Typography>

            <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
              {appointment?.attributes?.client?.data?.attributes?.username}
            </Typography>

            <Typography variant="subtitle1" component="h2">
              {appointment?.attributes?.client?.data?.attributes?.email}
            </Typography>
          </Box>
          <Box sx={styles.infoColumn}>
            <Typography variant="subtitle1" component="h2">
              {appointment?.attributes?.medical_condition}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {
                appointment?.attributes?.appointment_result?.data?.attributes
                  ?.notes
              }
            </Typography>
          </Box>
          <Box sx={styles.infoColumn}>
            <Typography variant="subtitle1" component="h2">
              {
                appointment?.attributes?.appointment_result?.data?.attributes
                  ?.planDurationDays
              }
            </Typography>
            <Typography variant="subtitle1" component="h2">
              {
                appointment?.attributes?.appointment_result?.data?.attributes
                  ?.planType
              }
            </Typography>
            <Typography variant="subtitle1" component="h2">
              GOAL
            </Typography>
          </Box>
          {/*  {Object.keys(
            appointment?.attributes?.appointment_result?.data?.attributes
              ?.nutrients
          ).map((meal: string, index: number) => (
            <NutrientsHistory
              nutrients={
                appointment?.attributes?.appointment_result?.data?.attributes
                  ?.nutrients[meal]
              }
              key={index}
              mealType={meal}
            />
          ))} */}
        </Box>
      )}
    </Box>
  );
}

export default AppointmentInfo;
