import { pallete } from "../../../util/styles/pallete";

export const styles = {
  pageWrapper: {
    padding: "30px 60px",
  },

  recipeInfoWrapper: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "4px",
    padding: "25px 30px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    backgroundColor: "white",
    marginBottom: "4px",
  },

  firstRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "25px 0",
  },

  secondRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
  },

  ingredientRow: {
    display: "flex",
    marginTop: "8px",
    justifyContent: "space-between",
  },

  submitButton: {
    marginTop: "30px",
    alignSelf: "end",
  },

  addIcon: {
    color: pallete.colors.primaryColor,
    cursor: "pointer",
    fontSize: "45px",
  },

  select: {
    "& label.Mui-focused": {
      color: pallete.colors.primaryColor,
    },
    "& .MuiSelect-underline:after": {
      borderBottomColor: pallete.colors.primaryColor,
    },
    "& .MuiSelect-outlined": {
      borderBottomColor: pallete.colors.primaryColor,
    },
    "& .MuiSelect-root": {
      "&:hover fieldset": {
        borderColor: pallete.colors.primaryColor,
      },
      "&.Mui-focused fieldset": {
        borderColor: pallete.colors.primaryColor,
      },
    },
  },
};
