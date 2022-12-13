import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useStore } from '../../store';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import icons from '../../assets/icons';

import IconButton from '../IconButton';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    information: {
        flex: 1,
        marginHorizontal: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.textColor,
    },
    date: {
        fontSize: 12,
        color: GlobalStyles.colors.secondary,
    },
    option: {
        alignSelf: 'center',
    },
});

function Header({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { avatarURL } = states;

    // Component's states
    const [date, setDate] = useState('');

    // Variables
    const navigation = useNavigation();
    const route = useRoute();

    // Functions
    const convertDate = (date) => {
        const temp = date.split('-');
        const year = temp[0];
        const month = temp[1];
        const day = temp[2].split('T')[0];
        return `${day} tháng ${month}, ${year}`;
    };

    // Event handlers
    const handleNavigate = () => {
        if (route.name !== 'Profile')
            navigation.push('Profile', { data: { Name: data.NickName, Id: data.PostHistories[0].AccountId } });
        else navigation.navigate('Profile', { data: { Name: data.NickName, Id: data.PostHistories[0].AccountId } });
    };

    useEffect(() => {
        setDate(convertDate(data.CreatedTime));
    }, []);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={handleNavigate}>
                <Image source={{ uri: `${avatarURL}${data.Avatar}` }} style={styles.avatar} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigate} style={styles.information}>
                <Text style={styles.name}>{data.NickName}</Text>
                <Text style={styles.date}>{date}</Text>
            </TouchableOpacity>
            <IconButton icon={icons.optionVertical} style={styles.option} />
        </View>
    );
}

export default Header;
