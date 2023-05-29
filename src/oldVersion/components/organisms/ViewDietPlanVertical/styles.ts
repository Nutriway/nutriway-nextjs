import { pallete } from "../../../util/styles/pallete";

export const styles = {
  pageWrapper: {
    padding: "0px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },

  wrapper: {
    textAlign: "left",
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "20px 30px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    marginBottom: "4px",
  },

  columns: {
    display: "flex",
    justifyContent: "space-between",
  },

  mealsWrapper: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },

  modalFooter: {
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

  finishButton: {
    alignSelf: "end",
    marginTop: "25px",
  },
};
