import { Box } from '@mui/material';
import React, { useState, memo, useCallback, useEffect } from 'react';
import { AppointmentType } from '../../../pages/nutritionist/NutritionistAppointments';
import { useAuth } from '../../../providers/useAuth';
import { styles } from './styles';
import { createSearchParams, useNavigate } from 'react-router-dom';
import CustomTextField from '../../atoms/CustomTextField';
import { createDietPlan, updateNutritionistDietPlan } from '../../../api/dietPlan';
import { createAppointmentResult, updateAppointmentResultDietPlan } from '../../../api/appointment';

import { DietPlan, isPlanFinished, PlanDay } from '../../../util/dietPlans';
import { toast } from 'react-toastify';
import PrimaryButton from '../../atoms/PrimaryButton';
import NutritionistCreateDietPlanDay, { QueuedMeal } from '../NutritionistCreateDietPlanDay';
import { Recipe } from '../../../util/recipes';
import QueuedMealNotification from '../QueuedMealNotification';

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
    const { push } = useRouter();
    const { user } = useAuth();
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

            await updateNutritionistDietPlan(
                dietPlan?.id,
                name,
                goal,
                observations,
                dietPlan?.attributes.plan,
                user!.jwt,
            );
            toast.success('Plano completo');

            if (
                appointment &&
                appointment.attributes?.appointment_result?.data?.attributes?.planType ===
                    'nutritionistDeliverIngredients'
            ) {
                push({
                    pathname: '/nutritionistChosePlanIngredients',
                    search: createSearchParams({
                        dietPlan: dietPlan?.id.toString(),
                    }).toString(),
                });
            }
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

                await updateNutritionistDietPlan(
                    planId,
                    dietPlan.attributes.name,
                    dietPlan.attributes.goal,
                    dietPlan.attributes.observations,
                    { ...dietPlan.attributes.plan, ...newPlanDay },
                    user!.jwt,
                );
            } else {
                const { data } = await createDietPlan(
                    newPlanDay,
                    dietPlan.attributes.name,
                    dietPlan.attributes.goal,
                    dietPlan.attributes.observations,
                    user!.id,
                    user!.jwt,
                );

                onDietPlanChange(data);
                if (appointment) {
                    if (appointment.attributes.appointment_result?.data) {
                        await updateAppointmentResultDietPlan(
                            appointment?.attributes?.appointment_result?.data?.id,
                            data.id,
                            user!.jwt,
                        );
                    } else {
                        await createAppointmentResult(appointment.id, data.id, user!.jwt);
                    }
                }
            }
        },
        [appointment, dietPlan, onDietPlanChange, user],
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
