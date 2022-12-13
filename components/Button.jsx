import { TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';

import GlobalStyles from '../assets/styles/GlobalStyles';

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        fontSize: 18,
        textAlign: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 16,
    },
    fluid: {
        alignSelf: 'stretch',
    },
    outline: {
        color: GlobalStyles.colors.accent,
        backgroundColor: GlobalStyles.colors.white,
        borderColor: GlobalStyles.colors.accent,
    },
    accent: {
        color: GlobalStyles.colors.primary,
        backgroundColor: GlobalStyles.colors.accent,
        borderColor: GlobalStyles.colors.accent,
    },
    text: {
        alignSelf: 'center',
        paddingVertical: 0,
        paddingHorizontal: 0,
        color: GlobalStyles.colors.secondary,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    textAccent: {
        color: GlobalStyles.colors.accent,
    },
});

function Button({ style, title, fluid, outline, accent, text, textAccent, onPress }) {
    return (
        <TouchableOpacity style={[!fluid ? styles.wrapper : null, style]} onPress={onPress}>
            <Text
                style={[
                    styles.button,
                    fluid ? styles.fluid : null,
                    outline ? styles.outline : null,
                    accent ? styles.accent : null,
                    text ? styles.text : null,
                    textAccent ? [styles.text, styles.textAccent] : null,
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
