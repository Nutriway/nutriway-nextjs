import { Box, Typography } from "@mui/material";
import React from "react";
import { styles } from "./styles";
import { getMealType } from "../../../util/appointments";

type NutrientsHistoryProps = {
  nutrients: any;
  mealType: string;
};
const NutrientsHistory = ({ nutrients, mealType }: NutrientsHistoryProps) => {
  return (
    <Box
      sx={{
        display: "inline",
      }}
    >
      {nutrients && (
        <Box>
          {getMealType(mealType)}
          <Box sx={styles.nutrientHistoryWrapper}>
            {Object.keys(nutrients).map((nutrient: any, index: number) => (
              <Box key={index} sx={styles.nutrient}>
                <Typography variant="subtitle1">{nutrient}</Typography>
                <Typography variant="subtitle1">
                  {`${nutrients[nutrient].min} - ${nutrients[nutrient].max}`}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default NutrientsHistory;
