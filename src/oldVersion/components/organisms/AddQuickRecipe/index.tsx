import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Switch,
  Typography,
} from "@mui/material";
import { useAuth } from "../../../providers/useAuth";
import { styles } from "./styles";
import PrimaryButton from "../../atoms/PrimaryButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  CreateNutritionistRecipeType,
  CreateNutritionistIngredientForRecipe,
  deleteIngredient,
  createNutritionistRecipe,
} from "../../../api/recipe";
import CancelButton from "../../atoms/CancelButton";
import CustomTextField from "../../atoms/CustomTextField";
import { Recipe } from "../../../util/recipes";

type AddQuickRecipeProps = {
  onRecipeAddition(newRecipe: Recipe): void;
};

const AddQuickRecipe = ({ onRecipeAddition }: AddQuickRecipeProps) => {
  const { user } = useAuth();
  const [quickRecipe, setQuickRecipe] = useState(true);

  const [open, setOpen] = useState(false);

  let activeStep = 1;
  const [recipe, setRecipe] = useState<CreateNutritionistRecipeType>({
    title: "",
    image: "",
    preparationTime: "",
    servings: 1,
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const addRecipe = async () => {
    if (quickRecipe) {
      onRecipeAddition({ id: -1, attributes: { ...recipe, valid: true } });
    }

    if (!quickRecipe && user) {
      const { data } = await createNutritionistRecipe(
        recipe,
        recipeIngredients,
        recipeIngredients.length > 0,
        user
      );

      onRecipeAddition(data);
    }
  };

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

  const handleQuickRecipeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuickRecipe(event.target.checked);
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

    newArr[index].description = value;
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

  const onChangeRecipeIngredientName = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    let newArr = [...recipeIngredients];

    newArr[index].name = value;

    setRecipeIngredients(newArr);
  };

  const onChangeRecipeIngredientQuantity = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    let newArr = [...recipeIngredients];

    newArr[index].quantity = parseInt(value);

    setRecipeIngredients(newArr);
  };

  const onChangeQuantityMetric = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const { value } = event.target;
    let newArr = [...recipeIngredients];

    newArr[index].quantityMetric = value;

    setRecipeIngredients(newArr);
  };

  const onChangeIsCondiment = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const { value } = event.target;
    let newArr = [...recipeIngredients];

    newArr[index].is_condiment = value === "yes";

    setRecipeIngredients(newArr);
  };

  const onAutocompleteChange = (
    e: React.SyntheticEvent<Element, Event>,
    values: string[]
  ) => {
    if (values) {
      setRecipe({ ...recipe, meal_type: values });
    }
  };

  const isRecipeValid = () => {
    return (
      recipe.title &&
      recipe.nutritional_summary &&
      recipe.nutritional_values &&
      recipe.meal_type &&
      recipe.difficulty &&
      recipe.servings
    );
  };

  return (
    <Box sx={styles.pageWrapper}>
      <AddCircleOutlineIcon sx={styles.addIcon} onClick={handleOpen} />

      <Modal open={open} onClose={handleClose}>
        <Box sx={!quickRecipe ? styles.modal : styles.quickRecipeModal}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">Nova receita</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={quickRecipe}
                  onChange={handleQuickRecipeChange}
                  name="quickRecipe"
                />
              }
              label="Receita rápida"
            />
          </Box>

          <Box sx={styles.formWrapper}>
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
                label="Tempo de Preparação (minutos)"
                placeholder="Preparacão"
                variant="outlined"
                name="preparationTime"
                value={recipe.preparationTime}
                sx={{ flex: 1, mr: "35px" }}
                type="number"
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
                <InputLabel id="demo-simple-select-label">
                  Dificuldade
                </InputLabel>
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
                type="number"
              />
              <CustomTextField
                onChange={onChangeRecipeCarbs}
                label="Hidratos de carbono (g)"
                placeholder="Hidratos de carbono"
                variant="outlined"
                name="nutritional_values.carbohydrate.portion"
                value={recipe.nutritional_values.carbohydrate.portion}
                sx={{ flex: 1, mr: "35px" }}
                type="number"
              />
              <CustomTextField
                onChange={onChangeRecipeProtein}
                label="Proteina (g)"
                placeholder="Proteina"
                variant="outlined"
                name="nutritional_values.protein.portion"
                value={recipe.nutritional_values.protein.portion}
                sx={{ flex: 1, mr: "35px" }}
                type="number"
              />
              <CustomTextField
                onChange={onChangeRecipeFat}
                label="Gordura (g)"
                placeholder="Gordura"
                variant="outlined"
                name="nutritional_values.fat.portion"
                value={recipe.nutritional_values.fat.portion}
                sx={{ flex: 1, mr: "35px" }}
                type="number"
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

            {!quickRecipe && (
              <Box>
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
                      recipeInstructions: { step: number; description: string },
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
                            onChangeRecipeIngredientName(e, index)
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
                            onChangeRecipeIngredientQuantity(e, index)
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
                            <MenuItem value={"tablespoon"}>
                              Colher de sopa
                            </MenuItem>
                            <MenuItem value={"teaspoon"}>
                              Colher de chá
                            </MenuItem>
                            <MenuItem value={"coffeespoon"}>
                              Colher de café
                            </MenuItem>
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
              </Box>
            )}
          </Box>
          <PrimaryButton
            sx={{ float: "right" }}
            onClick={addRecipe}
            disabled={!isRecipeValid()}
          >
            adicionar
          </PrimaryButton>
        </Box>
      </Modal>
    </Box>
  );
};
export default AddQuickRecipe;
