import { pallete } from "../../../util/styles/pallete";

export const styles = {
  appointmentFormWrapper: {
    padding: "30px 40px",
    textAlign: "center",
  },

  appointmentNotesField: {
    margin: "0 10px 0 20px",
    width: "550px",
  },

  appointmentInfo: {
    textAlign: "left",
    padding: "20px 0 40px",
    display: "flex",
    justifyContent: "space-between",
  },

  appointmentDate: {
    marginTop: "20px",
  },

  appointmentMeetingUrl: {
    marginTop: "5px",
  },

  appointmentHistoryWrapper: {
    padding: "0 10px",
    width: "fit-content",
  },

  appointmentHistoryButton: {
    width: "350px",
    backgroundColor: "rgb(32, 155, 196)",
    color: "white",
  },

  nutrientHistoryWrapper: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  nutrient: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 5px",
  },

  historyItemWrapper: {
    border: "1px solid whitesmoke",
    cursor: "pointer",
    padding: "8px 16px",
    width: "100%",

    "&:hover": {
      backgroundColor: "whitesmoke",
    },
  },

  historyItemWrapperSelected: {
    cursor: "pointer",
    padding: "8px 16px",
    width: "100%",
    backgroundColor: "whitesmoke",
  },

  formColumns: {
    display: "flex",
  },

  leftColumn: {
    width: " 100%",
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "15px 0px 15px 50px",
  },

  formSubtitle: {
    textAlign: "left",
    fontWeight: "bold",
    paddingBottom: "10px",
  },

  form: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "20px 30px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    marginBottom: "4px",
  },

  formItem: {
    display: "flex",
    padding: "15px 0",
    alignItems: "center",
  },

  slider: {
    color: pallete.colors.primaryColor,
    margin: "0 30px",
  },

  autocompleteWrapper: {
    width: "100%",
  },

  checkboxes: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },

  buttonWrapper: {
    width: "100%",
    textAlign: "right",
  },

  autocompleteLabel: {
    margin: "0",
    textAlign: "left",
    fontWeight: "bold",
  },

  autocomplete: {
    padding: "20px 15px",
  },
};
