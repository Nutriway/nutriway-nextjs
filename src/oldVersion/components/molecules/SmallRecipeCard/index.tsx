import React, { useState } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styles } from './styles';
import { useAuth } from '../../../providers/useAuth';
import { deleteRecipe, selectRecipe } from '../../../api/recipe';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { getRecipeNutritionalValue, Recipe } from '../../../util/recipes';

const SmallRecipeCard = ({
    recipe,
    changeSelection,
    isEditable,
    isDeletable,
    fetchNutritionistRecipes,
    selected,
    isSelectable,
    allowMainCourses,
}: {
    recipe: Recipe;
    changeSelection?: any;
    isEditable?: boolean;
    isDeletable?: boolean;
    fetchNutritionistRecipes?: any;
    selected?: boolean;
    isSelectable?: boolean;
    allowMainCourses: boolean;
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const { push } = useRouter();

    const { user } = useAuth();

    const viewDetails = () => {
        const isNutritionist = !!recipe.attributes.nutritionist;
        push(`../recipeDetails/${recipe.id}/${isNutritionist}`);
    };

    const updateSelectedList = async (selected: boolean) => {
        if (user?.type === 'client' && changeSelection) {
            setIsSelected(selected);
            changeSelection(recipe);
            await selectRecipe(recipe.id, selected, user!.jwt);
        }
        if (user?.type === 'nutritionist' && changeSelection) {
            setIsSelected(selected);
            changeSelection(recipe);
        }
    };

    const editRecipe = (recipeId: number) => {
        push({
            pathname: '/nutritionistRecipes/nutritionistAddRecipe',
            search: createSearchParams({
                recipeId: recipeId.toString(),
            }).toString(),
        });
    };

    const onDeleteRecipe = async (recipeId: number) => {
        await deleteRecipe(recipeId, user!.jwt);
        await fetchNutritionistRecipes();
    };

    const getRecipeTitle = () => {
        return recipe.attributes.title.length > 20
            ? recipe.attributes.title.slice(0, 20) + '...'
            : recipe.attributes.title;
    };

    return (
        <Box sx={isSelectable ? {} : { opacity: '0.5' }}>
            <Box sx={isSelectable ? styles.recipeResumeSelectable : styles.recipeResume}>
                <Box onClick={() => updateSelectedList(!isSelected)}>
                    <Typography title={recipe.attributes.title} variant="body2" sx={styles.recipeTitle}>
                        {getRecipeTitle()}
                    </Typography>

                    <Box sx={styles.recipeContainer}>
                        <Box
                            component="img"
                            src={recipe.attributes.image || 'https://picsum.photos/200'}
                            alt="recipe"
                            sx={styles.recipeImage}
                        ></Box>
                    </Box>

                    <Box sx={styles.nutritionalFacts}>
                        <Box>
                            <Typography sx={styles.nutrient}>Calories</Typography>
                            <Typography variant="body2" sx={styles.nutrientValue}>
                                {getRecipeNutritionalValue(recipe, 'energy')}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography sx={styles.nutrient}>Protein</Typography>
                            <Typography variant="body2" sx={styles.nutrientValue}>
                                {getRecipeNutritionalValue(recipe, 'protein')}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography sx={styles.nutrient}>Fat</Typography>
                            <Typography variant="body2" sx={styles.nutrientValue}>
                                {getRecipeNutritionalValue(recipe, 'fat')}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography sx={styles.nutrient}>Carbs</Typography>
                            <Typography variant="body2" sx={styles.nutrientValue}>
                                {getRecipeNutritionalValue(recipe, 'carbohydrate')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Button sx={isSelected ? styles.detailsButtonSelected : styles.detailsButton} onClick={viewDetails}>
                    Detalhes
                </Button>

                {isEditable && (
                    <Button
                        sx={isSelected ? styles.detailsButtonSelected : styles.detailsButton}
                        onClick={() => editRecipe(recipe.id)}
                    >
                        Editar receita
                    </Button>
                )}
                {isDeletable && (
                    <Button
                        sx={isSelected ? styles.detailsButtonSelected : styles.detailsButton}
                        onClick={() => onDeleteRecipe(recipe.id)}
                    >
                        Apagar receita
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SmallRecipeCard;
