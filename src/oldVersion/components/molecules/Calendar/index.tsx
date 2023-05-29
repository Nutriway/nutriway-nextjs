import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { getAppointmentPrice } from "../../../api/appointment";
import { SlotType } from "../../../pages/client/ClientScheduleAppointment";
import { useAuth } from "../../../providers/useAuth";
import Slot from "../Slot";
import { styles } from "./styles";

type CalendarProps = {
  timeslots: SlotType[];
  startdate: Dayjs;
  fetchAvailabilities: () => Promise<void>;
};
const FIRST_APPOINTMENT_HOUR = 7;
const LAST_APPOINTMENT_HOUR = 22;
const Calendar = ({
  timeslots,
  startdate,
  fetchAvailabilities,
}: CalendarProps) => {
  const { user } = useAuth();
  const [price, setPrice] = useState<string>();

  const [calendar, setCalendar] = useState<String[]>([]);
  const [initialDate, setInitialDate] = useState<Dayjs>();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const totalDays = isDesktop ? 7 : 2;

  const handlePrice = useCallback(async () => {
    if (user) {
      const newPrice = await getAppointmentPrice(user!.jwt);

      setPrice(newPrice);
    }
  }, [user]);

  useEffect(() => {
    handlePrice();
  }, [handlePrice]);

  const initialSet = useCallback(() => {
    const calendarDays: string[] = [];
    for (let i = 0; i < totalDays; i++) {
      calendarDays.push(dayjs(startdate).add(i, "day").format("DD/MM/YYYY"));
    }

    setInitialDate(startdate);
    setCalendar(calendarDays);
  }, [startdate, totalDays]);

  useEffect(() => {
    if (timeslots) {
      initialSet();
    }
  }, [timeslots, initialSet]);

  const handleDateChange = (action: string) => {
    const newWeek: string[] = [];
    let newStartDate;

    if (action === "forward") {
      newStartDate = isDesktop
        ? initialDate?.add(1, "week")
        : initialDate?.add(2, "day");
      for (let i = 0; i < totalDays; i++) {
        newWeek.push(dayjs(newStartDate).add(i, "day").format("DD/MM/YYYY"));
      }
    } else {
      newStartDate = isDesktop
        ? initialDate?.subtract(1, "week")
        : initialDate?.subtract(2, "day");
      for (let i = 0; i < totalDays; i++) {
        newWeek.push(dayjs(newStartDate).add(i, "day").format("DD/MM/YYYY"));
      }
    }

    setInitialDate(newStartDate);
    setCalendar(newWeek);
  };

  function fillSlots(date: string) {
    let slotsToFill: SlotType[] = [];
    for (let i = FIRST_APPOINTMENT_HOUR; i <= LAST_APPOINTMENT_HOUR; i++) {
      let availableSlot = timeslots.find(
        (slot) =>
          (slot.date as Dayjs).format("DD/MM/YYYY") === date &&
          dayjs(slot.date).hour() === i
      );
      if (!availableSlot) {
        availableSlot = {
          date: dayjs(date, "DD/MM/YYYY").hour(i),
          availabilities: [],
          available: false,
        };
      }
      slotsToFill.push(availableSlot);
    }
    return slotsToFill;
  }

  function buildWeekDay(date: string) {
    const day = dayjs(date, "DD-MM-YYYY").toDate();
    let weekDay = day.toLocaleDateString("pt-pt", {
      weekday: "long",
    });

    weekDay = weekDay[0].toUpperCase() + weekDay.slice(1, weekDay.length);

    const tomorrow = dayjs().add(1, "day");
    if ((tomorrow as Dayjs).format("DD/MM/YYYY") === date) {
      return "Amanhã";
    }
    return weekDay;
  }

  const Column = ({ date }: any) => {
    const allSlots = fillSlots(date);
    return (
      <Box sx={styles.column}>
        <Typography sx={styles.columnHeaderWeekDay}>
          {buildWeekDay(date)}
        </Typography>
        <Typography sx={styles.columnHeaderDate}>{date}</Typography>

        {allSlots.map((slot: SlotType, index: number) => {
          if ((slot.date as Dayjs).format("DD/MM/YYYY") === date) {
            return (
              <Slot
                key={index}
                slot={slot}
                fetchCalendarAvailabilities={fetchAvailabilities}
                appointmentPrice={price || ""}
              />
            );
          }
          return null;
        })}
      </Box>
    );
  };

  let calendarMonth = new Date(
    initialDate?.toISOString() as string
  ).toLocaleDateString("pt-pt", {
    year: "numeric",
    month: "long",
  });

  calendarMonth =
    calendarMonth[0].toUpperCase() +
    calendarMonth.slice(1, calendarMonth.length);

  return (
    <Box sx={styles.pageWrapper}>
      {calendarMonth !== "Invalid Date" && (
        <Typography variant="h6">{calendarMonth}</Typography>
      )}

      <Box sx={styles.calendarWrapper}>
        <IconButton
          size="large"
          aria-label="weekBack"
          onClick={() => handleDateChange("backwards")}
          disabled={dayjs().diff(initialDate, "day") >= 0}
        >
          <ArrowBack fontSize="large" />
        </IconButton>

        <Box sx={{ display: "flex" }}>
          {calendar.map((column: String) => (
            <Column key={column} date={column} />
          ))}
        </Box>

        <IconButton
          size="large"
          aria-label="weekFront"
          onClick={() => handleDateChange("forward")}
        >
          <ArrowForward fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Calendar;
