import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, RefreshControl, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import HeaderBar from '../components/header';
import Notification from '../components/notification';
import Button from '../components/Button';
import Empty from '../components/Empty';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
    },
});

function NotificationScreen() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState();

    // Functions
    const getToken = async () => {
        await AsyncStorage.getItem('@token', (error, item) => {
            setToken(item);
        });
    };
    const getNotifications = () => {
        if (token)
            fetch(`${apiURL}/api/UserNotify/index`, {
                headers: {
                    Authorization: token,
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    setNotifications(response);
                });
    };

    // Event handlers
    const onRefresh = async () => {
        setRefreshing(true);
        fetch(`${apiURL}/api/UserNotify/index`, {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setNotifications(response);
                setRefreshing(false);
            });
    };
    const handleReadAll = () => {
        fetch(`${apiURL}/api/UserNotify/ReadAll`, {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((responseNotifications) => {
                setNotifications(responseNotifications);
            });
    };

    useEffect(() => {
        getToken();
        getNotifications();
    }, [token]);

    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <HeaderBar />
            <FlatList
                style={styles.wrapper}
                decelerationRate={'normal'}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={notifications}
                renderItem={({ item }) => <Notification data={item} />}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <Text style={styles.title}>Thông báo</Text>
                        <Button title='Đánh dấu tất cả là đã đọc' text onPress={handleReadAll} />
                    </View>
                )}
                ListEmptyComponent={() => <Empty text='Không có thông báo nào gần đây' />}
            />
        </>
    );
}

export default NotificationScreen;
