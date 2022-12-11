import { StyleSheet, View, Text } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import Option from './Option';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 4,
    },
    body: {
        flexShrink: 1,
        marginRight: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: GlobalStyles.colors.background,
        borderRadius: 16,
    },
    title: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
});

function Body({ data }) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.body}>
                <Text style={[styles.text, styles.title]}>{data.NickName}</Text>
                <Text style={styles.text}>{data.Content}</Text>
            </View>
            <Option data={data} />
        </View>
    );
}

export default Body;
