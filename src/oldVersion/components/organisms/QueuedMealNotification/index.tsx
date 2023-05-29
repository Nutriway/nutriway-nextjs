import { Box, Typography } from "@mui/material";
import React from "react";
import NoBackgroundButton from "../../atoms/NoBackgroundButton";
import QueuedRecipeCard from "../../molecules/QueuedRecipeCard";
import { QueuedMeal } from "../NutritionistCreateDietPlanDay";
import { styles } from "./styles";

type QueuedMealNotificationProps = {
  queuedMeal: QueuedMeal;
  onCancelQueuedMeal(): void;
};

function QueuedMealNotification({
  queuedMeal,
  onCancelQueuedMeal,
}: QueuedMealNotificationProps) {
  return (
    <Box>
      <Box sx={styles.queuedMealContainer}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={styles.warningsWrapper}>
            <Typography variant="subtitle2" sx={{ mr: 2, textAlign: "left" }}>
              Deve colocar no plano <br /> as seguintes doses:
            </Typography>
            <Typography variant="caption" sx={{ mr: 3, textAlign: "left" }}>
              (ou eliminar as ocorrências)
            </Typography>
            <NoBackgroundButton
              sx={{ width: "fit-content" }}
              onClick={onCancelQueuedMeal}
            >
              ignorar
            </NoBackgroundButton>
          </Box>
          <QueuedRecipeCard recipe={queuedMeal.meal} />
          <Typography variant="h6" sx={{ ml: 3 }}>
            x
          </Typography>
          <Typography variant="h5" sx={{ ml: 1 }}>
            {queuedMeal.unusedServings}/{queuedMeal.total}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default QueuedMealNotification;
