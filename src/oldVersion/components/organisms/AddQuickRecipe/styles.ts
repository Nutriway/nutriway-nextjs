import { pallete } from "../../../util/styles/pallete";

export const styles = {
  pageWrapper: {
    padding: "20px 0",
  },

  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    height: 750,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    padding: "30px",
  },

  quickRecipeModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1100,
    height: 330,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    padding: "30px",
  },

  formWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  firstRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "40px 0 20px",
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
