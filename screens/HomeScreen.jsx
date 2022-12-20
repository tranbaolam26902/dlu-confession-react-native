import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, StatusBar, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore, actions } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Post from '../components/post';
import HeaderBar from '../components/header';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
});

function HomeScreen({ route }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([]);

    // Variables
    const { apiURL } = states;

    // Functions
    const onRefresh = () => {
        setRefreshing(true);
        getPosts();
    };

    const getPosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                setData(responsePosts);
                setRefreshing(false);
            });
    };

    const setUserId = async () => {
        const token = await AsyncStorage.getItem('@token', (err, item) => {
            return item;
        });
        if (token) {
            fetch(`${apiURL}/api/useraccount/getinfo`, {
                headers: {
                    Authorization: token,
                },
            })
                .then((response) => response.json())
                .then(async (responseUser) => {
                    if (responseUser.Id) await AsyncStorage.setItem('@userId', responseUser.Id);
                    dispatch(actions.setUserInformation(responseUser));
                });
        }
    };

    useEffect(() => {
        getPosts();
        setUserId();
    }, []);

    useEffect(() => {
        try {
            if (route.params.data) getPosts();
        } catch {}
    }, [route]);

    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <HeaderBar />
            <FlatList
                style={styles.wrapper}
                decelerationRate={'normal'}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Post styles={styles.container} data={item} />}
            />
        </>
    );
}

export default HomeScreen;
