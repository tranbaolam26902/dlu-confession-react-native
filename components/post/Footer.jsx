import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../../store';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import icons from '../../assets/icons';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    text: {
        color: GlobalStyles.colors.secondary,
    },
    isLiked: {
        color: GlobalStyles.colors.accent,
    },
});

function Footer({ data }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [isLiked, setIsLiked] = useState(false);
    const [post, setPost] = useState([]);
    const [token, setToken] = useState('');

    // Variables
    const { apiURL } = states;
    const navigation = useNavigation();

    // Functions
    const getToken = async () => {
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);
        });
    };
    const getUserId = async () => {
        const userId = await AsyncStorage.getItem('@userId', (err, item) => {
            return item;
        });
        if (userId) {
            data.PostLikes.map((item) => {
                if (item.UserID === userId) {
                    setIsLiked(true);
                    return;
                }
            });
        }
    };

    // Event handlers
    const handleLike = () => {
        if (getToken()) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/userpost/like`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formData,
            })
                .then((response) => response.json())
                .then((post) => {
                    setIsLiked(!isLiked);
                    setPost(post);
                });
        }
    };

    useEffect(() => {
        getToken();
        getUserId();
        setPost(data);
    }, [data]);

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={styles.action}
                onPress={() => {
                    navigation.push('PostDetail', { data: post });
                }}
            >
                <Image source={icons.comment} />
                <Text style={[styles.text, { marginLeft: 4 }]}>{post.TotalCmt}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={handleLike}>
                {isLiked ? <Image source={icons.voteActive} /> : <Image source={icons.vote} />}
                <Text style={[styles.text, isLiked ? styles.isLiked : null]}>{post.Like}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Footer;
