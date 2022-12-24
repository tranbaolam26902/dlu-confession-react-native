import { StyleSheet, Image, Pressable, View, TouchableOpacity } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import icons from '../../assets/icons';

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    button: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.background,
        borderRadius: 999,
    },
});

function Option({ data }) {
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.button}>
                <Image source={icons.optionHorizontal} />
            </TouchableOpacity>
        </View>
    );
}

export default Option;
