import React from "react";
import { Radio, RadioProps, styled } from "@mui/material";
import { pallete } from "../../../util/styles/pallete";

const CssRadio = styled(Radio)({
  "&.Mui-checked": {
    color: pallete.colors.primaryColor,
  },
});

const CustomRadio = (props: RadioProps) => <CssRadio {...props} />;
export default CustomRadio;
