export const styles = {
    baseBox: {
        display: 'flex',
        justifyContent: 'center',
        mt: "20px",
        mr: "10%",
        ml: "10%",
        backgroundColor: "white",
        borderRadius: "4px",
        padding: "20px 30px",
        boxShadow:
            "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    },

    columnBox: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'column',
    },

    firstRow: {
        display: "flex",
        justifyContent: "space-evenly",
        width: "800px",
        padding: "15px",
    },

    secondRow: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        width: "800px",
        padding: "15px",
        textAlign: "left"
    },

    thirdRow: {
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        width: "800px",
        padding: "15px",
        textAlign: "left"
    },

    recipeImage: {
        maxWidth: " 320px",
        maxHeight: "230px",
        borderRadius: "5px",
        flexGrow:"1",
        display:"flex"
    },
    recipeTitle: {
        margin: "15px 6px 20px",
        fontWeight: "bold",

    },
    videoButton: {
        color: "white",
        marginTop: "15px",
    }
};
