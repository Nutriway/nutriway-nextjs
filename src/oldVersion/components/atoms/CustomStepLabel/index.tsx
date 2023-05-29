import React from "react";
import { StepLabel, StepLabelProps, styled } from "@mui/material";
import { pallete } from "../../../util/styles/pallete";

const CssStepLabel = styled(StepLabel)({
  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
    color: pallete.colors.primaryColor,
  },

  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
    color: pallete.colors.primaryColor,
  },

  "& .css-1qz7ubc-MuiStepLabel-root .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active":
    {
      color: pallete.colors.primaryColor,
    },

  "& .css-1qz7ubc-MuiStepLabel-root .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
    {
      color: pallete.colors.primaryColor,
    },

  "& .css-4ff9q7.Mui-active": {
    color: pallete.colors.primaryColor,
  },

  "& .css-4ff9q7.Mui-completed": {
    color: pallete.colors.primaryColor,
  },
});

const CustomStepLabel = (props: StepLabelProps) => <CssStepLabel {...props} />;
export default CustomStepLabel;
