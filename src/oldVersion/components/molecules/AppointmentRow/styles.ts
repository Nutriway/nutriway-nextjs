export const styles = {
  tableRow: {},

  mobileTableActionsCell: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  mobileTableCell: {},
  tableCell: {
    padding: "30px 40px",
  },

  infoModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },

  editModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 420,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },

  deleteModal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },

  editModalFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deleteModalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: "20px",
  },

  formField: {
    margin: "20px 0",
  },
};
