import { pallete } from '../../../util/styles/pallete';

export const styles = {
    planCardResume: {
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow:
            '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '5px 5px 30px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
    },

    planCardResumeSelectable: {
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: '4px',
        boxShadow:
            '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        color: 'rgba(0, 0, 0, 0.87)',
        margin: '5px 5px 30px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        cursor: 'pointer',

        '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 18px',
        },
    },

    planCardResumeSelected: {
        textAlign: 'center',
        backgroundColor: 'ligth-gray',
        borderRadius: '4px',
        boxShadow: `0px 2px 5px 3px ${pallete.colors.secondaryColor}`,
        color: 'rgba(0, 0, 0, 0.9)',
        margin: '4px 4px 29px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        cursor: 'pointer',
        border: `1px solid ${pallete.colors.secondaryColor}`,
    },

    nutrient: {
        color: '#8b8b8b',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        margin: '5px',
    },

    planCardTitle: {
        margin: '15px 6px 20px',
        fontWeight: 'bold',
    },

    planCardImage: {
        width: '100%',
        height: 'auto',
    },

    detailsButton: {
        color: 'white',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        marginTop: '15px',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '550',
        letterSpacing: '1.1px',
        lineHeight: '37px',
        padding: '0 8px',
        textAlign: 'center',
        textTransform: 'uppercase',
        backgroundColor: pallete.colors.primaryColor,

        '&:hover': {
            backgroundColor: pallete.colors.primaryColor,
        },
    },

    detailsButtonSelected: {
        color: 'white',
        backgroundColor: 'rgb(83, 168, 50)',
        border: 'none',
        borderRadius: '2px',
        cursor: 'pointer',
        marginTop: '15px',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '550',
        letterSpacing: '1.1px',
        lineHeight: '37px',
        padding: '0 8px',
        textAlign: 'center',
        textTransform: 'uppercase',

        '&:hover': {
            backgroundColor: 'rgb(83, 168, 50)',
        },
    },

    nutritionalFacts: {
        padding: '5px 15px',
        display: 'flex',
        justifyContent: 'space-around',
    },

    nutrifactsTitle: {
        margin: '15px 18px 10px',
        textAlign: 'left',
        fontWeight: 'bold',
    },

    nutrientValue: {
        margin: '0',
        fontWeight: 'bold',
    },
};

export const getStyles = (isSelected: boolean, isEditable: boolean) => {
    if (isSelected) return styles.planCardResumeSelected;

    if (isEditable) return styles.planCardResume;

    if (!isEditable) return styles.planCardResumeSelectable;
};
