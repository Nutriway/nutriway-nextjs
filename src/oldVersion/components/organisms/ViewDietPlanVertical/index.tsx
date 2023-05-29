import { Box } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { DietPlan } from "../../../util/dietPlans";
import ViewDietPlanDayVertical from "../ViewDietPlanDayVertical";

type ViewDietPlanVerticalProps = {
  dietPlan: DietPlan;
};

function ViewDietPlanVertical({ dietPlan }: ViewDietPlanVerticalProps) {
  const weekDays = [
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
    "domingo",
  ];

  return (
    <Box>
      <Box sx={styles.pageWrapper}>
        <Box sx={styles.columns}>
          {weekDays.map((weekDay: string) => (
            <ViewDietPlanDayVertical
              key={"column" + weekDay}
              dietPlan={dietPlan?.attributes}
              weekDay={weekDay}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ViewDietPlanVertical;
