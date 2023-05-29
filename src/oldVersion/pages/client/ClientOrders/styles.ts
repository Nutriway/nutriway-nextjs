export const styles = {
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  tableCell: {
    padding: "25px 40px",
  },
  payedCell: {
    padding: "25px 40px",
    backgroundColor: "#a5d6a7",
    width: 10,
    height:45
  },
  cancelledCell: {
    padding: "25px 40px",
    backgroundColor: '#ef9a9a',
    width: 10,
    height:45
  },
  waitingCell: {
    padding: "25px 40px",
    backgroundColor: '#fff59d',
    width: 10,
    height:45
  },
  modalTitle: {
    fontSize: 22,
    pb: 4,
  },
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  stateCell: {
    padding: "25px 40px",
    width: 100
  },
};
