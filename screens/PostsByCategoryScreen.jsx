import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { useStore } from '../store';

import GlobalStyles from '../assets/styles/GlobalStyles';

import Post from '../components/post';
import Empty from '../components/Empty';

function PostsByCategoryScreen({ route }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);

    // Variables
    const { apiURL } = states;

    // Functions
    const getPostsByCategory = () => {
        const formData = new FormData();
        formData.append('id', route.params.data.Id);
        fetch(`${apiURL}/api/post/FindPostCategory`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responsePosts) => {
                setPosts(responsePosts);
            });
    };
    const onRefresh = () => {
        setRefreshing(true);
        const formData = new FormData();
        formData.append('id', route.params.data.Id);
        fetch(`${apiURL}/api/post/FindPostCategory`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((responsePosts) => {
                setPosts(responsePosts);
                setRefreshing(false);
            });
    };

    useEffect(() => {
        getPostsByCategory();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.background }}>
            {posts.length !== 0 ? (
                <FlatList
                    decelerationRate={'normal'}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    data={posts}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => <Post data={item} />}
                />
            ) : (
                <Empty text='Chưa có bài viết thuộc danh mục này!' />
            )}
        </View>
    );
}

export default PostsByCategoryScreen;
