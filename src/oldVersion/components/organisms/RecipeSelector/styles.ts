import { pallete } from "../../../util/styles/pallete";

export const styles = {
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1100,
    height: 850,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "scroll",
    padding: "0.5px 25px 15px 25px",
  },

  modalHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    justifyContent: "center",
  },

  recipesWrapper: {
    textAlign: "center",
  },

  addMealButton: {
    backgroundColor: "whitesmoke",
    height: "auto",
    width: "fit-content",
    border: "1px solid gray",
    borderStyle: "dashed",
    color: "gray",

    "&:hover": {
      backgroundColor: pallete.colors.secondaryColor,
      color: "white",
    },
  },
};
