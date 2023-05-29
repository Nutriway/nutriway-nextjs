import { pallete } from "../../../util/styles/pallete";

export const styles = {
  pageWrapper: {
    display: "flex",
    alignItems: "center",
    padding: "30px 20px",
    justifyContent: "center",
  },

  dateHeader: {
    display: "flex",
    alignItems: "center",
    padding: "20px 40px",
  },

  selectorWrapper: {
    width: "100%",
    margin: "0 30px",
  },

  dateFooter: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 0",
    width: "100%",
  },

  deleteButton: {
    margin: "0 20px",
  },

  unselectedTableCell: {
    border: `1px solid #b7f0c1`,
    backgroundColor: "#b7f0c1",
    width: "100%",
    height: "30px",
    borderRadius: "3px",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.45)",
    },
  },

  selectedTableCell: {
    backgroundColor: pallete.colors.secondaryColor,
    width: "100%",
    height: "30px",
    borderRadius: "3px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.45)",
    },
  },

  AppointmentTableCell: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "13px",
    backgroundColor: pallete.colors.primaryColor,
    color: "white",
    width: "100%",
    height: "30px",
    borderRadius: "3px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.45)",
    },
  },

  rowTitle: {
    textAlign: "center",
    padding: "5px",
  },

  todaysRowTitle: {
    padding: "5px",
    textAlign: "center",
    backgroundColor: pallete.colors.primaryColor,
    color: "white",
  },
};
