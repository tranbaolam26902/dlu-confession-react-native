import { StyleSheet, Image, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {},
});

function IconButton({ icon, style, iconWidth, iconHeight, onPress }) {
    return (
        <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress}>
            <Image source={icon} style={{ width: iconWidth ? iconWidth : 28, height: iconHeight ? iconHeight : 28 }} />
        </TouchableOpacity>
    );
}

export default IconButton;
