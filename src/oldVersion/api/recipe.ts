import api from './index';
import { toast } from 'react-toastify';
import { getMealType } from '../util/appointments';
import { NutritionalSummaryItem, NutritionalValues } from '../util/recipes';

type CreateApiRecipeType = {
    selected: boolean;
    recipeId: number;
    title: string;
    apiId: number;
    image: string;
    sourceUrl: string;
    dairyFree: boolean;
    glutenFree: boolean;
    vegan: boolean;
    vegetarian: boolean;
    preparationTime: number;
    servings: number;
    cuisines: [];
    diets: [];
    nutrients: [];
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    mealType: string;
    observations: String;
    cookInstructions: [];
    jwt: string;
};

type CreateRecipeType = {
    selected: boolean;
    client: { id: number };
    recipeId: number;
    title: string;
    image: string;
    sourceUrl: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    mealType: string;
    jwt: string;
};

export type CreateNutritionistRecipeType = {
    title: string;
    image: string;
    preparationTime: string;
    servings: number;
    diets: string[];
    meal_type: string[];
    cookInstructions: {
        step: number;
        description: string;
    }[];
    nutritional_summary: NutritionalSummaryItem[];
    nutritional_values: NutritionalValues;
    difficulty: string;
    id: number | null | undefined;
};

export type CreateNutritionistIngredientForRecipe = {
    name: string;
    is_condiment: boolean;
    quantity: number;
    quantityMetric: string;
    id: number | null | undefined;
};

export type CreateApiIngredientForRecipe = {
    name: string;
    url: string;
    ingredientImage: string;
    quantity: number;
    quantityMetric: string;
    id: number | null | undefined;
};

export const createRecipe = async ({
    selected,
    client,
    recipeId,
    title,
    image,
    sourceUrl,
    calories,
    protein,
    fat,
    carbs,
    mealType,
    jwt,
}: CreateRecipeType) => {
    const { data } = await api(jwt).post('client-recipes', {
        data: {
            selected,
            client,
            recipe_id: recipeId,
            title,
            image,
            sourceUrl,
            calories,
            protein,
            fat,
            carbs,
            mealType,
        },
    });
    return data;
};

export const createRecipes = async (recipes: any, clientId: number, mealType: string, jwt: string) => {
    try {
        const newRecipes = recipes.map(async (recipe: any) => {
            const newRecipe = {
                selected: false,
                client: { id: clientId },
                recipeId: recipe.id,
                title: recipe.title,
                image: recipe.image,
                sourceUrl: recipe.sourceUrl,
                calories: recipe.nutrition.nutrients[0].amount,
                protein: recipe.nutrition.nutrients[1].amount,
                fat: recipe.nutrition.nutrients[2].amount,
                carbs: recipe.nutrition.nutrients[3].amount,
                mealType,
            };
            const { data } = await createRecipe({ ...newRecipe, jwt });

            return data;
        });
        toast.success(`Receitas de ${getMealType(mealType)} submetidas`);

        return Promise.all(newRecipes).then((responses) => responses);
    } catch {
        toast.error(`Error on submitting ${mealType}s`);
    }
};

export const selectRecipe = async (clientRecipeId: number, isSelected: boolean, jwt: string) => {
    await api(jwt).put(`client-recipes/${clientRecipeId}`, {
        data: {
            selected: isSelected,
        },
    });
};

export const createNutritionistRecipe = async (
    {
        title,
        image,
        servings,
        preparationTime,
        diets,
        meal_type,
        cookInstructions,
        nutritional_summary,
        nutritional_values,
        difficulty,
    }: CreateNutritionistRecipeType,
    recipeIngredients: CreateNutritionistIngredientForRecipe[],
    valid: boolean,
    nutritionist: any,
) => {
    try {
        const { data } = await api(nutritionist.jwt).post('nutritionist-recipes', {
            data: {
                title,
                image,
                servings,
                preparationTime,
                diets,
                meal_type,
                cookInstructions,
                nutritional_summary,
                nutritional_values,
                difficulty,
                nutritionist,
                valid,
            },
        });

        await Promise.all(
            recipeIngredients.map(async (ingredient: any) => {
                await api(nutritionist.jwt).post('nutritionist-recipe-ingredients', {
                    data: {
                        name: ingredient.name,
                        url: ingredient.url,
                        is_condiment: ingredient.is_condiment,
                        quantity: ingredient.quantity,
                        quantity_metric: ingredient.quantityMetric,
                        nutritionist_recipe: { id: data.data.id },
                    },
                });
            }),
        );

        toast.success('Receita criada');
        return data;
    } catch (error) {
        toast.error('Error');
    }
};

