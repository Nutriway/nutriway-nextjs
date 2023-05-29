import React, { useState } from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { styles } from "./styles";

import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import NutritionistScheduledAppointments from "../../../components/organisms/NutritionistScheduledAppointments";
import NutritionistAppointmentsHistory from "../../../components/organisms/NutritionistAppointmentsHistory";
import { AvailabilityType } from "../../client/ClientScheduleAppointment";
import AppointmentsWithoutNutritionist from "../../../components/organisms/AppointmentsWithoutNutritionist";

export type AppointmentType = {
  id: number;
  attributes: {
    date?: string;
    appointment_result: AppointmentResultType;
    client: ClientType;
    createdAt: string;
    medical_condition: string;
    meeting_url: string;
    nutritionist_availability: { data: AvailabilityType };
    publishedAt: string;
    updatedAt: string;
    appointment_payment: AppointmentPaymentType;
    goal: "";
  };
};

export type ClientType = {
  data: {
    id: number;
    attributes: {
      blocked: boolean;
      confirmed: boolean;
      createdAt: string;
      email: string;
      provider: string;
      type: string;
      updatedAt: string;
      username: string;
      metabolicRate: string;
      age: number;
      gender: string;
      height: string;
      weight: string;
      activity: string;
    };
  };
};

export type AppointmentResultType = {
  data: {
    id: number;
    attributes: {
      nutrients: any;
      createdAt: string;
      notes: string;
      breakfastNutrients: any;
      lunchNutrients: any;
      snackNutrients: any;
      dinnerNutrients: any;
      nutritionist_diet_plan: any;
      publishedAt: string;
      updatedAt: string;
      planDurationDays: number;
      planType: string;
    };
  };
};

export type AppointmentPaymentType = {
  data: {
    id: number;
    attributes: {
      paymentId: string;
      value: string;
      coinCode: string;
      dateTime: string;
      description: string;
      createdAt: string;
      publishedAt: string;
      updatedAt: string;
      status: string;
    };
  };
};

const NutritionistAppointments = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <NavigationBar />
      <Box sx={styles.pageWrapper}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="tab">
              <Tab label="Consultas" value="1" />
              <Tab label="Histórico" value="2" />
              <Tab label="Consultas sem nutricionista" value="3" />
            </TabList>
          </Box>

          <Box sx={styles.tabsWrapper}>
            <TabPanel value="1">
              <NutritionistScheduledAppointments />
            </TabPanel>
            <TabPanel value="2">
              <NutritionistAppointmentsHistory />
            </TabPanel>
            <TabPanel value="3">
              <AppointmentsWithoutNutritionist />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default NutritionistAppointments;
