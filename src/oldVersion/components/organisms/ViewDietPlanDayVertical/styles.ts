import { pallete } from "../../../util/styles/pallete";

export const styles = {
  pageWrapper: {},

  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "10px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    marginBottom: "4px",
    width: "220px",
  },

  stepperWrapper: {
    padding: "10px 60px 30px",
  },

  mealsWrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
  },

  header: {
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "0",
    backgroundColor: "white",
    zIndex: "1",
  },

  footer: {
    display: "flex",
    width: "100%",
    justifyContent: "end",
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
    margin: "10px 0 10px",
    display: "flex",
    flexDirection: "column",
  },

  fadedMealContainer: {
    margin: "10px 0 10px",
    display: "flex",
    flexDirection: "column",
    opacity: "0.3",
  },

  deleteButton: {
    width: "fit-content",
    alignSelf: "center",
  },
};
