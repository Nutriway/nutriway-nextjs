'use client';
import React, { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { styles } from './styles';
import { Search } from '@mui/icons-material';
import CustomCheckbox from '../../atoms/CustomCheckbox';
import usePagination from '../../../util/pagination/pagination';
import CustomFormControl from '../../atoms/CustomOutlinedInput';
import CustomPagination from '../../atoms/CustomPagination';
import PlanCard from '../../molecules/PlanCard';
import { DietPlan, filterPlans, PlanSources } from '../../../util/dietPlans';
import { NutritionistDietPlan } from '@/types/NutritionistDietPlan';
import { StrapiResponse } from '@/types/StrapiResponse';

type PlansListProps = {
    plans: StrapiResponse<NutritionistDietPlan>;
    appointmentPlans: number[];

    selectedPlanId?: number;
    plansAreEditable: boolean;
    plansAreDeletable: boolean;
    onFetchPlanCards?(): Promise<void>;
    onPlanSelection?(dietPlan: DietPlan): void;
    onDelete?(dietPlanId: number): void;
};

function PlansList({
    plans,
    appointmentPlans,
    selectedPlanId,
    plansAreEditable,
    plansAreDeletable,
    onDelete,
    onPlanSelection,
}: PlansListProps) {
    const [planSources, setPlanSources] = useState<PlanSources>({
        genericPlans: false,
        appointmentPlans: false,
    });

    const [searchInput, setSearchInput] = useState('');

    let [page, setPage] = useState(1);
    const PER_PAGE = 15;

    const handlePageChange = (e: ChangeEvent<unknown>, p: number) => {
        setPage(p);
        _DATA.jump(p);
    };

    const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchInput(value);
    };

    const onPlanSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        const { name } = e.target;

        setPlanSources({ ...planSources, [name]: checked });
    };

    const filteredPlans = filterPlans(plans, planSources, appointmentPlans, searchInput);

    const count = Math.ceil(filteredPlans.length / PER_PAGE);
    const _DATA = usePagination(filteredPlans, PER_PAGE);

    return (
        <Box>
            {plans && (
                <Box>
                    <Box sx={styles.headerWrapper}>
                        <Box sx={styles.filtersWrapper}>
                            <Box sx={styles.checkboxesWrapper}>
                                Fonte
                                <Box sx={styles.checkboxes}>
                                    <Box sx={styles.checkbox}>
                                        <CustomCheckbox onChange={(e) => onPlanSourceChange(e)} name="genericPlans" />
                                        <Typography>Genéricos</Typography>
                                    </Box>
                                    <Box sx={styles.checkbox}>
                                        <CustomCheckbox
                                            onChange={(e) => onPlanSourceChange(e)}
                                            name="appointmentPlans"
                                        />
                                        <Typography>Consultas</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <CustomFormControl sx={{ width: '80%' }} variant="outlined">
                                <InputLabel htmlFor="searchPlan">Pesquisar</InputLabel>
                                <OutlinedInput
                                    id="searchPlan"
                                    type="text"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="search" edge="end">
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="search..."
                                    onChange={onChangeKeyword}
                                    value={searchInput}
                                />
                            </CustomFormControl>
                        </Box>

                        <CustomPagination
                            sx={styles.pagination}
                            count={count}
                            size="large"
                            page={page}
                            variant="outlined"
                            shape="rounded"
                            onChange={handlePageChange}
                        />

                        <Box />
                    </Box>

                    {plans && (
                        <Box>
                            <Box sx={styles.plansWrapper}>
                                {_DATA.currentData().map((dietPlan: DietPlan, index: number) => {
                                    return (
                                        <PlanCard
                                            key={index}
                                            selected={dietPlan.id === selectedPlanId}
                                            dietPlan={dietPlan}
                                            isEditable={plansAreEditable}
                                            isDeletable={plansAreDeletable}
                                            onSelection={onPlanSelection}
                                            onDelete={onDelete}
                                        />
                                    );
                                })}
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default PlansList;
