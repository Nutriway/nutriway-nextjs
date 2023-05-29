'use client';
import React from 'react';
import { styled, Pagination, PaginationProps } from '@mui/material';
import { pallete } from '../../../util/styles/pallete';

const CssPagination = styled(Pagination)({
    '& .MuiButtonBase-root': {
        backgroundColor: 'white',
    },

    '& .css-kvsszq-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
        backgroundColor: pallete.colors.primaryColor,
        color: 'white',
        borderColor: pallete.colors.primaryColor,

        '&:hover': {
            backgroundColor: pallete.colors.primaryColor,
        },
    },
});

const CustomPagination = (props: PaginationProps) => <CssPagination {...props} />;
export default CustomPagination;
