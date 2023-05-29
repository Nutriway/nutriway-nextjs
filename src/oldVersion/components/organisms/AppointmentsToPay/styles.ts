export const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
  },

  tableCell: {
    padding: "25px 40px",
  },

  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },

  expirationLabel: {
    fontSize: "12px",
    marginTop: "12px",
  },

  noAppointmentsLabel: {
    padding: "30px",
    textAlign: "center",
  },
};
