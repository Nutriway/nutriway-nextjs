import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { styles } from "./styles";

const MealTypeButton = (props: ButtonProps) => {
  return <Button {...props} sx={styles.mealTypeButton} />;
};

export default MealTypeButton;
