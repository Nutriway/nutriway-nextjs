import React from "react";
import { styled, Select, SelectProps } from "@mui/material";
import { pallete } from "../../../util/styles/pallete";

const CssSelect = styled(Select)({
  "& label.Mui-focused": {
    color: pallete.colors.primaryColor,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: pallete.colors.primaryColor,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: pallete.colors.primaryColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: pallete.colors.primaryColor,
    },
  },
});

const CustomSelect = (props: SelectProps) => <CssSelect {...props} />;
export default CustomSelect;
