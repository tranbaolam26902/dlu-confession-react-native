import { StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';

const styles = StyleSheet.create({
    wrapper: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.gray0,
        borderRadius: 999,
    },
});

function HeaderButton({ style, icon, onPress}) {
    return (
        <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
            <Image source={icon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
    );
}

export default HeaderButton;