export const createApiRecipe = async (
    {
        title,
        apiId,
        image,
        sourceUrl,
        dairyFree,
        glutenFree,
        vegan,
        vegetarian,
        preparationTime,
        servings,
        cuisines,
        diets,
        nutrients,
        calories,
        protein,
        fat,
        carbs,
        mealType,
        observations,
        cookInstructions,
    }: CreateApiRecipeType,
    recipeIngredients: CreateApiIngredientForRecipe[],
    valid: boolean,
    nutritionist: any,
) => {
    try {
        const { data } = await api(nutritionist.jwt).post('api-recipes', {
            data: {
                title,
                apiId,
                image,
                sourceUrl,
                dairyFree,
                glutenFree,
                vegan,
                vegetarian,
                preparationTime,
                servings,
                cuisines,
                diets,
                nutrients,
                calories,
                protein,
                fat,
                carbs,
                mealType,
                cookInstructions,
                observations,
                valid,
            },
        });

        /*  const insertQuery = {
      text: "INSERT INTO ApiRecipe(title, image, sourceUrl, dairyFree, glutenFree, vegan, vegetarian, preparationTime, servings, cuisines, diets, nutrients, calories,  protein, fat,  carbs, mealType, cookInstructions, nutritionist, valid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)",
      values: [
        "title, image, sourceUrl, dairyFree, glutenFree, vegan, vegetarian, preparationTime, servings, cuisines, diets, nutrients, calories,  protein, fat,  carbs, mealType, cookInstructions, nutritionist, valid",
      ],
    };
 */
        await Promise.all(
            recipeIngredients.map(async (ingredient: any) => {
                await api(nutritionist.jwt).post('api-recipe-ingredients', {
                    data: {
                        name_pt: ingredient.name,
                        url: ingredient.url,
                        image: ingredient.ingredientImage,
                        quantity: ingredient.quantity,
                        quantity_metric: ingredient.quantityMetric,
                        api_recipe: { id: data.data.id },
                    },
                });
            }),
        );

        toast.success('Receita criada');
        return data;
    } catch (error) {
        toast.error('Error');
    }
};

export const getNutritionistRecipes = async (jwt: string) => {
    try {
        const { data } = await api(jwt).get('nutritionist-recipes');
        return data;
    } catch (error) {
        toast.error('Error fetching recipes');
    }
};

export const getNutritionistRecipesByNutritionistId = async (nutritionistId: string, jwt: string) => {
    try {
        const { data } = await api(jwt).get(
            `nutritionist-recipes?populate=*&filters[nutritionist][id][$eq]=${nutritionistId}`,
        );
        return data;
    } catch (error) {
        toast.error('Error fetching recipes');
    }
};

export const getIngredientsByRecipeId = async (recipeId: string, jwt: string) => {
    try {
        const { data } = await api(jwt).get(
            `api-recipe-ingredients?populate=*&filters[api_recipe][id][$eq]=${recipeId}`,
        );
        return data;
    } catch (error) {
        toast.error('Error fetching recipes');
    }
};

export const getApiRecipes = async (jwt: string) => {
    try {
        const { data } = await api(jwt).get(`api-recipes?populate=*&pagination[pageSize]=10000`);
        return data;
    } catch (error) {
        toast.error('Erro ao procurar as receitas');
    }
};

export const getApiRecipeByRecipeId = async (id: string, jwt: string) => {
    try {
        const { data } = await api(jwt).get(`api-recipes/${id}`);
        return data;
    } catch (error) {
        toast.error('Erro ao procurar a receita');
    }
};

export const getNutritionistRecipeByRecipeId = async (id: string, jwt: string) => {
    try {
        const { data } = await api(jwt).get(`nutritionist-recipes/${id}`);
        return data;
    } catch (error) {
        toast.error('Erro ao procurar a receita');
    }
};

export const getNutritionistRecipesByRecipesIds = async (nutritionistId: number, ids: string[], jwt: string) => {
    if (ids.length) {
        let url = `nutritionist-recipes?populate=*&filters[nutritionist][id][$eq]=${nutritionistId}`;
        ids.forEach((id: string) => (url += `&filters[id][$eq]=${id}`));

        try {
            const { data } = await api(jwt).get(url);
            return data;
        } catch (error) {
            toast.error('Error fetching recipe');
        }
    }
};

export const updateRecipe = async (
    recipe: CreateNutritionistRecipeType,
    recipeIngredients: CreateNutritionistIngredientForRecipe[],
    valid: boolean,
    jwt: string,
) => {
    try {
        const {
            title,
            image,
            preparationTime,
            servings,
            diets,
            meal_type,
            cookInstructions,
            nutritional_summary,
            nutritional_values,
            difficulty,
        } = recipe;
        const { data } = await api(jwt).put(`nutritionist-recipes/${recipe.id}`, {
            data: {
                title,
                image,
                preparationTime,
                servings,
                diets,
                meal_type,
                cookInstructions,
                nutritional_summary,
                nutritional_values,
                difficulty,
                valid,
            },
        });

        recipeIngredients.forEach(async (ingredient) => {
            if (ingredient.id) {
                await api(jwt).put(`nutritionist-recipe-ingredients/${ingredient.id}`, {
                    data: {
                        name_pt: ingredient.name,
                        isCondiment: ingredient.is_condiment,
                        quantity: ingredient.quantity,
                        quantity_metric: ingredient.quantityMetric,
                        nutritionist_recipe: { id: data.data.id },
                    },
                });
            } else {
                await api(jwt).post(`nutritionist-recipe-ingredients`, {
                    data: {
                        name_pt: ingredient.name,
                        isCondiment: ingredient.is_condiment,
                        quantity: ingredient.quantity,
                        quantity_metric: ingredient.quantityMetric,
                        nutritionist_recipe: { id: data.data.id },
                    },
                });
            }
        });
        toast.success('Recipe updated');
    } catch (error) {
        toast.error('Recipe not updated');
    }
};
export const deleteIngredient = async (id: number, jwt: string) => {
    try {
        await api(jwt).delete(`nutritionist-recipe-ingredients/${id}`);
        toast.success('Ingredient deleted');
    } catch (error) {
        toast.error('Ingredient not deleted');
    }
};
export const deleteRecipe = async (id: number, jwt: string) => {
    try {
        await api(jwt).delete(`nutritionist-recipes/${id}`);
        toast.success('Ingredient deleted');
    } catch (error) {
        toast.error('Ingredient not deleted');
    }
};
