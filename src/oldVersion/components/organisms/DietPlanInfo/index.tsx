'use client';
import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styles } from './styles';
import ViewDietPlanHorizontal from '../ViewDietPlanHorizontal';
import { DietPlan } from '../../../util/dietPlans';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewDietPlanVertical from '../ViewDietPlanVertical';
import CustomTextField from '../../atoms/CustomTextField';

type DietPlanInfoProps = {
    dietPlan?: DietPlan;
};

const DietPlanInfo = ({ dietPlan }: DietPlanInfoProps) => {
    const [display, setDisplay] = React.useState('horizontal');

    const handleChange = (event: React.MouseEvent<HTMLElement>, newDisplay: string) => {
        setDisplay(newDisplay);
    };

    return (
        <Box>
            <Box sx={styles.pageWrapper}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                        }}
                    >
                        <CustomTextField
                            sx={{ width: '350px' }}
                            label="Observações"
                            placeholder="Observações"
                            variant="outlined"
                            name="observations"
                            multiline
                            minRows={2}
                            value={dietPlan?.attributes?.observations}
                            disabled
                        />

                        <CustomTextField
                            sx={{
                                ml: 3,
                                mr: 3,
                                width: 'fit-content',
                                alignSelf: 'start',
                            }}
                            label="Nome do plano"
                            placeholder="Nome do plano"
                            variant="outlined"
                            name="name"
                            value={dietPlan?.attributes?.name}
                            disabled
                        />

                        <CustomTextField
                            sx={{
                                mr: 3,
                                width: 'fit-content',
                                alignSelf: 'start',
                            }}
                            label="Objetivo"
                            placeholder="objetivo do plano"
                            variant="outlined"
                            name="goal"
                            value={dietPlan?.attributes?.goal}
                            disabled
                        />
                    </Box>
                </Box>
                <ToggleButtonGroup
                    sx={styles.toogleGroup}
                    value={display}
                    exclusive
                    onChange={handleChange}
                    aria-label="display"
                >
                    <ToggleButton value="horizontal">
                        <ViewModuleIcon />
                    </ToggleButton>
                    <ToggleButton value="vertical">
                        <ViewListIcon />
                    </ToggleButton>
                </ToggleButtonGroup>

                {dietPlan && (
                    <Box sx={styles.plansWrapper}>
                        {display === 'vertical' ? (
                            <ViewDietPlanVertical dietPlan={dietPlan} />
                        ) : (
                            <ViewDietPlanHorizontal dietPlan={dietPlan} />
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default DietPlanInfo;
