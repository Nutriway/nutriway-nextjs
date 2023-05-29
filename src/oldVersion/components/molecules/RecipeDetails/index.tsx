import React from "react";
import { Typography, Box } from "@mui/material";
import { styles } from "./styles";
import { Ingredient, Recipe, renderMealType, renderQuantityMetric } from "../../../util/recipes";

type RecipeDetailsProps = {
  recipe: Recipe;
}
const RecipeDetails = ({ recipe }: RecipeDetailsProps) => {

  const renderCookInstructions = (instructions: {step:number,description:String}[]) => {
    if (instructions.length > 0) {
      return (
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          m: 1,
        }}>
          {instructions.map((i:{step:number,description:String}, index: number) => (
            <Box key={index}>
              {i.step + ":  " + i.description}
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  }

  return (
    <Box>
      <Box sx={styles.informationWrapper}>
        <Typography variant="body1" sx={styles.recipeTitle}>
          {recipe.attributes.title}
        </Typography>
        <Box sx={
          {
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
          }
        }>
          <Box sx={{ textAlign: "left", width: "350px" }}>
            Tipo de refeição: {recipe.attributes.meal_type ? renderMealType(recipe.attributes.meal_type) : "Sem informação"} <br /><br />
            Tempo de confeção: {recipe.attributes.preparationTime ? recipe.attributes.preparationTime : "Sem informações."} <br /><br />
            Custo de refeição: Sem informações. <br /><br />
            Doses: {recipe.attributes.servings ? recipe.attributes.servings : "Sem informações."}<br /><br />
          </Box>
          <Box
            component="img"
            src={recipe.attributes.image || "https://picsum.photos/200"}
            sx={styles.recipeImage}
          ></Box>
          <Box sx={{ textAlign: "right", width: "350px" }}>
            {recipe.attributes.diets.includes("Vegan") && (
              <Box
                component="img"
                src="../../../../images/vegan.svg"
                sx={{ width: "60px" }}
              ></Box>)} <br></br>
            {recipe.attributes.diets.includes("Vegetariana") && (
              <Box
                component="img"
                src="../../../../images/vegetarian.svg"
                sx={{ width: "60px" }}
              ></Box>)}<br></br>
            {recipe.attributes.diets.includes("Sem glúten") && (
              <Box
                component="img"
                src="../../../../images/glutenfree.svg"
                sx={{ width: "60px" }}
              ></Box>)}
          </Box>

        </Box>
      </Box>

      <Box sx={styles.ingredientsWrapper}>
        <Typography variant="body1" sx={styles.recipeTitle}>
          Ingredientes
        </Typography>
        <Box sx={
          {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            m: 1,
          }
        }>
          {recipe.attributes.nutritionist_recipe_ingredients ?
            recipe.attributes.nutritionist_recipe_ingredients.data.map((r: Ingredient, index: number) => (<Box key={index}>
              {index + 1 + ":  " + r.attributes.name + ", " + r.attributes.quantity + " " + renderQuantityMetric(r.attributes.quantity_metric)}
            </Box>)) : 
            (recipe.attributes.api_recipe_ingredients ?
              recipe.attributes.api_recipe_ingredients.data.map((r: Ingredient, index: number) => (<Box>
                {index + 1 + ":  " + r.attributes.name + ", " + r.attributes.quantity + " " + renderQuantityMetric(r.attributes.quantity_metric)}
              </Box>)) : "Sem informações.")}
        </Box>
      </Box>


      <Box sx={styles.preparationWrapper}>
        <Typography variant="body1" sx={styles.recipeTitle}>
          Modo de Preparação
        </Typography>
        <Box sx={
          {
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            m: 1,
          }
        }>
          {recipe.attributes.cookInstructions ? renderCookInstructions(recipe.attributes.cookInstructions) : "Sem informações."}
        </Box>
      </Box>

      <Box sx={styles.observationsWrapper}>
        <Typography variant="body1" sx={styles.recipeTitle}>
          Observações:
        </Typography>
        <Box sx={{
          margin: "15px 6px 20px",
        }}>{/*recipe.attributes.observations ? recipe.attributes.observations:*/  "Sem informações."}</Box>
      </Box>

    </Box>
  );
};

export default RecipeDetails;
