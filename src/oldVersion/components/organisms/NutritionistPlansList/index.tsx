'use client';
import React from 'react';
import { Box } from '@mui/material';
import { styles } from './styles';
import PrimaryButton from '../../atoms/PrimaryButton';
import AddIcon from '@mui/icons-material/Add';
/* import NavigationBar from '../NavigationBar'; */
import PlansList from '../PlansList';
import { ClockLoader } from 'react-spinners';
import { AppointmentResult } from '../../../util/appointments';
import { useRouter } from 'next/navigation';

import { User } from '@/types/User';
import { useFetcher } from '@/lib/fetchers/clientFetcher';
import { NutritionistDietPlan } from '@/types/NutritionistDietPlan';
import { StrapiResponse } from '@/types/StrapiResponse';

const NutritionistPlansList = () => {
    const { push } = useRouter();
    const { data: user } = useFetcher<User>({
        url: '/users/me',
    });

    const { data: nutritionistDietPlan } = useFetcher<StrapiResponse<NutritionistDietPlan>>({
        url: `/nutritionist-diet-plans?populate=*&pagination[pageSize]=10000&filters[nutritionist][id][$eq]=${user?.id}`,
        shouldFetch: !!user,
    });

    const { data: appointmentResultsWithDietPlan } = useFetcher<StrapiResponse<AppointmentResult>>({
        url: `/appointment-results?populate=*&pagination[pageSize]=10000`,
        shouldFetch: !!user,
    });

    return (
        <Box>
            <Box sx={styles.pageWrapper}>
                <Box sx={styles.buttonWrapper}>
                    <PrimaryButton
                        sx={{ mb: 3 }}
                        onClick={() => push('/nutritionistCreateDietPlanPage')}
                        endIcon={<AddIcon />}
                    >
                        novo plano
                    </PrimaryButton>
                </Box>
                <Box sx={styles.listWrapper}>
                    {nutritionistDietPlan?.data?.length ? (
                        <PlansList
                            onDelete={(deletedId: number) => {
                                nutritionistDietPlan?.data.filter((plan) => plan.id !== deletedId);
                            }}
                            plans={nutritionistDietPlan && nutritionistDietPlan}
                            appointmentPlans={appointmentResultsWithDietPlan?.data?.map(
                                (ap) => ap?.attributes?.nutritionist_diet_plan?.data?.id,
                            )}
                            plansAreDeletable={true}
                            plansAreEditable={true}
                        />
                    ) : (
                        <ClockLoader
                            color="rgb(83, 168, 50)"
                            size={90}
                            cssOverride={{
                                position: 'absolute',
                                top: '0',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                margin: 'auto',
                            }}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default NutritionistPlansList;
