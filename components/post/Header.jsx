import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import icons from '../../assets/icons';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import { useStore } from '../../store';

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

    // Component's useState
    const [date, setDate] = useState('');

    // Functions
    const convertDate = (date) => {
        const temp = date.split('-');
        const year = temp[0];
        const month = temp[1];
        const day = temp[2].split('T')[0];
        return `${day} tháng ${month}, ${year}`;
    };

    // Component's useEffect
    useEffect(() => {
        setDate(convertDate(data.CreatedTime));
    }, []);

    return (
        <View style={styles.wrapper}>
            <Image source={{ uri: `${avatarURL}${data.Avatar}` }} style={styles.avatar} />
            <View style={styles.information}>
                <Text style={styles.name}>{data.NickName}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <IconButton icon={icons.optionVertical} style={styles.option} />
        </View>
    );
}

export default Header;
