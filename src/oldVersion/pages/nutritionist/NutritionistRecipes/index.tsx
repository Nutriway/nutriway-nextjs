import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import NavigationBar from '../../../components/organisms/NavigationBar';
import { useRouter } from 'next/navigation';
import { getApiRecipes, getNutritionistRecipesByNutritionistId } from '../../../api/recipe';
import { useAuth } from '../../../providers/useAuth';
import { styles } from './styles';
import PrimaryButton from '../../../components/atoms/PrimaryButton';
import AddIcon from '@mui/icons-material/Add';
import RecipesList from '../../../components/organisms/RecipesList';
import { Recipe } from '../../../util/recipes';
import { ClockLoader } from 'react-spinners';

const NutritionistRecipes = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const fetchNutritionistRecipes = useCallback(async () => {
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
        fetchNutritionistRecipes();
    }, [fetchNutritionistRecipes]);

    const { push } = useRouter();
    const onNavigateToAddRecipe = () => {
        push('nutritionistAddRecipe');
    };

    return (
        <Box>
            <NavigationBar />
            <Box sx={styles.pageWrapper}>
                <Box>
                    <Box>
                        <PrimaryButton sx={{ mb: 3, ml: 4 }} onClick={onNavigateToAddRecipe} endIcon={<AddIcon />}>
                            Criar receita
                        </PrimaryButton>
                    </Box>

                    <Box>
                        <Box sx={styles.recipesWrapper}>
                            {recipes.length > 0 ? (
                                <RecipesList recipes={recipes} />
                            ) : (
                                <ClockLoader
                                    color="rgb(83, 168, 50)"
                                    size={90}
                                    cssOverride={{
                                        position: 'absolute',
                                        top: '0',
                                        bottom: '0',
                                        left: '0',
                                        right: '0',
                                        margin: 'auto',
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
export default NutritionistRecipes;
