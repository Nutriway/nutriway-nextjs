import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../providers/useAuth';
import { styles } from './styles';
import { useSearchParams } from 'react-router-dom';
import NavigationBar from '../NavigationBar';
import { getNutritionistDietPlanByDietPlanId } from '../../../api/dietPlan';
import { DietPlanAttributes } from '../../../util/dietPlans';

export type MappedIngredient = {
    is_condiment: boolean;
    name: string;
    quantity: number;
    quantity_metric: string;
};

function NutritionistChosePlanIngredients() {
    // const push = useNavigate();
    const { user } = useAuth();
    const [searchparams] = useSearchParams();
    const [dietPlan, setDietPlan] = useState<DietPlanAttributes>({
        name: '',
        plan: {
            segunda: [],
            terça: [],
            quarta: [],
            quinta: [],
            sexta: [],
            sábado: [],
            domingo: [],
        },
        goal: '',
        observations: '',
    });

    //const [ingredients, setIngredients] = useState([]);

    const fetchData = useCallback(async () => {
        const planId = searchparams.get('dietPlan');
        if (planId !== null) {
            const { data } = await getNutritionistDietPlanByDietPlanId(planId, user!.jwt);
            if (data[0]) {
                setDietPlan({
                    name: data[0].attributes.name,
                    plan: data[0].attributes.plan,
                    goal: data[0].attributes.goal,
                    observations: data[0].attributes.observations,
                });
            }
        }
    }, [searchparams, user]);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user, fetchData]);

    const getPlanIngredients = async () => {
        //Necessary to continue task
        /*   let allRecipes: Recipe[] = [];
    Object.keys(dietPlan.plan).forEach((day: string) => {
      dietPlan.plan[day as keyof planKeys].forEach((recipe: Recipe) => {
        allRecipes.push(recipe);
      });
    });

    let allIngredients: MappedIngredient[] = [];

    allRecipes.forEach((recipe: Recipe) => {
      if (recipe?.attributes?.nutritionist_recipe_ingredients) {
        recipe?.attributes?.nutritionist_recipe_ingredients.data.forEach(
          (ingredient: Ingredient) =>
            allIngredients.push({
              name: ingredient.attributes.name,
              quantity_metric: ingredient.attributes.quantity_metric,
              quantity: ingredient.attributes.quantity,
              is_condiment: ingredient.attributes.is_condiment,
            })
        );
      } else if (recipe?.attributes?.api_recipe_ingredients) {
        recipe?.attributes?.api_recipe_ingredients.data.forEach(
          (ingredient: Ingredient) =>
            allIngredients.push({
              name: ingredient.attributes.name,
              quantity_metric: ingredient.attributes.quantity_metric,
              quantity: ingredient.attributes.quantity,
              is_condiment: ingredient.attributes.is_condiment,
            })
        );
      }
    });

    const filteredIngredients = allIngredients.reduce(
      (acc: MappedIngredient[], d: MappedIngredient) => {
        const found = acc.find(
          (a: MappedIngredient) =>
            a.name === d.name && a.quantity_metric === d.quantity_metric
        );

        const value = {
          quantity_metric: d.quantity_metric,
          quantity: d.quantity,
          is_condiment: d.is_condiment,
        }; // the element
        if (!found) {
          acc.push({ name: d.name, ...value }); // not found
        } else {
          found.quantity += value.quantity;
        }
        return acc;
      },
      []
    );

    console.log("filteredIngredients", filteredIngredients); */
    };

    getPlanIngredients();

    return (
        <Box>
            <NavigationBar />
            <Box sx={styles.pageWrapper}>{dietPlan.name}</Box>
        </Box>
    );
}

export default NutritionistChosePlanIngredients;
