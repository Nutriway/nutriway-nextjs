import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { styles } from "./styles";
import { Search, Tune } from "@mui/icons-material";
import CustomCheckbox from "../../atoms/CustomCheckbox";
import {
  Diets,
  filterRecipes,
  MealTypes,
  Nutrients,
  Recipe,
  Recipe as RecipeType,
  RecipeSources,
} from "../../../util/recipes";
import usePagination from "../../../util/pagination/pagination";
import CustomFormControl from "../../atoms/CustomOutlinedInput";
import CustomPagination from "../../atoms/CustomPagination";
import NutrientsFilters from "../../molecules/NutrientsFilters";
import NoBackgroundButton from "../../atoms/NoBackgroundButton";
import SmallRecipeCard from "../../molecules/SmallRecipeCard";
import RecipeCard from "../../molecules/RecipeCard";
import AddQuickRecipe from "../AddQuickRecipe";

type RecipesListProps = {
  recipes: Recipe[];
  mainCourses?: number;
  handleSelectedRecipe?(recipe: Recipe): void;
};

function RecipesList({
  recipes,
  handleSelectedRecipe,
  mainCourses,
}: RecipesListProps) {
  const [recipeSources, setRecipeSources] = useState<RecipeSources>({
    nutritionistRecipes: false,
    suggestedRecipes: false,
  });
  const [mealTypes, setMealTypes] = useState<MealTypes>({
    breakfast: false,
    mainCourse: false,
    others: false,
    snack: false,
    drinks: false,
    entreesAndAccompaniments: false,
    soup: false,
  });
  const [diets, setDiets] = useState<Diets>({
    vegetarian: false,
    vegan: false,
    dairyFree: false,
    glutenFree: false,
  });
  const [nutrients, setNutrients] = useState<Nutrients>();
  const [searchInput, setSearchInput] = useState("");
  const [visibleFilters, setVisibleFilters] = useState(false);

  let [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const handlePageChange = (e: ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleSelection = (recipe: Recipe) => {
    if (handleSelectedRecipe) handleSelectedRecipe(recipe);
  };

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const onMealTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const { name } = e.target;

    setMealTypes({ ...mealTypes, [name]: checked });
  };

  const onDietChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const { name } = e.target;

    setDiets({ ...diets, [name]: checked });
  };

  const onRecipeSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const { name } = e.target;

    setRecipeSources({ ...recipeSources, [name]: checked });
  };

  const filteredRecipes = filterRecipes(
    recipes,
    recipeSources,
    mealTypes,
    diets,
    searchInput,
    nutrients
  );

  const count = Math.ceil(filteredRecipes.length / PER_PAGE);
  const _DATA = usePagination(filteredRecipes, PER_PAGE);

  return (
    <Box>
      {recipes && (
        <Box>
          <Box sx={styles.headerWrapper}>
            <Box sx={styles.filtersWrapper}>
              <Box sx={styles.checkboxesWrapper}>
                Fonte
                <Box sx={styles.checkboxes}>
                  <Box sx={styles.checkbox}>
                    <CustomCheckbox
                      onChange={(e) => onRecipeSourceChange(e)}
                      name="nutritionistRecipes"
                    />
                    <Typography>Nutricionista</Typography>
                  </Box>
                  <Box sx={styles.checkbox}>
                    <CustomCheckbox
                      onChange={(e) => onRecipeSourceChange(e)}
                      name="suggestedRecipes"
                    />
                    <Typography>Sugeridas</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={styles.checkboxesWrapper}>
                Tipo de receita
                <Box sx={styles.checkboxes}>
                  <Box sx={styles.checkboxRow}>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onMealTypeChange(e)}
                        name="breakfast"
                      />
                      <Typography>Pequeno-almoço</Typography>
                    </Box>

                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onMealTypeChange(e)}
                        name="snack"
                      />
                      <Typography>Snack</Typography>
                    </Box>
                  </Box>

                  <Box sx={styles.checkboxRow}>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onMealTypeChange(e)}
                        name="mainCourse"
                      />
                      <Typography>Prato principal</Typography>
                    </Box>

                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onMealTypeChange(e)}
                        name="drinks"
                      />
                      <Typography>Bebidas</Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.checkboxRow}>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onMealTypeChange(e)}
                        name="entreesAndAccompaniments"
                      />
                      <Typography>Acompanhamentos</Typography>
                    </Box>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onMealTypeChange(e)}
                        name="soup"
                      />
                      <Typography>Sopa</Typography>
                    </Box>
                  </Box>
                  <Box sx={styles.checkboxRow}>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onMealTypeChange(e)}
                        name="others"
                      />
                      <Typography>Outro</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={styles.checkboxesWrapper}>
                Dieta
                <Box sx={styles.checkboxes}>
                  <Box sx={styles.checkboxRow}>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onDietChange(e)}
                        name="vegetarian"
                      />
                      <Typography>Vegetariana</Typography>
                    </Box>

                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onDietChange(e)}
                        name="vegan"
                      />
                      <Typography>Vegan</Typography>
                    </Box>
                  </Box>

                  <Box sx={styles.checkboxRow}>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onDietChange(e)}
                        name="dairyFree"
                      />
                      <Typography>Lactose free</Typography>
                    </Box>
                    <Box sx={styles.checkbox}>
                      <CustomCheckbox
                        onChange={(e) => onDietChange(e)}
                        name="glutenFree"
                      />
                      <Typography>Glúten free</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={styles.searchInputWrapper}>
                <CustomFormControl sx={{ width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="searchMealType">Pesquisar</InputLabel>
                  <OutlinedInput
                    id="searchMealType"
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="search" edge="end">
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="search..."
                    onChange={onChangeKeyword}
                    value={searchInput}
                  />
                </CustomFormControl>
                <NoBackgroundButton
                  onClick={() => setVisibleFilters(!visibleFilters)}
                  endIcon={<Tune />}
                >
                  Filtros
                </NoBackgroundButton>
              </Box>
            </Box>
            <Box
              sx={
                visibleFilters
                  ? styles.visibleNutrientsFilters
                  : styles.invisibleNutrientsFilters
              }
            >
              <NutrientsFilters
                onNutrientsSubmition={(nutrients) => {
                  setNutrients(nutrients);
                  setVisibleFilters(false);
                }}
              />
            </Box>
            <CustomPagination
              sx={styles.pagination}
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />

            <Box sx={styles.addQuickRecipe}>
              <AddQuickRecipe onRecipeAddition={handleSelection} />
            </Box>

            {mainCourses !== undefined && mainCourses > 4 && (
              <Typography
                sx={{ mt: 3, mb: 1, fontWeight: "bold" }}
                variant="subtitle1"
              >
                É aconselhável que não selecione mais pratos principais.
              </Typography>
            )}
          </Box>

          {recipes && (
            <Box>
              {mainCourses !== undefined ? (
                <Box sx={styles.recipesWrapper}>
                  {_DATA.currentData().map((r: RecipeType, index: number) => {
                    return (
                      <SmallRecipeCard
                        isSelectable={
                          mainCourses > 4
                            ? !r.attributes.meal_type.includes(
                                "Prato Principal"
                              )
                            : true
                        }
                        key={index}
                        recipe={r}
                        changeSelection={handleSelection}
                        allowMainCourses={!(mainCourses > 4)}
                      />
                    );
                  })}
                </Box>
              ) : (
                <Box sx={styles.recipesWrapper}>
                  {_DATA.currentData().map((r: RecipeType, index: number) => {
                    return (
                      <RecipeCard
                        key={index}
                        recipe={r}
                        changeSelection={handleSelection}
                        isEditable={true}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default RecipesList;
