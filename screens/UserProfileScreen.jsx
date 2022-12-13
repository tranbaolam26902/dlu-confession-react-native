import { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, RefreshControl, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import HeaderBar from '../components/header';
import Post from '../components/post';
import ProfileSection from '../components/ProfileSection';
import Empty from '../components/Empty';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
});

function UserProfile() {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);

    // Variables
    const { apiURL, userInformation } = states;

    // Functions
    const getPersonalPosts = async () => {
        await AsyncStorage.getItem('@userId', (err, item) => {
            const formData = new FormData();
            formData.append('id', item);
            fetch(`${apiURL}/api/post/PostByUser`, {
                method: 'POST',
                body: formData,
            })
                .then((response) => response.json())
                .then((response) => {
                    setPosts(response);
                    setRefreshing(false);
                });
        });
    };
    const onRefresh = () => {
        setRefreshing(true);
        getPersonalPosts();
    };

    useEffect(() => {
        getPersonalPosts();
    }, []);

    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <HeaderBar />
            <FlatList
                style={styles.wrapper}
                decelerationRate={'normal'}
                ListHeaderComponent={() => <ProfileSection canEdit data={userInformation} totalPosts={posts.length} />}
                ListEmptyComponent={() => <Empty text='Chưa có bài viết!' />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={posts}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Post styles={styles.container} data={item} />}
            />
        </>
    );
}

export default UserProfile;
