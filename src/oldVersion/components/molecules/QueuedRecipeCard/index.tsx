import React from "react";
import { Typography, Box } from "@mui/material";
import { styles } from "./styles";
import { Recipe } from "../../../util/recipes";

const QueuedRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const getRecipeTitle = () => {
    return recipe.attributes.title.length > 12
      ? recipe.attributes.title.slice(0, 12) + "..."
      : recipe.attributes.title;
  };

  return (
    <Box sx={styles.recipeResume}>
      <Box>
        <Typography
          title={recipe.attributes.title}
          variant="caption"
          sx={styles.recipeTitle}
        >
          {getRecipeTitle()}
        </Typography>

        <Box
          component="img"
          src={recipe.attributes.image || "https://picsum.photos/200"}
          alt="recipe"
          sx={styles.recipeImage}
        />
      </Box>
    </Box>
  );
};

export default QueuedRecipeCard;
