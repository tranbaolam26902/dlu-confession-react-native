import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import icons from '../../assets/icons';

import Body from './Body';
import Option from './Option';
import { useStore } from '../../store';
import { useEffect, useState } from 'react';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    avatar: {
        marginRight: 8,
        width: 48,
        height: 48,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    status: {
        marginVertical: 4,
        marginLeft: 18,
        width: 12,
        height: 12,
    },
    isRead: {
        backgroundColor: GlobalStyles.colors.white,
    },
});

function Notification({ data }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [token, setToken] = useState('');
    const [notification, setNotification] = useState(data);

    // Variables
    const navigation = useNavigation();
    const { apiURL, avatarURL } = states;

    // Functions
    const getToken = async () => {
        await AsyncStorage.getItem('@token', (error, item) => {
            setToken(item);
        });
    };
    const setNotificationStatus = () => {
        const formData = new FormData();
        formData.append('id', notification.Id);
        if (!notification.IsRead)
            fetch(`${apiURL}/api/UserNotify/ReadNotify`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => {
                    response.map((responseItem) => {
                        if (responseItem.Id === notification.Id) setNotification(responseItem);
                    });
                });
    };
    const showPost = () => {
        const formData = new FormData();
        formData.append('id', notification.PostId);
        fetch(`${apiURL}/api/post/getpostbyid`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                navigation.navigate('PostDetail', { data: response });
            });
    };

    // Event handlers
    const handlePress = () => {
        setNotificationStatus();
        showPost();
    };

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        setNotification(data);
    }, [data]);

    return (
        <Pressable style={[styles.wrapper, notification.IsRead ? null : styles.isRead]} onPress={handlePress}>
            <View>
                <Image source={{ uri: `${avatarURL}${notification.Avatar}` }} style={styles.avatar} />
                <Image
                    source={icons.notificationStatus}
                    style={[styles.status, { opacity: notification.IsRead ? 0 : 1 }]}
                />
            </View>
            <Body data={notification} />
            <Option />
        </Pressable>
    );
}

export default Notification;
