import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { styles } from './styles';
import { getRecipeNutritionalValue, Recipe } from '../../../util/recipes';
import { useRouter } from 'next/navigation';

type PlanRecipeCardProps = {
    recipe: Recipe;
};

const PlanRecipeCard = ({ recipe }: PlanRecipeCardProps) => {
    const { push } = useRouter();

    const viewDetails = () => {
        const isNutritionist = !!recipe.attributes.nutritionist;
        push(`/recipeDetails/${recipe.id}?nutritionist=${isNutritionist}`);
    };

    const getRecipeTitle = () => {
        return recipe.attributes.title.length > 19
            ? recipe.attributes.title.slice(0, 19) + '...'
            : recipe.attributes.title;
    };

    return (
        <Box sx={styles.recipeResume}>
            <Box>
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

            <Button sx={styles.detailsButton} onClick={viewDetails}>
                Detalhes
            </Button>
        </Box>
    );
};

export default React.memo(PlanRecipeCard);
