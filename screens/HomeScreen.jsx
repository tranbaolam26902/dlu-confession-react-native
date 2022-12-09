import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, StatusBar, Text, View, RefreshControl } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import PostModal from '../components/post';
import HeaderBar from '../components/header';

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
    }
    
    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
          <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
          <HeaderBar />
          <FlatList
            style={styles.wrapper}
            decelerationRate={'normal'}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
                <PostModal styles={styles.container} data={item} />
            )}
          />
            <ScrollView
                
            >
            </ScrollView>
        </>
      );

export default HomeScreen;
