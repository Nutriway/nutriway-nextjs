'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styles } from './styles';
import 'react-toastify/dist/ReactToastify.css';
import { getAppointmentById } from '../../../api/appointment';
import { useAuth } from '../../../providers/useAuth';
import { AppointmentType } from '../NutritionistAppointments';
import { Recipe } from '../../../util/recipes';
import { getNutritionistRecipesByNutritionistId, getApiRecipes } from '../../../api/recipe';
import { getNutritionistDietPlanByDietPlanId } from '../../../api/dietPlan';
import NutritionistCreateDietPlan from '../../../components/organisms/NutritionistCreateDietPlan';
import { DietPlan } from '../../../util/dietPlans';
import { useFetcher } from '@/lib/fetchers/clientFetcher';
import { User } from '@/types/User';
import { StrapiResponse } from '@/types/StrapiResponse';

function NutritionistCreateDietPlanPage() {
    const { data: user } = useFetcher<User>({
        url: '/users/me',
    });
    console.log('ENTER user', user);

    const { data: apiRecipes } = useFetcher<StrapiResponse<any>>({
        url: `/api-recipes?populate=*&pagination[pageSize]=10000`,
        shouldFetch: !!user,
    });
    const { data: nutritionistRecipes } = useFetcher<StrapiResponse<any>>({
        url: `/nutritionist-recipes?populate=*&filters[nutritionist][id][$eq]=${user?.id}`,
        shouldFetch: !!user,
    });
    const { data: appointments } = useFetcher<StrapiResponse<any>>({
        url: `/appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[id][$eq]=${user?.id}`,
        shouldFetch: !!user,
    });

    const [recipes, setRecipes] = useState<Recipe[]>();
    const [dietPlan, setDietPlan] = useState<DietPlan>({
        id: -1,
        attributes: { goal: '', plan: {}, name: '', observations: '' },
    });

    useEffect(() => {
        if (nutritionistRecipes && apiRecipes) {
            setRecipes([...nutritionistRecipes.data, ...apiRecipes.data]);
        }
    }, [apiRecipes, nutritionistRecipes]);

    return (
        <Box sx={styles.pageWrapper}>
            <Box sx={{ width: '100%', padding: '25px 0' }}>
                {
                    <NutritionistCreateDietPlan
                        //appointment={appointments[0]}
                        dietPlan={dietPlan}
                        onDietPlanChange={(dietPlan) => setDietPlan(dietPlan)}
                        recipes={recipes}
                    />
                }
            </Box>
        </Box>
    );
}

export default NutritionistCreateDietPlanPage;
