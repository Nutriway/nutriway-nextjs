'use client';
import React from 'react';
import { styled, FormControlProps, FormControl } from '@mui/material';
import { pallete } from '../../../util/styles/pallete';

const CssFormControl = styled(FormControl)({
    '& label.Mui-focused': {
        color: pallete.colors.primaryColor,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: pallete.colors.primaryColor,
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: pallete.colors.primaryColor,
        },
        '&.Mui-focused fieldset': {
            borderColor: pallete.colors.primaryColor,
        },
    },
});

const CustomFormControl = (props: FormControlProps) => <CssFormControl {...props} />;
export default CustomFormControl;
