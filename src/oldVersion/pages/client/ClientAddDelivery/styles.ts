import { pallete } from "../../../util/styles/pallete";

export const styles = {
  addressWrapper: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
  },

  nutritionalInputs: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  input: {
    // width: "fit-content",
    //  margin: "10px 10px",
    mt: "10px",
    mb: "10px",
  },
  submitbutton: {
    alignSelf: "end",
  },
  modalFooter: {},

  nextStepButton: {
    position: "relative",
    right: "0",
    color: pallete.colors.primaryColor,

    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  previousStepButton: {
    position: "relative",
    left: "0",
    color: "#444445",

    "&:hover": {
      backgroundColor: "transparent",
    },
  },
};
