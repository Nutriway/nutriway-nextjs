'use client';
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styles } from './styles';

const PrimaryButton = (props: ButtonProps) => {
    //@ts-ignore
    return <Button {...props} sx={[styles.submitbutton, props.sx]} />;
};

export default PrimaryButton;
