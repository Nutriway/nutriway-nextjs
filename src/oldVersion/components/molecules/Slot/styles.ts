import { pallete } from "../../../util/styles/pallete";

export const styles = {
  availableSlot: {
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: pallete.colors.secondaryColor,
    height: "fit-content",
    borderRadius: "3px",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.45)",
    },
  },
  unavailableSlot: {
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#ededed",
    height: "fit-content",
    borderRadius: "3px",
    textAlign: "center",
    alignItems: "center",
    cursor: "pointer",
    opacity: 0.5,
  },
  tentativeSlot: {
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#DCCF10",
    height: "fit-content",
    borderRadius: "3px",
    textAlign: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  mobileModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 150,
    height: 360,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 4,
    pr: 4,
    pl: 4,
    pb: 0,
  },
  mobilePersonalInformationModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 225,
    height: 360,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 4,
    pr: 4,
    pl: 4,
    pb: 0,
    overflow: "hidden",
    overflowY: "scroll",
  },
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 280,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },

  personalInformationModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "hidden",
    overflowY: "scroll",
  },

  stepContentWrapper: {
    paddingTop: "5px",
    paddingBottom: "0px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },

  modalFooter: {
    position: "absolute",
    bottom: "10px",
  },

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

  sendEmailButton: {
    marginTop: "10px",
  },
  sendEmailButtonMobile: {
    marginTop: "10px",
    marginRight: "2px",
    fontSize: "10px",
    width: "75px",
    height: "30px",
  },

  cancelEmailButton: {
    marginTop: "10px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    height: "fit-content",
    backgroundColor: pallete.colors.primaryColor,
    cursor: "pointer",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    letterSpacing: "1.2px",
    lineHeight: "45px",
    padding: "0 25px",
    textAlign: "center",
    textTransform: "uppercase",
    width: "fit-content",
    fontWeight: 550,

    "&:hover": {
      backgroundColor: pallete.colors.primaryColor,
    },
  },
  cancelEmailButtonMobile: {
    marginTop: "10px",
    color: "white",
    border: "none",
    borderRadius: "4px",
    backgroundColor: pallete.colors.primaryColor,
    cursor: "pointer",
    fontFamily: "Roboto, sans-serif",
    fontSize: "10px",
    letterSpacing: "1.2px",
    lineHeight: "25px",
    padding: "0 25px",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: 200,
    marginLeft: "2px",
    width: "75px",
    height: "30px",

    "&:hover": {
      backgroundColor: pallete.colors.primaryColor,
    },
  },
};