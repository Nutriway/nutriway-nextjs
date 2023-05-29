import { pallete } from "../../../util/styles/pallete";

export const styles = {
  wrapper: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "20px 30px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    marginBottom: "4px",
  },

  stepperWrapper: {
    padding: "10px 60px 30px",
  },

  mealsWrapper: {
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "center",
  },

  header: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },

  nextStepButton: {
    color: pallete.colors.primaryColor,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  previousStepButton: {
    color: "#444445",

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  mealContainer: {
    margin: "15px 22px",
    display: "flex",
    flexDirection: "column",
  },

  deleteButton: {
    width: "fit-content",
    alignSelf: "center",
  },
};
