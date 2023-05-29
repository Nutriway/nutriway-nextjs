import React, { useState } from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { styles } from "./styles";

import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import ClientAppointments from "../../../components/organisms/ClientAppointments";
import AppointmentsToPay from "../../../components/organisms/AppointmentsToPay";
import ClientOrders from "../ClientOrders";

const ClientEvents = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  const changeTab = (newValue: string) => {
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
              <Tab label="Por pagar" value="2" />
              <Tab disabled label="Encomendas (brevemente)" value="3" />
            </TabList>
          </Box>

          <Box sx={styles.tabsWrapper}>
            <TabPanel value="1">
              <ClientAppointments />
            </TabPanel>
            <TabPanel value="2">
              <AppointmentsToPay onTabChange={changeTab} />
            </TabPanel>
            <TabPanel value="3">
              <ClientOrders />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ClientEvents;
