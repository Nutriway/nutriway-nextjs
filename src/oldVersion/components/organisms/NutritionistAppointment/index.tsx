import React, { useCallback, useEffect, useState } from 'react';
import { Box, Collapse, List, Step, Stepper, Typography } from '@mui/material';
import { styles } from './styles';

import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import {
    createAppointmentResult,
    finishAppointment,
    getClientAppointmentsHistory,
    updateAppointmentPlanType,
    updateAppointmentResultDietPlan,
    updateMedicalCondition,
} from '../../../api/appointment';
import NutritionistAppointmentLastStep from '../NutritionistAppointmentLastStep';
import { useRouter } from 'next/navigation';
import CustomTextField from '../../atoms/CustomTextField';
import CustomStepLabel from '../../atoms/CustomStepLabel';
import PrimaryButton from '../../atoms/PrimaryButton';
import { useAuth } from '../../../providers/useAuth';
import { AppointmentType } from '../../../pages/nutritionist/NutritionistAppointments';
import NutrientsHistory from '../NutrientsHistory';
import { createFoodDelivery } from '../../../api/foodDelivery';
import NutritionistCreateDietPlan from '../NutritionistCreateDietPlan';
import { Recipe } from '../../../util/recipes';
import { getNutritionistRecipesByNutritionistId, getApiRecipes } from '../../../api/recipe';
import NoBackgroundButton from '../../atoms/NoBackgroundButton';
import { DietPlan, isPlanFinished } from '../../../util/dietPlans';
import PlanSelector from '../PlanSelector';
import { createDietPlan } from '../../../api/dietPlan';

type AppointmentProps = {
    appointment: AppointmentType;
    showOnlyInfo?: boolean;
};

