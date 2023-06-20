import { pallete } from '../../../util/styles/pallete';

export const styles = {
    submitbutton: {
        border: 'none',
        borderRadius: '4px',
        height: 'fit-content',
        color: 'white',
        backgroundColor: `${pallete.colors.primaryColor}!important`,
        cursor: 'pointer',
        fontFamily: 'Roboto, sans-serif',
        fontSize: '14px',
        letterSpacing: '1.2px',
        lineHeight: '45px',
        padding: '0 25px',
        textAlign: 'center',
        textTransform: 'uppercase',
        width: 'fit-content',
        fontWeight: 550,

        '&:hover': {
            backgroundColor: pallete.colors.primaryColor,
        },
    },
};
