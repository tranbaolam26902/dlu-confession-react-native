import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

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
    // Variables
    const navigation = useNavigation();
    const route = useRoute();

    // Event handlers
    const handleNavigate = () => {
        if (route.name !== 'Profile') navigation.push('Profile', { data: { Name: data.NickName, Id: data.AccountId } });
        else navigation.navigate('Profile', { data: { Name: data.NickName, Id: data.AccountId } });
    };
    return (
        <View style={styles.wrapper}>
            <View style={styles.body}>
                <TouchableOpacity onPress={handleNavigate}>
                    <Text style={[styles.text, styles.title]}>{data.NickName}</Text>
                </TouchableOpacity>

                <Text style={styles.text}>{data.Content}</Text>
            </View>
            <Option data={data} />
        </View>
    );
}

export default Body;
