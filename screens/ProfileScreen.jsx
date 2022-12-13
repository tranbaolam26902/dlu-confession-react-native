import { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, RefreshControl, FlatList } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Post from '../components/post';
import ProfileSection from '../components/ProfileSection';
import Empty from '../components/Empty';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
});

function ProfileScreen({ route }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);
    const [userInformation, setUserInformation] = useState();

    // Variables
    const { apiURL } = states;

    // Functions
    const getUserInformation = () => {
        const formData = new FormData();
        formData.append('id', route.params.data.Id);
        fetch(`${apiURL}/api/Account/GetUserInfo`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                setUserInformation(response);
                getPersonalPosts(response.UserProfile.Id);
            });
    };
    const getPersonalPosts = (id) => {
        const formData = new FormData();
        formData.append('id', id);
        fetch(`${apiURL}/api/post/PostByUser`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                setPosts(response);
                setRefreshing(false);
            });
    };
    const onRefresh = () => {
        setRefreshing(true);
        getPersonalPosts(userInformation.UserProfile.Id);
    };

    useEffect(() => {
        getUserInformation();
    }, [route]);

    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <FlatList
                style={styles.wrapper}
                decelerationRate={'normal'}
                ListHeaderComponent={() => {
                    if (userInformation) return <ProfileSection data={userInformation} totalPosts={posts.length} />;
                }}
                ListEmptyComponent={() => <Empty text='Chưa có bài viết!' />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={posts}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Post styles={styles.container} data={item} />}
            />
        </>
    );
}

export default ProfileScreen;
