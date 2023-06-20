'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import { Recipe, Ingredient, renderMealType, renderQuantityMetric } from '../../../util/recipes';

type RecipeDetailsParams = {
    recipe: Recipe;
};

const UserRecipeDetails = ({ recipe }: RecipeDetailsParams) => {
    const renderCookInstructions = (instructions: { step: number; description: String }[]) => {
        if (instructions.length > 0) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexDirection: 'column',
                        m: 1,
                    }}
                >
                    {instructions.map((i: { step: number; description: String }, index: number) => (
                        <Box key={index}>{i.step + ':  ' + i.description}</Box>
                    ))}
                </Box>
            );
        }
        return null;
    };

    return (
        <Box>
            {recipe && (
                <Box sx={styles.baseBox}>
                    <Box sx={styles.columnBox}>
                        <Typography
                            variant="body1"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                                fontSize: '23px',
                            }}
                        >
                            {recipe.attributes.title}
                        </Typography>
                        <Box sx={styles.firstRow}>
                            <Box
                                sx={{
                                    width: '35%',
                                    textAlign: 'left',
                                }}
                            >
                                Tipo de refeição:{' '}
                                {recipe.attributes.meal_type
                                    ? renderMealType(recipe.attributes.meal_type)
                                    : 'Sem informação'}{' '}
                                <br />
                                <br />
                                Tempo de preparação:{' '}
                                {recipe.attributes.preparationTime
                                    ? recipe.attributes.preparationTime
                                    : 'Sem informação'}{' '}
                                <br />
                                <br />
                                Doses: {recipe.attributes.servings ? recipe.attributes.servings : 'Sem informação'}{' '}
                                <br />
                                <br />
                            </Box>
                            <Box
                                sx={{
                                    diplay: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={recipe.attributes.image || 'https://picsum.photos/200'}
                                    sx={styles.recipeImage}
                                ></Box>
                            </Box>
                            <Box
                                sx={{
                                    width: '35%',
                                    textAlign: 'right',
                                }}
                            >
                                Calorias: {recipe?.attributes?.nutritional_values?.energy?.portion || 0}
                                <br /> <br />
                                Proteinas: {recipe?.attributes?.nutritional_values?.protein?.portion || 0}
                                <br /> <br />
                                Carbohidratos: {recipe?.attributes?.nutritional_values?.carbohydrate?.portion || 0}
                                <br /> <br />
                                Gorduras: {recipe?.attributes?.nutritional_values?.fat?.portion || 0} <br />
                                <br />
                                <Box>
                                    {recipe.attributes.diets.includes('Sem Glúten') && (
                                        <Box
                                            component="img"
                                            src="../../../../images/glutenFree.svg"
                                            sx={{ width: '50px' }}
                                        ></Box>
                                    )}
                                    {recipe.attributes.diets.includes('Sem Lactose') && (
                                        <Box
                                            component="img"
                                            src="../../../../images/lactose.svg"
                                            sx={{ width: '50px' }}
                                        ></Box>
                                    )}
                                    {recipe.attributes.diets.includes('Mediterrânea') && (
                                        <Box
                                            component="img"
                                            src="../../../../images/mediterranica.svg"
                                            sx={{ width: '50px' }}
                                        ></Box>
                                    )}
                                    {recipe.attributes.diets.includes('Sem Leite') && (
                                        <Box
                                            component="img"
                                            src="../../../../images/nomilk.svg"
                                            sx={{ width: '50px' }}
                                        ></Box>
                                    )}
                                    {recipe.attributes.diets.includes('Vegan') && (
                                        <Box
                                            component="img"
                                            src="../../../../images/vegan.svg"
                                            sx={{ width: '50px' }}
                                        ></Box>
                                    )}
                                    {recipe.attributes.diets.includes('Vegetariana') && (
                                        <Box
                                            component="img"
                                            src="../../../../images/vegetarian.svg"
                                            sx={{ width: '50px' }}
                                        ></Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={styles.secondRow}>
                            <Typography variant="body1" sx={styles.recipeTitle}>
                                Ingredientes
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    ml: '2px',
                                    mr: '2px',
                                    padding: '8px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '5px',
                                }}
                            >
                                {recipe.attributes.nutritionist_recipe_ingredients
                                    ? recipe.attributes.nutritionist_recipe_ingredients.data.map(
                                          (r: Ingredient, index: number) => (
                                              <Box key={index}>
                                                  {index +
                                                      1 +
                                                      ':  ' +
                                                      r.attributes.name +
                                                      ', ' +
                                                      r.attributes.quantity +
                                                      ' ' +
                                                      renderQuantityMetric(r.attributes.quantity_metric)}
                                              </Box>
                                          ),
                                      )
                                    : recipe.attributes.api_recipe_ingredients
                                    ? recipe.attributes.api_recipe_ingredients.data.map(
                                          (r: Ingredient, index: number) => (
                                              <Box key={index}>
                                                  {index +
                                                      1 +
                                                      ':  ' +
                                                      r.attributes.name +
                                                      ', ' +
                                                      r.attributes.quantity +
                                                      ' ' +
                                                      renderQuantityMetric(r.attributes.quantity_metric)}
                                              </Box>
                                          ),
                                      )
                                    : 'Sem informações.'}
                            </Box>
                        </Box>
                        <Box sx={styles.thirdRow}>
                            <Typography variant="body1" sx={styles.recipeTitle}>
                                Modo de Preparação
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    flexDirection: 'column',
                                    ml: '2px',
                                    mr: '2px',
                                    padding: '2px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '5px',
                                }}
                            >
                                {recipe.attributes.cookInstructions
                                    ? renderCookInstructions(recipe.attributes.cookInstructions)
                                    : 'Sem informações.'}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default UserRecipeDetails;
