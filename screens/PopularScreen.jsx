import { useState, useEffect } from 'react';
import { StyleSheet, RefreshControl, FlatList } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import HeaderBar from '../components/header';
import Post from '../components/post';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
});

function PopularScreen({ navigation, route }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);

    // Variables
    const { apiURL } = states;

    // Functions
    const getPopularPosts = () => {
        fetch(`${apiURL}/api/post/hotpost`)
            .then((response) => response.json())
            .then((response) => {
                setPosts(response);
                setRefreshing(false);
            });
    };
    const onRefresh = () => {
        setRefreshing(true);
        getPopularPosts();
    };

    useEffect(() => {
        getPopularPosts();
    }, []);

    return (
        <>
            <HeaderBar />
            <FlatList
                style={styles.wrapper}
                decelerationRate={'normal'}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={posts}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Post styles={styles.container} data={item} />}
            />
        </>
    );
}

export default PopularScreen;
