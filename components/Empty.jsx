import { StyleSheet, Image, Text, View } from 'react-native';

import GlobalStyles from '../assets/styles/GlobalStyles';
import images from '../assets/images';

const styles = StyleSheet.create({
    empty: {
        marginTop: 8,
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        color: GlobalStyles.colors.secondary,
    },
});

function Empty({ text }) {
    return (
        <View>
            <Image source={images.empty} style={{ alignSelf: 'center' }} />
            <Text style={styles.empty}>{text}</Text>
        </View>
    );
}

export default Empty;
