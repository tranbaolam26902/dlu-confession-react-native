import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import GlobalStyles from '../assets/styles/GlobalStyles';

const styles = StyleSheet.create({
    wrapper: {
        margin: 4,
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: GlobalStyles.colors.white,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        shadowRadius: 16,
        elevation: 2,
    },
    text: {
        fontSize: 14,
        color: GlobalStyles.colors.secondary,
    },
});

function CategoryTag({ data }) {
    // Variables
    const navigation = useNavigation();

    // Functions
    const handleShowPosts = () => {
        navigation.navigate('PostsByCategory', { data: data });
    };

    return (
        <TouchableOpacity style={styles.wrapper} onPress={handleShowPosts}>
            <Text style={styles.text}>{data.Name}</Text>
        </TouchableOpacity>
    );
}

export default CategoryTag;
