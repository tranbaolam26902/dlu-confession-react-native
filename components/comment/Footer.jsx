import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../Button';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
    },
    time: {
        marginLeft: 8,
        marginTop: 1,
        fontSize: 14,
    },
});

function Footer({ data }) {
    const [date, setDate] = useState('');

    const convertDate = (date) => {
        const temp = date.split('-');
        const year = temp[0];
        const month = temp[1];
        const day = temp[2].split('T')[0];
        return `${day} tháng ${month}, ${year}`;
    };

    useEffect(() => {
        setDate(convertDate(data.PostTime));
    }, []);

    return (
        <View style={styles.wrapper}>
            <Button title='Phản hồi' text />
            <Text style={styles.time}>{date}</Text>
        </View>
    );
}

export default Footer;
