import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { createNutritionistDietPlan, getNutritionistDietPlanByDietPlanId, updateDietPlan } from '../../../api/dietPlan';
import NavigationBar from '../../../components/organisms/NavigationBar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getNutritionistRecipesByNutritionistId } from '../../../api/recipe';
import { useAuth } from '../../../providers/useAuth';
import Recipe from '../../../components/molecules/RecipeCard';

const NutritionistAddDietPlan = () => {
    const { push } = useRouter();
    const { user } = useAuth();
    const [searchparams] = useSearchParams();
    const [dietPlan, setDietPlan] = useState<any>({
        attributes: {
            name: undefined,
            recipes: [],
        },
    });

    const [nutritionistRecipes, setNutritionistRecipes] = useState<any>();
    const onSelectRecipe = useCallback(
        (recipe: any, selected: boolean) => {
            const newRecipes = dietPlan?.attributes?.recipes?.filter(
                (dietPlanRecipe: any) => dietPlanRecipe.id !== recipe.id,
            );

            setDietPlan({
                ...dietPlan,
                attributes: {
                    name: dietPlan.attributes.name,
                    recipes: selected ? [...newRecipes, recipe] : [...newRecipes],
                },
            });
        },
        [dietPlan],
    );

    const fetchDietPlanById = useCallback(
        async (id: string) => {
            const { data } = await getNutritionistDietPlanByDietPlanId(id, user!.jwt);

            if (data.length) {
                const { name, nutritionist, nutritionist_recipes } = data[0].attributes;
                setDietPlan({
                    id: data[0].id,
                    attributes: {
                        name,
                        nutritionist: nutritionist.data,
                        recipes: nutritionist_recipes.data,
                    },
                });
            }
        },
        [user],
    );
    const fetchNutritionistRecipes = useCallback(async () => {
        try {
            if (user) {
                const { data } = await getNutritionistRecipesByNutritionistId(user.id.toString(), user!.jwt);
                if (data) {
                    setNutritionistRecipes(data);
                }
            }
        } catch (error) {}
    }, [user]);

    useEffect(() => {
        if (searchparams.get('dietPlanId')) {
            //@ts-ignore
            fetchDietPlanById(searchparams.get('dietPlanId'));
        }
        fetchNutritionistRecipes();
    }, [searchparams, fetchDietPlanById, fetchNutritionistRecipes]);

    const onChangeDietPlan = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setDietPlan({
            ...dietPlan,
            attributes: { ...dietPlan.attributes, [name]: value },
        });
    };

    const onBack = () => {
        push(-1);
    };

    const onEditDietPlan = async () => {
        await updateDietPlan(dietPlan, user!.jwt);
    };

    const onSubmitDietPlan = async () => {
        try {
            if (user) {
                await createNutritionistDietPlan(dietPlan, user.id.toString(), user!.jwt);
                setDietPlan({
                    attributes: {
                        name: undefined,
                        recipes: [],
                    },
                });
            }
        } catch (error) {}
    };

    const isRecipeSelected = useCallback(
        (recipe: any) => {
            return !!dietPlan.attributes?.recipes?.find((r: any) => r.id === recipe.id);
        },
        [dietPlan],
    );

    return (
        <Box>
            <NavigationBar />

            <ArrowBackIcon onClick={onBack} />

            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '8px',
                    marginRight: '8px',
                    '&>*': {
                        margin: '4px',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    <TextField
                        fullWidth
                        onChange={onChangeDietPlan}
                        label="Nome"
                        placeholder="Nome"
                        variant="outlined"
                        name="name"
                        value={dietPlan.attributes.name}
                    />
                </Box>

                <Box>
                    <Typography>Receitas</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        {nutritionistRecipes &&
                            nutritionistRecipes.map((recipe: any) => (
                                <Recipe
                                    isDeletable={false}
                                    isEditable={false}
                                    recipe={recipe}
                                    changeSelection={onSelectRecipe}
                                    key={recipe.id}
                                    selected={isRecipeSelected(recipe)}
                                />
                            ))}
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Calorias</TableCell>
                                <TableCell>Hidratos de Carbono</TableCell>
                                <TableCell>Proteina</TableCell>
                                <TableCell>Lipidos</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dietPlan?.attributes.recipes?.length > 0 &&
                                dietPlan.attributes.recipes.map((recipe: any) => (
                                    <TableRow key={recipe.id}>
                                        <TableCell>{recipe.attributes.title}</TableCell>
                                        <TableCell>{recipe.attributes.calories}</TableCell>
                                        <TableCell>{recipe.attributes.carbs}</TableCell>
                                        <TableCell>{recipe.attributes.protein}</TableCell>
                                        <TableCell>{recipe.attributes.fat}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Box>

                {searchparams.get('dietPlanId') ? (
                    <Button onClick={onEditDietPlan}>Editar plano</Button>
                ) : (
                    <Button onClick={onSubmitDietPlan}>Adicionar plano</Button>
                )}
            </Box>
        </Box>
    );
};

export default NutritionistAddDietPlan;
