import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { getNutritionistAvailabilitiesWithNoAppointment } from "../../../api/nutritionistAvailability";
import { useAuth } from "../../../providers/useAuth";
import dayjs, { Dayjs } from "dayjs";
import Calendar from "../../../components/molecules/Calendar";
import { styles } from "./styles";
import { getClientTentativeAppointmentsByDate } from "../../../api/appointment";

export type AvailabilityType = {
  id: number;
  attributes: {
    createdAt: string;
    date: string;
    nutritionist: NutritionistType;
    publishedAt: string;
    updatedAt: string;
  };
};

export type NutritionistType = {
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
    };
  };
};

export type SlotType = {
  availabilities: AvailabilityType[];
  date: string | Dayjs;
  available: boolean;
  tentative?: boolean;
};

const ClientScheduleAppointment = () => {
  const { user } = useAuth();
  const [timeslots, setTimeslots] = useState<SlotType[]>([]);

  const fetchAvailability = useCallback(async () => {
    const availabilities = await getNutritionistAvailabilitiesWithNoAppointment(
      user!.jwt
    );

    const tentatives = await getClientTentativeAppointmentsByDate(
      user!.id,
      user!.jwt
    );

    let slots: SlotType[] = [];
    availabilities
      .filter((e: any) => !e.attributes.appointment.data)
      .forEach((availability: AvailabilityType) => {
        const date = dayjs(availability.attributes.date).toISOString();
        const index = getElementIndex(slots, date);
        if (index !== -1) {
          slots[index].availabilities.push(availability);
        } else {
          slots.push({
            date: date,
            availabilities: [availability],
            available: true,
          });
        }
      });

    tentatives.forEach((availability: AvailabilityType) => {
      const date = dayjs(availability.attributes.date).toISOString();
      const index = getElementIndex(slots, date);
      if (index !== -1) {
        slots[index].availabilities.push(availability);
      } else {
        slots.push({
          date: date,
          availabilities: [availability],
          available: false,
          tentative: true,
        });
      }
    });

    const orderedSlots: SlotType[] = slots
      .map((e: SlotType) => {
        return {
          date: dayjs(e.date),
          availabilities: e.availabilities,
          available: e.available,
          tentative: e.tentative,
        };
      })
      .sort((a: any, b: any) => {
        return a.date - b.date;
      });

    setTimeslots(orderedSlots);
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchAvailability();
    }
  }, [fetchAvailability, user]);

  const getElementIndex = (list: SlotType[], date: string) => {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i].date === date) {
        index = i;
      }
    }
    return index;
  };

  return (
    <Box>
      <NavigationBar />

      <Box sx={styles.calendarWrapper}>
        <Typography variant="h5" sx={{ mt: 1, mb: 4 }}>
          Olá, {user?.username.split(" ")[0]}. Agende aqui a sua consulta.
        </Typography>

        <Box sx={{ display: "flex", mb: 3, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={styles.greenSquare}></Box>
            <Typography variant="subtitle1" sx={{ ml: 1, mr: 4 }}>
              Disponível
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={styles.graySquare}></Box>
            <Typography variant="subtitle1" sx={{ ml: 1, mr: 4 }}>
              Indisponível
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={styles.yellowSquare}></Box>
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Pedido solicitado
            </Typography>
          </Box>
        </Box>

        <Calendar
          timeslots={timeslots}
          startdate={dayjs().add(1, "day")}
          fetchAvailabilities={fetchAvailability}
        />
      </Box>
    </Box>
  );
};

export default ClientScheduleAppointment;
