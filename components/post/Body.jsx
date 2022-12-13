import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import CategoryTag from '../CategoryTag';

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 4,
        marginBottom: 8,
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
    // Variables
    const navigation = useNavigation();
    return (
        <View style={styles.wrapper}>
            <View style={{ marginLeft: -4 }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode={'never'}
                    data={data.Categories}
                    renderItem={({ item }) => <CategoryTag data={item} />}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { data: data })}>
                <Text numberOfLines={2} style={[styles.text, styles.title]}>
                    {data.Title}
                </Text>
                <Text numberOfLines={4} style={styles.text}>
                    {data.Content}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Body;
