import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, StatusBar, Text, View, RefreshControl } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Post from '../components/post';
import HeaderBar from '../components/header';
import images from '../assets/images';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

function HomeScreen() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;
    const [data, setData] = useState([]);
    const [token, setToken]= useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Component's states
    const [refreshing, setRefreshing] = useState(false);

    // Functions
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        let time = new Date();
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                let time = new Date() - time;
                setData(responsePosts);
            });
        wait(time).then(() => setRefreshing(false));
    }, []);

    const getPosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                setData(responsePosts);
            });
    };

    const setUsers = async () => {
        const getToken = await AsyncStorage.getItem('@token', (err, item) => {
            return(item);
        });
        if (getToken) {
            fetch(`${apiURL}/api/useraccount/getinfo`, {
                headers: {
                    Authorization: getToken,
                },
            })
                .then((response) => response.json())
                .then( async (responseUser) => {
                    if (responseUser.Id) {
                        await AsyncStorage.setItem('@userId', responseUser.Id);
                    } else setErrorMessage(responseUser.Message);
                });
        }
    };

    useEffect(() => {
        getPosts();
        setUsers();                     
    }, []);



    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <HeaderBar />
            <FlatList
                style={styles.wrapper}
                decelerationRate={'normal'}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Post styles={styles.container} data={item} />}
            />
        </>
    );
}

export default HomeScreen;
