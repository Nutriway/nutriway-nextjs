export const styles = {
  pageWrapper: {
    padding: "10px 0",
    width: "100%",
  },

  appointmentInfo: {
    padding: "30px 40px 15px",
    display: "flex",
    justifyContent: "space-between",
  },

  clientInfo: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "no-wrap",
  },

  textFieldsRow: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
  },

  appointmentTextField: {
    margin: "0 10px 30px",
  },

  videoWrapper: {
    position: "relative",
    height: "240px",
    width: "750px",
    textAlign: "center",
  },

  expandedVideoWrapper: {
    textAlign: "center",
    zIndex: "100",

    position: "fixed",
    top: "90px",
    left: "20px",
    right: "20px",
    bottom: "4px",
  },

  videoButton: {
    backgroundColor: "rgb(250, 250, 250)",
    position: "absolute",
    top: "10px",
    left: "10px",
  },

  expandedVideoButton: {
    position: "absolute",
    top: "10px",
    left: "10px",
    backgroundColor: "rgb(250, 250, 250)",
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

  historyItemWrapper: {
    cursor: "pointer",
    marginTop: "4px",
    padding: "8px",
    width: "fit-content",
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",

    "&:hover": {
      backgroundColor: "whitesmoke",
    },
  },

  historyItemWrapperSelected: {
    cursor: "pointer",
    padding: "8px 16px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "4px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
  },

  select: {
    width: "fit-content",
    minWidth: "150px",
    marginBottom: "25px",
  },

  selectWrapper: {
    textAlign: "center",
  },

  stepperWrapper: {
    padding: "0px 60px",
    width: "90%",
  },

  finalStepWrapper: {
    padding: "30px 40px",
  },

  submitButton: {
    margin: "20px 0",
    float: "right",
  },
};
