import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, StatusBar, RefreshControl, View, Image, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore, actions } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Post from '../components/post';
import HeaderBar from '../components/header';
import IconButton from '../components/IconButton';
import icons from '../assets/icons';

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
    const [data, setData] = useState([]);
    const [avatar, setAvatar] = useState('');

    // Variables
    const { apiURL, avatarURL } = states;

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
                    setAvatar(responseUser.UserProfile.Avatar);
                });
        }
    };

    // Event handlers
    const handleCreatePost = () => {
        navigation.navigate('CreatePost');
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
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                            <Image source={{ uri: `${avatarURL}${avatar}` }} style={styles.avatar} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.input} onPress={handleCreatePost}>
                            <Text style={styles.text}>Bạn đang nghĩ gì?</Text>
                        </TouchableOpacity>
                        <IconButton icon={icons.addImage} onPress={handleCreatePost} />
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <Post styles={styles.container} data={item} />}
            />
        </>
    );
}

export default HomeScreen;
