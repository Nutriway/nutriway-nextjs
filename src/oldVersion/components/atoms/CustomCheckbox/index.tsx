'use client';
import React from 'react';
import { Checkbox, CheckboxProps, styled } from '@mui/material';
import { pallete } from '../../../util/styles/pallete';

const CssCheckbox = styled(Checkbox)({
    '&.Mui-checked': {
        color: pallete.colors.primaryColor,
    },

    '&.MuiButtonBase-root': {
        padding: '8px 4px 8px 0',
    },
});

const CustomCheckbox = (props: CheckboxProps) => <CssCheckbox {...props} />;
export default CustomCheckbox;
