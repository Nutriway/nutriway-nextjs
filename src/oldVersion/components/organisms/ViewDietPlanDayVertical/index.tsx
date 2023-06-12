'use client';
import { Box, Divider, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../providers/useAuth';
import { getWeekDay } from '../../../util/dietPlans';
import { Recipe } from '../../../util/recipes';
import PlanRecipeCard from '../../molecules/PlanRecipeCard';
import { styles } from './styles';

type ViewDietPlanDayVerticalProps = {
    dietPlan?: any;
    weekDay: string;
};

function ViewDietPlanDayVertical({ dietPlan, weekDay }: ViewDietPlanDayVerticalProps) {
    const { user } = useAuth();
    const [meals, setMeals] = useState<any>([]);

    const fetchMeals = useCallback(async () => {
        const meals = dietPlan?.plan[weekDay];

        if (meals) {
            setMeals(meals);
        }
    }, [dietPlan?.plan, weekDay]);

    useEffect(() => {
        if (user && dietPlan?.plan[weekDay]) {
            fetchMeals();
        }
    }, [user, dietPlan, fetchMeals, weekDay]);

    const getTotalCalories = () => {
        if (meals.length) {
            return Math.round(
                meals
                    .map((m: Recipe) => {
                        if (m?.attributes?.nutritional_values?.['energy']?.portion)
                            return parseInt(m?.attributes?.nutritional_values?.['energy']?.portion?.split(' ')[0]);
                        return 0;
                    })
                    .reduce((a: number, b: number) => a + b),
            );
        }

        return 0;
    };

    const getTotalProtein = () => {
        if (meals.length) {
            return Math.round(
                meals
                    .map((m: Recipe) => {
                        if (m?.attributes?.nutritional_values?.['protein']?.portion)
                            return parseInt(m?.attributes?.nutritional_values?.['protein']?.portion.split(' ')[0]);
                        return 0;
                    })
                    .reduce((a: number, b: number) => a + b),
            );
        }

        return 0;
    };

    const getTotalFat = () => {
        if (meals.length) {
            return Math.round(
                meals
                    .map((m: Recipe) => {
                        if (m?.attributes?.nutritional_values?.['fat']?.portion)
                            return parseInt(m?.attributes?.nutritional_values?.['fat']?.portion?.split(' ')[0]);
                        return 0;
                    })
                    .reduce((a: number, b: number) => a + b),
            );
        }

        return 0;
    };

    const getTotalCarbs = () => {
        if (meals.length) {
            return Math.round(
                meals
                    .map((m: Recipe) => {
                        if (m?.attributes?.nutritional_values?.['carbohydrate']?.portion)
                            return parseInt(
                                m?.attributes?.nutritional_values?.['carbohydrate']?.portion?.split(' ')[0],
                            );
                        return 0;
                    })
                    .reduce((a: number, b: number) => a + b),
            );
        }

        return 0;
    };
    type MealContainerProps = { recipe: Recipe };

    const MealContainer = ({ recipe }: MealContainerProps) => {
        return (
            <Box sx={styles.mealContainer}>
                <Typography variant="subtitle2" sx={{ mb: 0.8, ml: 1, fontWeight: 'bold' }}>
                    {recipe.attributes.TypeOfmealOnPlan}
                </Typography>

                <PlanRecipeCard recipe={recipe} />
            </Box>
        );
    };

    return (
        <Box>
            <Box sx={styles.wrapper}>
                <Box sx={styles.header}>
                    <Typography
                        id="modal-modal-title"
                        variant="subtitle1"
                        component="h2"
                        sx={{ mb: 1, fontWeight: 'bold' }}
                    >
                        {getWeekDay(weekDay)}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                        <Typography id="modal-modal-title" variant="subtitle2" component="h2" sx={{ mr: 2 }}>
                            {`${getTotalCalories()} kcal`}
                        </Typography>
                        <Typography id="modal-modal-title" variant="subtitle2" component="h2" sx={{ mr: 2 }}>
                            {`${getTotalCarbs()}g carboidratos`}
                        </Typography>
                        <Typography id="modal-modal-title" variant="subtitle2" component="h2" sx={{ mr: 2 }}>
                            {`${getTotalProtein()}g proteína`}
                        </Typography>

                        <Typography id="modal-modal-title" variant="subtitle2" component="h2" sx={{ mr: 0 }}>
                            {`${getTotalFat()}g gordura`}
                        </Typography>
                    </Box>

                    <Divider />
                </Box>

                <Box>
                    {meals.map((r: Recipe, index: number) => (
                        <Box sx={styles.mealsWrapper} key={'mealsWrapper' + weekDay + index}>
                            <MealContainer key={index + weekDay + r.id} recipe={r} />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default ViewDietPlanDayVertical;
