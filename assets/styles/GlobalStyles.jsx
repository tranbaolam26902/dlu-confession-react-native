import { StyleSheet } from 'react-native';

const colors = {
    primary: '#ffffff',
    accent: '#8DC27D',
    textColor: '#121212',
    black: '#000000',
    white: '#ffffff',
    background: '#f8f8f8',
    red: '#FF4154',
    secondary: '#6B6B6B',
    gray: '#A7A7B1',
};

const GlobalStyles = StyleSheet.create({
    textWhite: {
        color: colors.white,
    },
    textBlack: {
        color: colors.textColor,
    },
    textPrimary: {
        color: colors.primary,
    },
    textSecondary: {
        color: colors.secondary,
    },
    textAccent: {
        color: colors.accent,
    },
    textRed: {
        color: colors.red,
    },
    textGray: {
        color: colors.gray,
    },
    bgWhite: {
        backgroundColor: colors.white,
    },
    bgPrimary: {
        backgroundColor: colors.primary,
    },
    bgSecondary: {
        backgroundColor: colors.secondary,
    },
    bgAccent: {
        backgroundColor: colors.accent,
    },
    bgBackground: {
        backgroundColor: colors.background,
    },
    bgGray: {
        backgroundColor: colors.gray,
    },
});

export default GlobalStyles;
