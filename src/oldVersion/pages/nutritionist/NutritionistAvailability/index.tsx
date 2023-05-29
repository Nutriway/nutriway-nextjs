import React, { useCallback, useEffect, useState } from "react";
//This lib is no longer mantained, or do a fork and play with her or do a custom calendar
//This it's a priority to version 2
//@ts-ignore
import ScheduleSelector from "react-schedule-selector";
import dayjs, { ManipulateType } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  createNutritionistAvailability,
  getNutritionistAvailability,
  deleteAvailability,
} from "../../../api/nutritionistAvailability";
import { useAuth } from "../../../providers/useAuth";
import { Box, IconButton, Typography } from "@mui/material";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { styles } from "./styles";
import { getAppointmentsWithAvailability } from "../../../api/appointment";
import ClockLoader from "react-spinners/ClockLoader";
import { toast } from "react-toastify";

type AppointmentType = {
  appointment: any;
  date: string;
};

const NutritionistAvailability = () => {
  const { user } = useAuth();
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(dayjs());
  const [appointmentsWithAvailability, setAppointmentsWithAvailability] =
    useState<AppointmentType[]>([]);

  const fetchAvailability = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getNutritionistAvailability(user!.id, user!.jwt);
      const availabilities = response.map(
        (availability: { attributes: { date: any } }): any =>
          availability.attributes.date
      );

      const appointments: AppointmentType[] =
        await getAppointmentsWithAvailability(response, user!.jwt);

      setCalendar(availabilities);
      setAppointmentsWithAvailability(appointments);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    if (user) {
      fetchAvailability();
    }
  }, [fetchAvailability, user]);

  const handlePost = async (newSchedule: any) => {
    try {
      setLoading(true);
      const newScheduleMapped = mapDates(newSchedule);
      const calendarMapped = mapDates(calendar);

      let newSlots: String[] = [];
      newScheduleMapped.forEach((slot: string) => {
        if (!calendarMapped.includes(slot)) {
          newSlots.push(slot);
        }
      });

      setCalendar(newSchedule);
      await Promise.all(
        newSlots.map(async (date: any) => {
          await createNutritionistAvailability(user, date, user!.jwt);
        })
      );
      await fetchAvailability();
    } catch (error) {
      toast.error("Error on update");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (newSchedule: any) => {
    try {
      setLoading(true);
      const newScheduleMapped = mapDates(newSchedule);
      const calendarMapped = mapDates(calendar);

      let missingSlots: String[] = [];
      calendarMapped.forEach((slot: string) => {
        if (!newScheduleMapped.includes(slot)) {
          missingSlots.push(slot);
        }
      });

      setCalendar(newSchedule);
      await Promise.all(
        missingSlots.map(
          async (date: any) => await deleteAvailability(date, user, user!.jwt)
        )
      );
      fetchAvailability();
    } catch (error) {
      toast.error("Error on delete");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (newSchedule: any) => {
    if (!loading) {
      if (newSchedule.length > calendar.length) {
        handlePost(newSchedule);
      } else if (newSchedule.length < calendar.length) {
        handleDelete(newSchedule);
      }
    }
  };

  const mapDates = (list: object[] | string[]) => {
    const mappedList = list.map((date: any) => {
      if (typeof date === "string") {
        return date;
      } else {
        return date.toISOString();
      }
    });

    return mappedList;
  };

  const handleDateChange = (
    action: string,
    amount: number,
    timeUnit: ManipulateType
  ) => {
    if (action === "forward") {
      setStartDate(startDate.add(amount, timeUnit));
    } else {
      setStartDate(startDate.subtract(amount, timeUnit));
    }
  };

  const renderTableCell = (datetime: Date, selected: boolean) => {
    if (selected) {
      let tagToRender = "selected";
      let appointment: AppointmentType = { appointment: undefined, date: "" };
      if (appointmentsWithAvailability) {
        appointmentsWithAvailability.forEach((e: AppointmentType) => {
          if (e.date === datetime.toISOString().substring(0, 16)) {
            tagToRender = "appointmentCell";
            appointment = e;
          }
        });
      }

      if (tagToRender === "appointmentCell") {
        return (
          <AppointmentTableCell>
            {appointment.appointment.attributes.client.data.attributes.username}
          </AppointmentTableCell>
        );
      } else {
        return <SelectedTableCell />;
      }
    } else {
      return <UnselectedTableCell />;
    }
  };

  const renderRowTitle = (date: Date) => {
    const today = new Date().toDateString();
    let formatedDate = `${new Intl.DateTimeFormat("en-Us", {
      weekday: "short",
    }).format(date)} ${date.getDate()}/${date.getMonth() + 1}`;
    if (date.toDateString() === today) {
      return <Box sx={styles.todaysRowTitle}>{formatedDate}</Box>;
    } else {
      return <Box sx={styles.rowTitle}>{formatedDate}</Box>;
    }
  };

  const UnselectedTableCell = () => {
    return <Box sx={styles.unselectedTableCell}></Box>;
  };

  const SelectedTableCell = () => {
    return <Box sx={styles.selectedTableCell}></Box>;
  };

  const AppointmentTableCell = ({ children }: any) => {
    return <Box sx={styles.AppointmentTableCell}>{children}</Box>;
  };

  return (
    <Box>
      <NavigationBar />
      <Box>
        <Box sx={styles.pageWrapper}>
          <IconButton
            aria-label="monthBack"
            onClick={() => handleDateChange("backwards", 1, "month")}
            disabled={dayjs().diff(startDate, "day") >= 0}
          >
            <ArrowBack />
          </IconButton>

          <Typography variant="h6">
            {startDate.format("MMMM ")}
            {startDate.year()}
          </Typography>

          <IconButton
            aria-label="monthFront"
            onClick={() => handleDateChange("forward", 1, "month")}
          >
            <ArrowForward />
          </IconButton>
        </Box>

        <Box sx={styles.dateHeader}>
          <IconButton
            size="large"
            aria-label="weekBack"
            onClick={() => handleDateChange("backwards", 1, "week")}
            disabled={dayjs().diff(startDate, "day") >= 0}
          >
            <ArrowBack fontSize="large" />
          </IconButton>
          <Box sx={styles.selectorWrapper}>
            {loading && (
              <ClockLoader
                color="rgb(83, 168, 50)"
                size={90}
                cssOverride={{
                  position: "absolute",
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  margin: "auto",
                }}
              />
            )}
            <ScheduleSelector
              selection={calendar}
              numDays={7}
              minTime={5}
              maxTime={24}
              hourlyChunks={1}
              onChange={handleChange}
              dateFormat="ddd DD/MM"
              timeFormat="HH:mm"
              startDate={startDate}
              renderDateCell={renderTableCell}
              renderDateLabel={renderRowTitle}
            />
          </Box>

          <IconButton
            size="large"
            aria-label="weekFront"
            onClick={() => handleDateChange("forward", 1, "week")}
          >
            <ArrowForward fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NutritionistAvailability;
