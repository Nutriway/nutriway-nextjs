export const styles = {
  headerWrapper: {
    position: "sticky",
    top: "0px",
    zIndex: "1",
    display: "flex",
    flexDirection: "column",
  },

  filtersWrapper: {
    display: "flex",
    justifyContent: "space-between",
    boxShadow:
      "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.07)",
    borderRadius: "3px",
    backgroundColor: "white",
    padding: "20px",
    fontWeight: "bold",

    marginBottom: "10px",
  },

  visibleNutrientsFilters: {
    display: "block",
    marginBottom: "5px",
    width: "100%",
    position: "absolute",
    top: "282px",
  },

  invisibleNutrientsFilters: {
    display: "none",
    marginBottom: "5px",
  },

  openedFiltersMenu: {
    width: "100%",
    position: "absolute",
    top: "150px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  closedFiltersMenu: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  pagination: {
    alignSelf: "center",
  },

  checkboxes: {
    display: "flex",
    flexDirection: "column",
  },

  checkboxRow: {
    display: "flex",
  },

  checkbox: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },

  selectCount: {
    textAlign: "left",
    fontWeight: "bold",
  },

  recipesWrapper: {
    padding: "20px 0px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  mealTypesWrapper: {
    padding: "0",
  },

  checkboxesWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },

  searchInputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },

  addQuickRecipe: {
    position: "absolute",
    top: "208px",
    right: 0,
  },
};
