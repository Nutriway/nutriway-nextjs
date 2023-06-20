'use client';
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { getStyles, styles } from './styles';
import { deleteDietPlan } from '../../../api/dietPlan';

import { useAuth } from '../../../providers/useAuth';
import { DietPlan, isPlanFinished } from '../../../util/dietPlans';
import { useRouter } from 'next/navigation';
import { clientFetcher } from '@/lib/fetchers/clientFetcher';
import useSWRMutation from 'swr/mutation';

type PlanCardProps = {
    dietPlan: DietPlan;
    selected: boolean;
    isEditable: boolean;
    isDeletable: boolean;
    fetchNutritionistPlanCards?(): Promise<void>;
    onSelection?(dietPlan: DietPlan): void;
    onDelete?(dietPlanId: number): void;
};

const onDeletePlanCard = async (url: string, { arg: { dietPlanId } }: { arg: { dietPlanId: number } }) => {
    await clientFetcher({
        url: `${url}/${dietPlanId}`,
        method: 'delete',
    });
};

const PlanCard = ({ dietPlan, isEditable, isDeletable, selected, onSelection, onDelete }: PlanCardProps) => {
    const { user } = useAuth();
    const { push } = useRouter();

    const { trigger: deleteTrigger } = useSWRMutation('/nutritionist-diet-plans', onDeletePlanCard);

    const editPlanCard = (id: number) => {
        push(`/createDietPlan?dietPlan=${id}`);
    };

    const navigateToViewDietPlan = (id: number) => {
        push(`/dietPlan/${id}`);
    };

    const selectPlan = () => {
        if (!isEditable) {
            if (onSelection) onSelection(dietPlan);
        }
    };

    return (
        <Box sx={getStyles(selected, isEditable)} onClick={selectPlan}>
            <Box>
                <Typography variant="body1" sx={styles.planCardTitle}>
                    {dietPlan.attributes.name} {!isPlanFinished(dietPlan.attributes) && ' (plano por concluir)'}
                </Typography>

                <Box
                    component="img"
                    src={'https://images.pexels.com/photos/1788912/pexels-photo-1788912.jpeg'}
                    alt="dietPlan"
                    sx={styles.planCardImage}
                ></Box>
                <Typography variant="subtitle2" sx={styles.nutrifactsTitle}>
                    Objetivo
                </Typography>
                <Box sx={styles.nutritionalFacts}>
                    <Typography variant="body1">{dietPlan.attributes.goal}</Typography>
                </Box>
            </Box>

            <Button
                sx={styles.detailsButton}
                className={'bg-primary-400'}
                onClick={() => navigateToViewDietPlan(dietPlan.id)}
            >
                Detalhes
            </Button>

            {isEditable && (
                <Button
                    sx={styles.detailsButton}
                    className={'bg-primary-400'}
                    onClick={() => editPlanCard(dietPlan.id)}
                >
                    Editar
                </Button>
            )}
            {isDeletable && (
                <Button
                    sx={styles.detailsButton}
                    className={'bg-primary-400'}
                    onClick={() => deleteTrigger({ dietPlanId: dietPlan.id })}
                >
                    Apagar
                </Button>
            )}
        </Box>
    );
};

export default PlanCard;
