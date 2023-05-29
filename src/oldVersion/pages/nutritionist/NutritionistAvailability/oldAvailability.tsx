import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const NutritionistAvailability = () => {
  const [weekDaysAvailability, setWeekDaysAvailability] = useState<any>({});

  useEffect(() => {
    dayjs.extend(weekday);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    setWeekDaysAvailability({
      monday: {
        checked: true,
        availableHours: {
          morning: {
            from: dayjs().weekday(7).tz("Europe/London"),
            to: dayjs().weekday(7).toDate(),
          },
          afternoon: {
            from: dayjs().weekday(7).toDate(),
            to: dayjs().weekday(7).toDate(),
          },
          evening: {
            from: dayjs().weekday(7).toDate(),
            to: dayjs().weekday(7).toDate(),
          },
        },
      },
      tuesday: {
        checked: false,
        availableHours: {
          morning: {
            from: dayjs().weekday(8).toDate(),
            to: dayjs().weekday(8).toDate(),
          },
          afternoon: {
            from: dayjs().weekday(8).toDate(),
            to: dayjs().weekday(8).toDate(),
          },
          evening: {
            from: dayjs().weekday(8).toDate(),
            to: dayjs().weekday(8).toDate(),
          },
        },
      },
      wednesday: {
        checked: false,
        availableHours: {
          morning: {
            from: dayjs().weekday(9).toDate(),
            to: dayjs().weekday(9).toDate(),
          },
          afternoon: {
            from: dayjs().weekday(9).toDate(),
            to: dayjs().weekday(9).toDate(),
          },
          evening: {
            from: dayjs().weekday(9).toDate(),
            to: dayjs().weekday(9).toDate(),
          },
        },
      },
      thursday: {
        checked: false,
        availableHours: {
          morning: {
            from: dayjs().weekday(10).toDate(),
            to: dayjs().weekday(10).toDate(),
          },
          afternoon: {
            from: dayjs().weekday(10).toDate(),
            to: dayjs().weekday(10).toDate(),
          },
          evening: {
            from: dayjs().weekday(10).toDate(),
            to: dayjs().weekday(10).toDate(),
          },
        },
      },
      friday: {
        checked: false,
        availableHours: {
          morning: {
            from: dayjs().weekday(11).toDate(),
            to: dayjs().weekday(11).toDate(),
          },
          afternoon: {
            from: dayjs().weekday(11).toDate(),
            to: dayjs().weekday(11).toDate(),
          },
          evening: {
            from: dayjs().weekday(11).toDate(),
            to: dayjs().weekday(11).toDate(),
          },
        },
      },
      saturday: {
        checked: false,
        availableHours: {
          morning: {
            from: dayjs().weekday(12).toDate(),
            to: dayjs().weekday(12).toDate(),
          },
          afternoon: {
            from: dayjs().weekday(12).toDate(),
            to: dayjs().weekday(12).toDate(),
          },
          evening: {
            from: dayjs().weekday(12).toDate(),
            to: dayjs().weekday(12).toDate(),
          },
        },
      },
      sunday: {
        checked: false,
        availableHours: {
          morning: {
            from: dayjs().weekday(13).toDate(),
            to: dayjs().weekday(13).toDate(),
          },
          afternoon: {
            from: dayjs().weekday(13).toDate(),
            to: dayjs().weekday(13).toDate(),
          },
          evening: {
            from: dayjs().weekday(13).toDate(),
            to: dayjs().weekday(13).toDate(),
          },
        },
      },
    });
  }, []);

  const handleChangeWeekDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setWeekDaysAvailability({
      ...weekDaysAvailability,
      [name]: { ...weekDaysAvailability[name], checked },
    });
  };

  const handleChangeAvailableHours = (
    newValue: any,
    weekDay: string,
    partOfTheDay: string,
    fromOrTo: string
  ) => {
    setWeekDaysAvailability({
      ...weekDaysAvailability,
      [weekDay]: {
        ...weekDaysAvailability[weekDay],
        availableHours: {
          ...weekDaysAvailability[weekDay].availableHours,
          [partOfTheDay]: {
            ...weekDaysAvailability[weekDay].availableHours.partOfTheDay,
            [fromOrTo]: newValue,
          },
        },
      },
    });
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "> div": {
              margin: "8px",
              border: "1px solid black",
              paddingTop: "8px",
              paddingBottom: "8px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              "> p": { flex: 1 },
            }}
          >
            <Typography></Typography>
            <Typography>Morning</Typography>
            <Typography>Afternoon</Typography>
            <Typography>Evening</Typography>
          </Box>
          {Object.entries(weekDaysAvailability).map(([key, value]: any) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                flexDirection: "row",
                "> *": { flex: 1 },
              }}
            >
              <FormControlLabel
                label={key}
                control={
                  <Checkbox
                    checked={value.checked}
                    onChange={handleChangeWeekDay}
                    name={key}
                  />
                }
              />
              {value.checked &&
                Object.entries(value.availableHours).map((values: any) => (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      "> *": { marginTop: "4px" },
                    }}
                  >
                    <TimePicker
                      label="Time"
                      value={values[1].from}
                      onChange={(newValue: any) =>
                        handleChangeAvailableHours(
                          newValue,
                          key,
                          values[0],
                          "from"
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                      label="Time"
                      value={values[1].to}
                      onChange={(newValue: any) =>
                        handleChangeAvailableHours(
                          newValue,
                          key,
                          values[0],
                          "to"
                        )
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                ))}
            </Box>
          ))}
        </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default NutritionistAvailability;
