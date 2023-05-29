import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  FormControlLabel,
  Switch,
  Autocomplete,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  CreateNutritionistIngredientForRecipe,
  createNutritionistRecipe,
  CreateNutritionistRecipeType,
  deleteIngredient,
  getNutritionistRecipeByRecipeId,
  updateRecipe,
} from "../../../api/recipe";
import NavigationBar from "../../../components/organisms/NavigationBar";
import { useSearchParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useAuth } from "../../../providers/useAuth";
import { styles } from "./styles";
import CancelButton from "../../../components/atoms/CancelButton";
import PrimaryButton from "../../../components/atoms/PrimaryButton";
import CustomTextField from "../../../components/atoms/CustomTextField";
import { Ingredient } from "../../../util/recipes";

const NutritionistAddRecipe = () => {
  let activeStep = 1;
  const { user } = useAuth();
  const [searchparams] = useSearchParams();
  const [recipe, setRecipe] = useState<CreateNutritionistRecipeType>({
    title: "",
    image: "",
    preparationTime: "",
    servings: 0,
    diets: [],
    nutritional_summary: [],
    nutritional_values: {
      energy: {
        portion: "",
        percentage: "",
      },
      fat: {
        portion: "",
        percentage: "",
      },
      carbohydrate: {
        portion: "",
        percentage: "",
      },
      protein: {
        portion: "",
        percentage: "",
      },
    },
    difficulty: "",
    meal_type: [],
    cookInstructions: [{ step: activeStep, description: "" }],
    id: null,
  });

  const mealTypesList = [
    "Bebidas",
    "Sobremesa",
    "Crianças",
    "Pequeno-almoço e lanches",
    "Prato Principal",
    "Entradas",
    "Petiscos",
    "Acompanhamento",
    "Sopa",
  ];

  const [dietsState, setDietState] = React.useState({
    isVegan: false,
    isVegetarian: false,
    isNoMilk: false,
    isGlutenFree: false,
  });

  const handleChangeInDiets = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDietState({
      ...dietsState,
      [event.target.name]: event.target.checked,
    });
    let array = [];
    if (dietsState.isVegan) {
      array.push("Vegan");
    }
    if (dietsState.isVegetarian) {
      array.push("Vegetariana");
    }
    if (dietsState.isNoMilk) {
      array.push("Sem Lactose");
    }
    if (dietsState.isGlutenFree) {
      array.push("Sem Glúten");
    }
    setRecipe({ ...recipe, diets: array });
  };

  const [recipeIngredients, setRecipeIngredients] = useState<
    CreateNutritionistIngredientForRecipe[]
  >([
    {
      name: "",
      is_condiment: false,
      quantity: 0,
      quantityMetric: "",
      id: null,
    },
  ]);

  const fetchRecipeById = useCallback(
    async (id: string) => {
      const { data } = await getNutritionistRecipeByRecipeId(id, user!.jwt);
      if (data.length) {
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
        } = data[0].attributes;

        const recipeIngredients =
          data[0].attributes.nutritionist_recipe_ingredients.data;

        const newRecipeIngredients = recipeIngredients.map(
          (recipeIngredient: Ingredient) => {
            const newRecipeIngredient = recipeIngredient.attributes;
            return {
              name: newRecipeIngredient.name,
              quantity: newRecipeIngredient.quantity,
              quantityMetric: newRecipeIngredient.quantity_metric,
              isCondiment: newRecipeIngredient.is_condiment,
              id: recipeIngredient.id,
            };
          }
        );

        setRecipe({
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
          id: data[0].id,
        });

        setRecipeIngredients(newRecipeIngredients);
      }
    },
    [user]
  );

  useEffect(() => {
    if (searchparams.get("recipeId")) {
      //@ts-ignore
      fetchRecipeById(searchparams.get("recipeId"));
    }
  }, [searchparams, fetchRecipeById]);

  const onChangeRecipe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const onChangeRecipeCalories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let nutritional_values = recipe.nutritional_values;
    nutritional_values.energy.portion = value;
    setRecipe({ ...recipe, nutritional_values });
  };
  const onChangeRecipeCarbs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let nutritional_values = recipe.nutritional_values;
    nutritional_values.carbohydrate.portion = value;
    setRecipe({ ...recipe, nutritional_values });
  };
  const onChangeRecipeProtein = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let nutritional_values = recipe.nutritional_values;
    nutritional_values.protein.portion = value;
    setRecipe({ ...recipe, nutritional_values });
  };
  const onChangeRecipeFat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let nutritional_values = recipe.nutritional_values;
    nutritional_values.fat.portion = value;
    setRecipe({ ...recipe, nutritional_values });
  };

  const onChangeRecipeInstructions = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value, name } = event.target;
    let newArr = [...recipe.cookInstructions];
    //@ts-ignore
    newArr[index][name] = value;
    setRecipe({ ...recipe, [name]: newArr });
  };

  const handleMoreSteps = () => {
    let newArr = [...recipe.cookInstructions];
    newArr[newArr.length] = { step: newArr.length + 1, description: "" };
    setRecipe({ ...recipe, cookInstructions: newArr });
  };

  const onChangeRecipeDifficulty = (event: SelectChangeEvent<string>) => {
    const { value, name } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleMoreIngredient = () => {
    setRecipeIngredients([
      ...recipeIngredients,
      {
        name: "",
        is_condiment: false,
        quantity: 0,
        quantityMetric: "",
        id: null,
      },
    ]);
  };

  const onDeleteIngredient = (index: number, ingredientId: number) => {
    let newArr = [...recipeIngredients];
    if (index > -1) {
      // only splice array when item is found
      newArr.splice(index, 1); // 2nd parameter means remove one item only
    }

    setRecipeIngredients(newArr);

    if (ingredientId) {
      deleteIngredient(ingredientId, user!.jwt);
    }
  };

  const onChangeRecipeIngredient = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let newArr = [...recipeIngredients];
    //@ts-ignore
    newArr[index][name] = value;

    setRecipeIngredients(newArr);
  };

  const onChangeQuantityMetric = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const { value, name } = event.target;
    let newArr = [...recipeIngredients];
    //@ts-ignore
    newArr[index][name] = value;

    setRecipeIngredients(newArr);
  };

  const onChangeIsCondiment = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const { value, name } = event.target;
    let newArr = [...recipeIngredients];
    //@ts-ignore
    newArr[index][name] = value === "yes";

    setRecipeIngredients(newArr);
  };

  const areRecipeIngredientsValid = () => {
    if (recipeIngredients.length === 0) return false;

    let valid = true;

    recipeIngredients.forEach((i: any) => {
      if (!i.url) valid = false;
    });

    return valid;
  };

  const onAutocompleteChange = (
    e: React.SyntheticEvent<Element, Event>,
    values: string[]
  ) => {
    if (values) {
      setRecipe({ ...recipe, meal_type: values });
    }
  };

  const onEditRecipe = async () => {
    await updateRecipe(
      recipe,
      recipeIngredients,
      areRecipeIngredientsValid(),
      user!.jwt
    );
  };

  const onSubmitRecipe = async () => {
    if (user) {
      await createNutritionistRecipe(
        recipe,
        recipeIngredients,
        areRecipeIngredientsValid(),
        user
      );
    }
    setRecipe({
      title: "",
      image: "",
      preparationTime: "",
      servings: 0,
      diets: [],
      nutritional_summary: [],
      nutritional_values: {
        energy: {
          portion: "",
          percentage: "",
        },
        fat: {
          portion: "",
          percentage: "",
        },
        carbohydrate: {
          portion: "",
          percentage: "",
        },
        protein: {
          portion: "",
          percentage: "",
        },
      },
      difficulty: "",
      meal_type: [],
      cookInstructions: [{ step: activeStep, description: "" }],
      id: null,
    });

    setRecipeIngredients([
      {
        name: "",
        is_condiment: false,
        quantity: 0,
        quantityMetric: "",
        id: null,
      },
    ]);
  };

  const isRecipeValid = () => {
    return (
      recipe.title &&
      recipe.image &&
      recipe.diets &&
      recipe.nutritional_summary &&
      recipe.nutritional_values &&
      recipe.meal_type &&
      recipe.cookInstructions &&
      recipe.difficulty &&
      recipe.servings
    );
  };

  return (
    <Box>
      <NavigationBar />
      <Box sx={styles.pageWrapper}>
        <Box sx={styles.recipeInfoWrapper}>
          <Typography variant="h5">Nova receita</Typography>
          <Box sx={styles.firstRow}>
            <CustomTextField
              onChange={onChangeRecipe}
              label="Titulo"
              placeholder="Titulo"
              variant="outlined"
              name="title"
              value={recipe.title}
              sx={{ flex: 1, mr: "35px" }}
            />
            <CustomTextField
              onChange={onChangeRecipe}
              label="Imagem Url"
              placeholder="Imagem"
              variant="outlined"
              name="image"
              value={recipe.image}
              sx={{ flex: 1, mr: "35px" }}
            />
            <CustomTextField
              onChange={onChangeRecipe}
              label="Tempo de Preparação"
              placeholder="Preparacao"
              variant="outlined"
              name="preparationTime"
              value={recipe.preparationTime}
              sx={{ flex: 1, mr: "35px" }}
            />

            <Autocomplete
              value={recipe.meal_type}
              onChange={onAutocompleteChange}
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={mealTypesList}
              getOptionLabel={(option) => option}
              sx={{ flex: 1, mr: "35px" }}
              renderInput={(params) => {
                return (
                  <CustomTextField
                    {...params}
                    label="Tipo de refeição"
                    placeholder="Tipo de refeição"
                  />
                );
              }}
            />

            <FormControl sx={{ flex: 1 }}>
              <InputLabel id="demo-simple-select-label">Dificuldade</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={recipe.difficulty}
                label="Tipo de refeição"
                name="difficulty"
                onChange={onChangeRecipeDifficulty}
              >
                <MenuItem value={"Fácil"}>Fácil</MenuItem>
                <MenuItem value={"Média"}>Média</MenuItem>
                <MenuItem value={"Difícil"}>Difícil</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={styles.secondRow}>
            <CustomTextField
              onChange={onChangeRecipeCalories}
              label="Calorias (Kcal)"
              placeholder="Calories"
              variant="outlined"
              name="nutritional_values.energy.portion"
              value={recipe.nutritional_values.energy.portion}
              sx={{ flex: 1, mr: "35px" }}
            />
            <CustomTextField
              onChange={onChangeRecipeCarbs}
              label="Hidratos de carbono (g)"
              placeholder="Hidratos de carbono"
              variant="outlined"
              name="nutritional_values.carbohydrate.portion"
              value={recipe.nutritional_values.carbohydrate.portion}
              sx={{ flex: 1, mr: "35px" }}
            />
            <CustomTextField
              onChange={onChangeRecipeProtein}
              label="Proteina (g)"
              placeholder="Proteina"
              variant="outlined"
              name="nutritional_values.protein.portion"
              value={recipe.nutritional_values.protein.portion}
              sx={{ flex: 1, mr: "35px" }}
            />
            <CustomTextField
              onChange={onChangeRecipeFat}
              label="Gordura (g)"
              placeholder="Gordura"
              variant="outlined"
              name="nutritional_values.fat.portion"
              value={recipe.nutritional_values.fat.portion}
              sx={{ flex: 1, mr: "35px" }}
            />
            <CustomTextField
              onChange={onChangeRecipe}
              label="Doses"
              placeholder="Gordura"
              variant="outlined"
              name="servings"
              value={recipe.servings}
              sx={{ flex: 1 }}
              type="number"
            />
          </Box>
          <Box sx={styles.secondRow}>
            <FormControlLabel
              control={
                <Switch
                  checked={dietsState.isVegan}
                  onChange={handleChangeInDiets}
                  name="isVegan"
                />
              }
              sx={{ flex: 1, mr: "35px", width: "50px" }}
              label="Vegan"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dietsState.isVegetarian}
                  onChange={handleChangeInDiets}
                  name="isVegetarian"
                />
              }
              sx={{ flex: 1, mr: "35px", width: "50px" }}
              label="Vegetariana"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dietsState.isGlutenFree}
                  onChange={handleChangeInDiets}
                  name="isGlutenFree"
                />
              }
              sx={{ flex: 1, mr: "35px", width: "50px" }}
              label="Sem Glúten"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={dietsState.isNoMilk}
                  onChange={handleChangeInDiets}
                  name="isNoMilk"
                />
              }
              sx={{ flex: 1, mr: "35px", width: "50px" }}
              label="Sem Leite"
            />
          </Box>
          <Box>
            <Typography sx={{ mb: 3, mt: 3 }} variant="h5">
              Instruções de Cozinha
            </Typography>
            {recipe.cookInstructions.map(
              (
                recipeInstructions: { step: number; description: String },
                index: number
              ) => (
                <Box
                  sx={{ display: "flex", alignItems: "center", pb: 1 }}
                  key={index}
                >
                  {recipeInstructions.step}
                  <CustomTextField
                    sx={{ ml: 2 }}
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeRecipeInstructions(e, index)
                    }
                    label="Instrução de cozinha"
                    placeholder="Instrução de cozinha"
                    variant="outlined"
                    name="description"
                    value={recipeInstructions.description}
                  />
                </Box>
              )
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <AddCircleOutlineIcon
              sx={styles.addIcon}
              onClick={handleMoreSteps}
            />
          </Box>

          <Box>
            <Typography sx={{ mb: 3, mt: 3 }} variant="h5">
              Ingredientes
            </Typography>
            {recipeIngredients.map(
              (
                recipeIngredient: CreateNutritionistIngredientForRecipe,
                index: number
              ) => (
                <Box sx={styles.ingredientRow} key={index}>
                  <CustomTextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeRecipeIngredient(e, index)
                    }
                    label="Nome"
                    placeholder="Nome"
                    variant="outlined"
                    name="name"
                    value={recipeIngredient.name}
                    sx={{ flex: 1, mr: "35px" }}
                  />
                  <CustomTextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeRecipeIngredient(e, index)
                    }
                    label="Quantidade"
                    placeholder="Quantidade"
                    variant="outlined"
                    name="quantity"
                    value={recipeIngredient.quantity}
                    type="number"
                    sx={{ flex: 1, mr: "35px" }}
                  />
                  <FormControl sx={{ flex: 1, mr: "35px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Métrica
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={recipeIngredient.quantityMetric}
                      label="Métrica"
                      name="quantityMetric"
                      onChange={(e) => onChangeQuantityMetric(e, index)}
                      sx={styles.select}
                    >
                      <MenuItem value={"unit"}>Unidades</MenuItem>
                      <MenuItem value={"gr"}>Gramas</MenuItem>
                      <MenuItem value={"kg"}>Quilogramas</MenuItem>
                      <MenuItem value={"ml"}>Mililitros</MenuItem>
                      <MenuItem value={"lt"}>Litros</MenuItem>
                      <MenuItem value={"tablespoon"}>Colher de sopa</MenuItem>
                      <MenuItem value={"teaspoon"}>Colher de chá</MenuItem>
                      <MenuItem value={"coffeespoon"}>Colher de café</MenuItem>
                      <MenuItem value={"yourTaste"}>A gosto</MenuItem>
                      <MenuItem value={"clove"}>Dente de alho</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ flex: 1, mr: "35px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Condimento
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={recipeIngredient.is_condiment ? "yes" : "no"}
                      label="Condimento"
                      name="is_condiment"
                      onChange={(e) => onChangeIsCondiment(e, index)}
                      sx={styles.select}
                    >
                      <MenuItem value={"yes"}>Sim</MenuItem>
                      <MenuItem value={"no"}>Não</MenuItem>
                    </Select>
                  </FormControl>
                  <CancelButton
                    variant="contained"
                    onClick={() =>
                      onDeleteIngredient(index, recipeIngredient.id!)
                    }
                  >
                    Delete
                  </CancelButton>
                </Box>
              )
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <AddCircleOutlineIcon
                sx={styles.addIcon}
                onClick={handleMoreIngredient}
              />
            </Box>
          </Box>

          {searchparams.get("recipeId") ? (
            <PrimaryButton
              disabled={!isRecipeValid()}
              sx={styles.submitButton}
              onClick={onEditRecipe}
            >
              Editar receita
            </PrimaryButton>
          ) : (
            <PrimaryButton
              disabled={!isRecipeValid()}
              sx={styles.submitButton}
              onClick={onSubmitRecipe}
            >
              Adicionar receita
            </PrimaryButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default NutritionistAddRecipe;
