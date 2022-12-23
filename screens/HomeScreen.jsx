import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, View, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore, actions } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';
import icons from '../assets/icons';

import Post from '../components/post';
import HeaderBar from '../components/header';
import IconButton from '../components/IconButton';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        padding: 16,
        backgroundColor: GlobalStyles.colors.white,
    },
    avatar: {
        width: 40,
        height: 40,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    input: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 0.8,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.secondary,
        borderRadius: 16,
    },
    text: {
        fontSize: 16,
        color: GlobalStyles.colors.secondary,
    },
});

function HomeScreen({ navigation, route }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState([]);

    // Variables
    const { apiURL, avatarURL, userInformation } = states;

    // Functions
    const onRefresh = () => {
        setRefreshing(true);
        getPosts();
    };
    const getPosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                setPosts(responsePosts);
                setRefreshing(false);
            });
    };

    // Event handlers
    const handleCreatePost = () => {
        navigation.navigate('CreatePost');
    };

    useEffect(() => {
        getPosts();
    }, []);
    useEffect(() => {
        try {
            if (route.params.data) getPosts();
        } catch {}
    }, [route]);

    return (
        <>
            <HeaderBar />
            <FlatList
                style={styles.wrapper}
                decelerationRate={'normal'}
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                            <Image
                                source={{ uri: `${avatarURL}${userInformation.UserProfile.Avatar}` }}
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.input} onPress={handleCreatePost}>
                            <Text style={styles.text}>Bạn đang nghĩ gì?</Text>
                        </TouchableOpacity>
                        <IconButton icon={icons.addImage} onPress={handleCreatePost} />
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={posts}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Post styles={styles.container} data={item} />}
            />
        </>
    );
}

export default HomeScreen;
