import React, {useState} from "react";
import {Box, Button, Checkbox, Typography} from "@mui/material";

const MOCK_DATA_RECIPES = [
  {
    id: 1,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 2,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 3,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 4,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 5,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 6,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 7,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 8,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 9,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 10,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 11,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
  {
    id: 12,
    image: "https://unsplash.com/photos/4qJlXK4mYzU",
    description: "lorem ipsum lorem ipsum lorem ipsu ",
    ingredients: "ingredients",
    checked: false,
  },
];

const ClientFavouriteRecipes = () => {
  const [recipes, setRecipes] = useState(MOCK_DATA_RECIPES);

  const handleSelectRecipe = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const { name } = event.target;

    let newRecipes = [...recipes];
    const recipeIndex = newRecipes.findIndex(
      (recipe) => recipe.id.toString() === name
    );

    newRecipes[recipeIndex].checked = checked;

    setRecipes(newRecipes);
  };

  const onConfirmRecipes = () => {
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography>Selecione as suas receitas preferidas</Typography>

      {recipes.map((recipe, index) => (
        <Box
          key={index}
          sx={{
            width: "750px",
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            border: "1px solid black",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <img
            alt={index.toString()}
            src={recipe.image}
            style={{ width: 200, height: 200 }}
          />
          <Box sx={{ width: 200, height: 100 }}>
            <Typography>{recipe.description}</Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography> {recipe.ingredients}</Typography>
          </Box>

          <Checkbox
            checked={recipe.checked}
            onChange={handleSelectRecipe}
            name={recipe.id.toString()}
          />
        </Box>
      ))}

      <Button onClick={onConfirmRecipes}>Confirmar</Button>
    </Box>
  );
};

export default ClientFavouriteRecipes;
