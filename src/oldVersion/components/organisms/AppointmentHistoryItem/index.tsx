import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { AppointmentType } from '../../../pages/nutritionist/NutritionistAppointments';
import { useAuth } from '../../../providers/useAuth';
import PrimaryButton from '../../atoms/PrimaryButton';
import { styles } from './styles';
import AddIcon from '@mui/icons-material/Add';

import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { DietPlan, isPlanFinished } from '../../../util/dietPlans';
import AppointmentInfo from '../AppointmentInfo';
import PlanSelector from '../PlanSelector';
import {
    getAppointmentByAppointmentResultId,
    getAppointmentById,
    updateAppointmentResultDietPlan,
} from '../../../api/appointment';
import NavigationBar from '../NavigationBar';
import DietPlanInfo from '../DietPlanInfo';
import { createDietPlan } from '../../../api/dietPlan';

function AppointmentHistoryItem() {
    const { push } = useRouter();
    const { user } = useAuth();
    const [searchparams] = useSearchParams();
    const [appointment, setAppointment] = useState<AppointmentType>();

    const fetchData = useCallback(async () => {
        const id = searchparams.get('appointment');
        if (id !== null) {
            const { data } = await getAppointmentById(id, user!.jwt);
            if (data) {
                setAppointment(data[0]);
            }
        }
    }, [searchparams, user]);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user, fetchData]);

    const navigateToCreatePlan = () => {
        if (appointment) {
            push({
                pathname: '/createDietPlan',
                search: createSearchParams({
                    appointment: appointment.id.toString(),
                }).toString(),
            });
        }
    };

    const getButtonText = () => {
        let text = 'criar novo plano';

        if (
            isPlanFinished(
                appointment?.attributes?.appointment_result?.data?.attributes?.nutritionist_diet_plan?.data?.attributes,
            )
        ) {
            return 'editar plano';
        }

        if (
            appointment?.attributes?.appointment_result?.data?.attributes?.nutritionist_diet_plan?.data?.attributes
                ?.plan
        ) {
            return 'concluir plano';
        }

        return text;
    };

    const selectPlan = async (dietPlan: DietPlan) => {
        if (appointment) {
            const { data } = await createDietPlan(
                dietPlan.attributes.plan,
                dietPlan.attributes.name,
                dietPlan.attributes.goal,
                dietPlan.attributes.observations,
                user!.id,
                user!.jwt,
            );

            const appResult = await updateAppointmentResultDietPlan(
                appointment?.attributes?.appointment_result?.data?.id,
                data.id,
                user!.jwt,
            );

            const app = await getAppointmentByAppointmentResultId(appResult.data.id, user!.jwt);

            setAppointment(app[0]);
        }
    };

    return (
        <Box>
            <NavigationBar />
            <Box sx={styles.pageWrapper}>
                <AppointmentInfo appointment={appointment} />
                {isPlanFinished(
                    appointment?.attributes?.appointment_result?.data?.attributes?.nutritionist_diet_plan?.data
                        ?.attributes,
                ) && (
                    <Box sx={{ width: '100%' }}>
                        <DietPlanInfo appointment={appointment} />
                    </Box>
                )}
                <Box sx={styles.planOptionsWrapper}>
                    <PrimaryButton
                        onClick={() => navigateToCreatePlan()}
                        endIcon={<AddIcon />}
                        sx={styles.optionButton}
                    >
                        {getButtonText()}
                    </PrimaryButton>
                    <PlanSelector
                        selectedPlanId={
                            appointment?.attributes?.appointment_result?.data?.attributes?.nutritionist_diet_plan?.data
                                ?.id
                        }
                        onPlanSelection={selectPlan}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default AppointmentHistoryItem;
