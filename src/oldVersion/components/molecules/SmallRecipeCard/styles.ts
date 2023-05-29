import { pallete } from "../../../util/styles/pallete";

export const styles = {
  recipeResume: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: "5px",
    width: "180px",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    margin: "5px",
  },

  recipeResumeSelectable: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    color: "rgba(0, 0, 0, 0.87)",
    marginBottom: "20px",
    width: "180px",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 18px",
    },
    margin: "5px",
  },

  recipeResumeSelected: {
    textAlign: "center",
    backgroundColor: "ligth-gray",
    borderRadius: "4px",
    boxShadow: "0px 1px 5px 2px rgba(83, 168, 50, 0.5)",
    color: "rgba(0, 0, 0, 0.9)",
    margin: "4px 4px 29px",
    width: "180px",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    cursor: "pointer",
    border: "1px solid rgba(83, 168, 50, 0.5)",
  },

  nutrient: {
    color: "#8b8b8b",
    fontFamily: "Roboto, sans-serif",
    fontSize: "12px",
    margin: "5px",
  },

  recipeTitle: {
    margin: "10px 0px",
    fontWeight: "bold",
  },

  recipeContainer: {
    width: "100%",
    height: "108px",
    backgroundColor: "rgb(240, 240, 240)",
  },

  recipeImage: {
    height: "100%",
  },

  detailsButton: {
    color: "white",
    backgroundColor: pallete.colors.secondaryColor,
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    marginTop: "7px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: "550",
    letterSpacing: "1.1px",
    lineHeight: "37px",
    padding: "0 8px",
    textAlign: "center",
    textTransform: "uppercase",

    "&:hover": {
      backgroundColor: pallete.colors.primaryColor,
    },
  },

  detailsButtonSelected: {
    color: "white",
    backgroundColor: "rgb(83, 168, 50)",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    marginTop: "7px",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    fontWeight: "550",
    letterSpacing: "1.1px",
    lineHeight: "37px",
    padding: "0 8px",
    textAlign: "center",
    textTransform: "uppercase",

    "&:hover": {
      backgroundColor: "rgb(83, 168, 50)",
    },
  },

  nutritionalFacts: {
    padding: "5px 15px",
    display: "flex",
    justifyContent: "space-around",
  },

  nutrifactsTitle: {
    textAlign: "left",
    fontWeight: "bold",
  },

  nutrientValue: {
    margin: "0",
    fontWeight: "bold",
  },
};