function NutritionistAppointment({ appointment, showOnlyInfo }: AppointmentProps) {
    const { user } = useAuth();
    const { push } = useRouter();
    const [open, setOpen] = useState(false);
    const [appointmentNotes, setAppointmentNotes] = useState('');
    const [medicalCondition, setMedicalCondition] = useState('');
    const [expandedVideo, setExpandedVideo] = useState(false);
    const [planDurationDays, setPlanDurationDays] = useState('4');
    const [planType, setPlanType] = useState('nutritionistIngredients');
    const [recipes, setRecipes] = useState<Recipe[]>();

    const [appointmentDietPlan, setAppointmentDietPlan] = useState<DietPlan>(
        appointment?.attributes?.appointment_result?.data?.attributes?.nutritionist_diet_plan?.data ?? {
            id: -1,
            attributes: { goal: '', plan: {}, name: '' },
        },
    );

    const [appointmentHistory, setAppointmentHistory] = useState<AppointmentType[]>([]);

    const [isPlanTypeSubmitted, setIsPlanTypeSubmitted] = useState(false);

    const fetchData = useCallback(async () => {
        if (user) {
            try {
                const nutritionistRecipes = await getNutritionistRecipesByNutritionistId(
                    user!.id.toString(),
                    user!.jwt,
                );
                const apiRecipes = await getApiRecipes(user!.jwt);

                if (nutritionistRecipes && apiRecipes) {
                    setRecipes([...nutritionistRecipes.data, ...apiRecipes.data]);
                }
            } catch (error) {}
        }
    }, [user]);

    useEffect(() => {
        if (user && !showOnlyInfo) {
            fetchData();
        }
    }, [user, fetchData, showOnlyInfo]);

    const [activeStep, setActiveStep] = useState<number>(0);

    const handleClick = async () => {
        setOpen(!open);
    };

    const fetchAppointmentHistory = useCallback(async () => {
        if (appointment) {
            const response = await getClientAppointmentsHistory(appointment?.attributes.client.data.id, user!.jwt);

            const orderedResponse = response
                .sort((a: any, b: any) => {
                    return a.attributes.nutritionist_availability.data.attributes.date >
                        b.attributes.nutritionist_availability.data.attributes.date
                        ? -1
                        : a.attributes.nutritionist_availability.data.attributes.date <
                          b.attributes.nutritionist_availability.data.attributes.date
                        ? 1
                        : 0;
                })
                .slice(0, 3);

            setAppointmentHistory(orderedResponse);
        }
    }, [user, appointment]);

    useEffect(() => {
        if (appointment) {
            setMedicalCondition(appointment.attributes.medical_condition);
            fetchAppointmentHistory();
        }
    }, [fetchAppointmentHistory, appointment]);

    const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setAppointmentNotes(value);
    };

    const handleMedicalConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMedicalCondition(value);
    };

    const onSubmitPlan = async (e: any) => {
        e?.preventDefault();

        if (appointment) {
            try {
                await updateAppointmentPlanType(planType, planDurationDays, appointment.id, user!.jwt);
                setIsPlanTypeSubmitted(true);

                if (planType === 'nutritionistDeliverIngredients') {
                    await createFoodDelivery(user!.jwt, appointment.attributes.client);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onSubmit = async (e: any) => {
        e?.preventDefault();
        if (appointment) {
            try {
                await finishAppointment(
                    appointmentNotes ? appointmentNotes : 'sem notas adicionais',
                    appointment.id,
                    user!.jwt,
                );
                await updateMedicalCondition(medicalCondition, appointment.id, user!.jwt);

                push('/nutritionistHomePage');
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDietPlanChange = useCallback((dietPlan: DietPlan) => {
        setAppointmentDietPlan(dietPlan);
    }, []);

    const handleDietPlanFinish = useCallback(
        (dietPlanName: string, dietPlanGoal: string, observations: string) => {
            setActiveStep(1);
            appointmentDietPlan.attributes.name = dietPlanName;
            appointmentDietPlan.attributes.goal = dietPlanGoal;
            appointmentDietPlan.attributes.observations = observations;
        },
        [appointmentDietPlan.attributes],
    );

    const renderActivity = (activity: String) => {
        if (activity === 'low') return 'Pouco ou nenhum exercício';
        else if (activity === 'medium-low') return 'Exercício leve 1-3 vezes por semana';
        else if (activity === 'medium') return 'Exercício moderado 3 a 5 vezes por semana';
        else if (activity === 'medium-high') return 'Exercício pesado 5 a 6 vezes por semana';
        else return 'Exercício pesado diariamente ou até duas vezes por dia';
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

            setAppointmentDietPlan(data);

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
    };

    type AppointmentHistoryItemProps = {
        appointment: AppointmentType;
    };

    const AppointmentHistoryItem = ({ appointment }: AppointmentHistoryItemProps) => {
        const [open, setOpen] = useState(false);
        const handleClick = () => {
            setOpen(!open);
        };
        const nutrientTypes = ['breakfast', 'lunch', 'snack', 'dinner'];

        type AppointmentResultAtributtesType = {
            createdAt: string;
            notes: string;
            breakfastNutrients: any;
            lunchNutrients: any;
            snackNutrients: any;
            dinnerNutrients: any;
            publishedAt: string;
            updatedAt: string;
        };

        return (
            <Box sx={open ? styles.historyItemWrapperSelected : styles.historyItemWrapper} onClick={handleClick}>
                <Box>
                    <Typography variant="subtitle1">
                        {dayjs(appointment.attributes.nutritionist_availability.data.attributes.date).format(
                            'DD/MM/YYYY HH:00',
                        )}
                    </Typography>
                </Box>

                <Collapse sx={{ mt: 2 }} in={open} timeout="auto" unmountOnExit>
                    {nutrientTypes.map((nutrientType: string, index: number) => (
                        <NutrientsHistory
                            nutrients={
                                appointment.attributes.appointment_result.data.attributes[
                                    `${nutrientType}Nutrients` as keyof AppointmentResultAtributtesType
                                ]
                            }
                            key={`historyItem-${index}`}
                            mealType={nutrientType}
                        />
                    ))}
                    {/* {Object.keys(
            appointment.attributes.appointment_result.data.attributes.nutrients
          ).map((meal: string, index: number) => (
            <NutrientsHistory
              nutrients={
                appointment.attributes.appointment_result.data.attributes
                  .nutrients[meal]
              }
              key={`historyItem-${index}`}
              mealType={meal}
            />
          ))} */}
                    Notas:
                    {` ${appointment.attributes.appointment_result.data.attributes.notes}`}
                </Collapse>
            </Box>
        );
    };

    return (
        <Box sx={styles.pageWrapper}>
            <Box>
                <Box sx={styles.appointmentInfo}>
                    <Box sx={styles.clientInfo}>
                        <Typography variant="h5">
                            {`${appointment.attributes.client.data.attributes.username} `}
                        </Typography>
                        <Typography variant="subtitle1">
                            {`Objetivo: ${appointment.attributes.goal ?? 'Não definido'}`}
                        </Typography>
                        {appointment.attributes.client.data.attributes.metabolicRate && (
                            <Typography variant="subtitle1">
                                {`TMB: ${appointment.attributes.client.data.attributes.metabolicRate} `}
                            </Typography>
                        )}
                        {appointment.attributes.client.data.attributes.age && (
                            <Typography variant="subtitle1">
                                {`Idade: ${appointment.attributes.client.data.attributes.age} `}
                            </Typography>
                        )}
                        {appointment.attributes.client.data.attributes.height && (
                            <Typography variant="subtitle1">
                                {`Altura: ${appointment.attributes.client.data.attributes.height}cm `}
                            </Typography>
                        )}
                        {appointment.attributes.client.data.attributes.weight && (
                            <Typography variant="subtitle1">
                                {`Peso: ${appointment.attributes.client.data.attributes.weight}kg `}
                            </Typography>
                        )}
                        {appointment.attributes.client.data.attributes.activity && (
                            <Typography variant="subtitle1">
                                {`Atividade Física: ${renderActivity(
                                    appointment.attributes.client.data.attributes.activity,
                                )}`}
                            </Typography>
                        )}
                        <Typography variant="subtitle1" sx={styles.appointmentDate}>
                            {`Data: ${dayjs(
                                appointment.attributes.nutritionist_availability.data.attributes.date,
                            ).format('DD/MM/YYYY HH:mm')}`}
                        </Typography>

                        {!showOnlyInfo && (
                            <Typography variant="subtitle1">
                                <a
                                    href={appointment.attributes?.meeting_url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >{`aceder`}</a>
                            </Typography>
                        )}

                        {!showOnlyInfo && (
                            <PlanSelector selectedPlanId={appointmentDietPlan.id} onPlanSelection={selectPlan} />
                        )}
                    </Box>

                    <Box sx={styles.textFieldsRow}>
                        <CustomTextField
                            sx={styles.appointmentTextField}
                            id="outlined-multiline-static"
                            label="Condições médicas"
                            value={medicalCondition}
                            onChange={handleMedicalConditionChange}
                            variant="outlined"
                            multiline
                            minRows={3}
                            disabled={showOnlyInfo}
                        />
                        <CustomTextField
                            sx={styles.appointmentTextField}
                            id="outlined-multiline-static"
                            label="Notas"
                            value={appointmentNotes}
                            onChange={handleNotesChange}
                            variant="outlined"
                            multiline
                            minRows={3}
                            disabled={showOnlyInfo}
                        />
                    </Box>

                    {appointmentHistory.length > 0 && (
                        <Box sx={styles.appointmentHistoryWrapper}>
                            <PrimaryButton onClick={handleClick}>Histórico</PrimaryButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {appointmentHistory.map((appointment: AppointmentType) => (
                                        <AppointmentHistoryItem
                                            key={`appointment-${appointment.id}`}
                                            appointment={appointment}
                                        />
                                    ))}
                                </List>
                            </Collapse>
                        </Box>
                    )}
                    {!showOnlyInfo && (
                        <Box sx={!expandedVideo ? styles.videoWrapper : styles.expandedVideoWrapper}>
                            <iframe
                                allow="camera;microphone"
                                title="meeting"
                                height="100%"
                                width="100%"
                                src={appointment.attributes.meeting_url}
                            />

                            <NoBackgroundButton
                                sx={!expandedVideo ? styles.videoButton : styles.expandedVideoButton}
                                onClick={() => setExpandedVideo(!expandedVideo)}
                            >
                                {expandedVideo ? 'minimizar' : 'maximizar'}
                            </NoBackgroundButton>
                        </Box>
                    )}
                </Box>

                {!showOnlyInfo && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={styles.stepperWrapper}>
                            <Stepper nonLinear activeStep={activeStep}>
                                <Step completed={isPlanFinished(appointmentDietPlan?.attributes)}>
                                    <CustomStepLabel
                                        sx={{ cursor: 'pointer' }}
                                        color="inherit"
                                        onClick={() => setActiveStep(0)}
                                    >
                                        Plano
                                    </CustomStepLabel>
                                </Step>
                                <Step>
                                    <CustomStepLabel
                                        sx={{ cursor: 'pointer' }}
                                        color="inherit"
                                        onClick={() => {
                                            if (isPlanFinished(appointmentDietPlan?.attributes)) {
                                                setActiveStep(1);
                                            }
                                        }}
                                    >
                                        Finalizar
                                    </CustomStepLabel>
                                </Step>
                            </Stepper>
                        </Box>

                        {activeStep === 0 && (
                            <Box sx={{ width: '100%' }}>
                                <NutritionistCreateDietPlan
                                    appointment={appointment}
                                    dietPlan={appointmentDietPlan}
                                    onDietPlanChange={handleDietPlanChange}
                                    onDietPlanFinish={handleDietPlanFinish}
                                    recipes={recipes}
                                />
                            </Box>
                        )}

                        {activeStep === 1 && (
                            <Box sx={styles.finalStepWrapper}>
                                <NutritionistAppointmentLastStep
                                    appointment={appointment}
                                    handlePlanDurationDays={setPlanDurationDays}
                                    handlePlanType={setPlanType}
                                    onSubmitPlan={onSubmitPlan}
                                />
                                <PrimaryButton
                                    sx={styles.submitButton}
                                    onClick={onSubmit}
                                    disabled={!isPlanTypeSubmitted}
                                >
                                    {isPlanTypeSubmitted ? 'terminar consulta' : 'Submeta plano primeiro'}
                                </PrimaryButton>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default NutritionistAppointment;
