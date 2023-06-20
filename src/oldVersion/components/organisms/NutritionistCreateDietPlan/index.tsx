'use client';
import { Box } from '@mui/material';
import React, { useState, memo, useCallback, useEffect } from 'react';
import { AppointmentType } from '../../../pages/nutritionist/NutritionistAppointments';
import { useAuth } from '../../../providers/useAuth';
import { styles } from './styles';
import CustomTextField from '../../atoms/CustomTextField';
import { createDietPlan, updateNutritionistDietPlan } from '../../../api/dietPlan';
import { createAppointmentResult, updateAppointmentResultDietPlan } from '../../../api/appointment';

import { DietPlan, getRandomImageUrl, isPlanFinished, PlanDay } from '../../../util/dietPlans';
import { toast } from 'react-toastify';
import PrimaryButton from '../../atoms/PrimaryButton';
import NutritionistCreateDietPlanDay, { QueuedMeal } from '../NutritionistCreateDietPlanDay';
import { Recipe } from '../../../util/recipes';
import QueuedMealNotification from '../QueuedMealNotification';
import { useRouter } from 'next/navigation';
import { clientFetcher, useFetcher } from '@/lib/fetchers/clientFetcher';
import { User } from '@/types/User';

type NutritionistCreateDietPlanProps = {
    appointment?: AppointmentType;
    dietPlan: DietPlan;
    onDietPlanChange(dietPlan: DietPlan): void;
    recipes: Recipe[] | undefined;
    onDietPlanFinish?(name: string, goal: string, observations: string): void;
};

function NutritionistCreateDietPlan({
    appointment,
    dietPlan,
    onDietPlanChange,
    recipes,
    onDietPlanFinish,
}: NutritionistCreateDietPlanProps) {
    const { data: user } = useFetcher<User>({
        url: '/users/me',
    });
    const { push } = useRouter();

    const [mainCourses, setMainCourses] = useState(0);
    const [name, setName] = useState(dietPlan.attributes.name);
    const [goal, setGoal] = useState(dietPlan.attributes.goal);
    const [observations, setObservations] = useState(dietPlan.attributes.observations);

    const [queuedMeal, setQueuedMeal] = useState<QueuedMeal | undefined>();
    const weekDays = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'];

    useEffect(() => {
        if (dietPlan.attributes.name && dietPlan.attributes.goal) {
            setName(dietPlan.attributes.name);
            setGoal(dietPlan.attributes.goal);
            setObservations(dietPlan.attributes.observations);
        }
    }, [dietPlan.attributes.name, dietPlan.attributes.goal, dietPlan.attributes.observations]);

    const finishPlan = async () => {
        if (name && goal) {
            if (onDietPlanFinish) onDietPlanFinish(name, goal, observations);

            await clientFetcher({
                url: `/nutritionist-diet-plans/${dietPlan?.id}`,
                method: 'put',
                body: {
                    data: {
                        name,
                        goal,
                        observations,
                        plan: { ...dietPlan.attributes.plan },
                    },
                },
            });

            toast.success('Plano completo');
        }

        if (!name) {
            toast.error('Nomeie o plano');
        }
        if (!goal) {
            toast.error('Defina um objetivo para o plano');
        }
    };

    const submitPlanDay = useCallback(
        async (newPlanDay: PlanDay) => {
            if (dietPlan.id > -1) {
                const planId = dietPlan.id;

                onDietPlanChange({
                    ...dietPlan,
                    attributes: {
                        ...dietPlan.attributes,
                        plan: { ...dietPlan.attributes.plan, ...newPlanDay },
                    },
                });

                await clientFetcher({
                    url: `/nutritionist-diet-plans/${planId}`,
                    method: 'put',
                    body: {
                        data: {
                            name: dietPlan.attributes.name,
                            goal: dietPlan.attributes.goal,
                            observations: dietPlan.attributes.observations,
                            plan: { ...dietPlan.attributes.plan, ...newPlanDay },
                        },
                    },
                });
            } else {
                const { data } = await clientFetcher<any>({
                    url: '/nutritionist-diet-plans',
                    method: 'post',
                    body: {
                        data: {
                            imageUrl: getRandomImageUrl(),
                            name: name,
                            goal: goal,
                            observations: observations,
                            plan: newPlanDay,
                            nutritionist: { id: user.id },
                        },
                    },
                });

                onDietPlanChange(data);
                /*    if (appointment) {
                    if (appointment.attributes.appointment_result?.data) {
                        await clientFetcher({
                            url: `appointment-results/${appointment?.attributes?.appointment_result?.data?.id}`,
                            method: 'put',
                        });
                        await updateAppointmentResultDietPlan(
                            appointment?.attributes?.appointment_result?.data?.id,
                            data.id,
                            user!.jwt,
                        );
                    } else {
                        await createAppointmentResult(appointment.id, data.id, user!.jwt);
                    }
                } */
            }
        },
        [dietPlan, goal, name, observations, onDietPlanChange, user.id],
    );

    const handleQueuedMeal = useCallback((mealToQueue: QueuedMeal) => {
        setQueuedMeal(mealToQueue);
    }, []);

    const handleMainCoursesChange = useCallback(
        (value: number) => {
            setMainCourses(mainCourses + value);
        },
        [mainCourses],
    );

    return (
        <Box>
            <Box sx={styles.pageWrapper}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CustomTextField
                        sx={{ mt: 3, mb: 4, width: '350px' }}
                        onChange={(e) => setObservations(e.target.value)}
                        label="Observações"
                        placeholder="Observações"
                        variant="outlined"
                        name="observations"
                        multiline
                        minRows={2}
                        value={observations}
                    />

                    <CustomTextField
                        sx={{
                            mt: 3,
                            mb: 4,
                            ml: 3,
                            mr: 3,
                            width: 'fit-content',
                            alignSelf: 'start',
                        }}
                        onChange={(e) => setName(e.target.value)}
                        label="Nome do plano"
                        placeholder="Nome do plano"
                        variant="outlined"
                        name="name"
                        value={name}
                    />

                    <CustomTextField
                        sx={{
                            mt: 3,
                            mb: 4,
                            width: 'fit-content',
                            alignSelf: 'start',
                        }}
                        onChange={(e) => setGoal(e.target.value)}
                        label="Objetivo"
                        placeholder="objetivo do plano"
                        variant="outlined"
                        name="goal"
                        value={goal}
                    />

                    {queuedMeal && (
                        <QueuedMealNotification
                            queuedMeal={queuedMeal}
                            onCancelQueuedMeal={() => setQueuedMeal(undefined)}
                        />
                    )}
                </Box>
                <Box sx={styles.columns}>
                    {weekDays.map((weekDay: string) => (
                        <NutritionistCreateDietPlanDay
                            key={'column' + weekDay}
                            changeMainCourses={handleMainCoursesChange}
                            mainCourses={mainCourses}
                            dietPlan={dietPlan?.attributes}
                            weekDay={weekDay}
                            onDaySubmission={submitPlanDay}
                            queuedMeal={queuedMeal}
                            queueMeal={handleQueuedMeal}
                            recipes={recipes}
                        />
                    ))}
                </Box>
                <PrimaryButton
                    disabled={!isPlanFinished({ ...dietPlan?.attributes, name, goal })}
                    onClick={finishPlan}
                    sx={styles.finishButton}
                >
                    Finalizar plano
                </PrimaryButton>
            </Box>
        </Box>
    );
}

export default memo(NutritionistCreateDietPlan);
