export const styles = {
  paymentMethodsWrapper: {
    padding: "8px 0px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    overflowX: "auto",
  },

  paymentMethod: {
    display: "flex",
    flexDirection: "column",
    padding: "2px 15px",
    margin: "0px 25px",
    justififyContent: "center",
    alignItems: "center",
    width: "fit-content",
    height: "auto",
    borderRadius: "3px",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.45)",
    },

    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "#1976d2",
    },
  },

  mbwayInfoWrapper: {},

  mbwayForm: {
    padding: "8px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mbwayMobileForm: {
    padding: "8px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
