import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { AvailabilityType } from "../../../pages/client/ClientScheduleAppointment";
import { styles } from "./styles";

const ChooseNutritionistStep = ({ slot, setSelectedAvailability }: any) => {
  const [availability, setAvailability] = useState<AvailabilityType>();

  const handleSelection = (
    event: React.MouseEvent<HTMLElement>,
    availability: AvailabilityType
  ) => {
    setAvailability(availability);
  };

  useEffect(() => {
    setSelectedAvailability(availability);
  }, [setSelectedAvailability, availability]);

  return (
    <Box>
      <Box>
        <Typography variant="h6" component="h2" sx={{ mt: 0 }}>
          Escolha de Nutricionista
        </Typography>
        <Typography sx={{ mt: 1, mb: 1 }}>
          Escolha o profissional de saúde pelo qual pretende ser acompanhado.
        </Typography>
      </Box>

      <Box sx={styles.availabilityCardsWrapper}>
        <ToggleButtonGroup
          value={availability}
          exclusive
          onChange={handleSelection}
          aria-label="availability"
        >
          {slot.availabilities.map(
            (availability: AvailabilityType, index: number) => (
              <ToggleButton
                sx={styles.availabilityCard}
                value={availability}
                key={index}
              >
                <AvailabilityCard
                  key={availability.id}
                  availability={availability}
                />
              </ToggleButton>
            )
          )}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

const AvailabilityCard = ({ availability }: any) => {
  return (
    <Box>
      <Typography variant="subtitle1" sx={styles.nutritionistUsername}>
        {availability.attributes.nutritionist.data.attributes.username}
      </Typography>
      <Typography>
        {dayjs(availability.attributes.date).format("DD/MM/YYYY HH:00")}
      </Typography>
    </Box>
  );
};

export default ChooseNutritionistStep;
