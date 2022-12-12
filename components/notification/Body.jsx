import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        color: GlobalStyles.colors.secondary,
    },
    content: {
        fontSize: 16,
        color: GlobalStyles.colors.secondary,
    },
});

function Body({ data }) {
    const [date, setDate] = useState('');

    const convertDate = (date) => {
        const temp = date.split('-');
        const year = temp[0];
        const month = temp[1];
        const day = temp[2].split('T')[0];
        return `${day} tháng ${month}, ${year}`;
    };

    useEffect(() => {
        setDate(convertDate(data.NotifyDate));
    }, []);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>{date}</Text>
            <Text style={styles.content} numberOfLines={3}>
                <Text style={[styles.content, { fontWeight: 'bold' }]}>{data.NotifyName}</Text>
                {data.Description}
            </Text>
        </View>
    );
}

export default Body;
