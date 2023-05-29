import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../providers/useAuth";
import { Box } from "@mui/material";
import { getAppointmentById } from "../../../api/appointment";
import { styles } from "./styles";
import { AppointmentType } from "../NutritionistAppointments";
import { useSearchParams } from "react-router-dom";
import NavigationBar from "../../../components/organisms/NavigationBar";
import NutritionistAppointment from "../../../components/organisms/NutritionistAppointment";

const NutritionistAppointmentPage = () => {
  const { user } = useAuth();
  const [searchparams] = useSearchParams();
  const [appointment, setAppointment] = useState<AppointmentType>();

  const fetchData = useCallback(async () => {
    const id = searchparams.get("appointment");
    if (id !== null) {
      const { data } = await getAppointmentById(id, user!.jwt);
      if (data) {
        setAppointment(data[0]);
      }
    }
  }, [searchparams, user]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  return (
    <Box sx={styles.pageWrapper}>
      <NavigationBar />

      {appointment && <NutritionistAppointment appointment={appointment} />}
    </Box>
  );
};

export default NutritionistAppointmentPage;
