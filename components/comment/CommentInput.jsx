import { useEffect, useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../../store';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import icons from '../../assets/icons';

import Input from '../Input';
import IconButton from '../IconButton';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    avatar: {
        marginTop: 2,
        width: 40,
        height: 40,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    inputWrapper: {
        flex: 1,
        marginHorizontal: 8,
    },
    input: {
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 1.4,
        borderColor: GlobalStyles.colors.gray,
    },
    button: {
        alignSelf: 'flex-end',
        marginBottom: 6,
    },
});

function CommentInput({ data, setData }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's value
    const [token, setToken] = useState();
    const [comment, setComment] = useState('');

    // Variables
    const { apiURL, avatarURL, userInformation } = states;

    // Functions
    const getToken = async () =>
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);
        });
    const getPostById = (id) => {
        const formData = new FormData();
        formData.append('id', id);
        fetch(`${apiURL}/api/post/getpostbyid`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                setData(response);
            });
    };

    // Event handlers
    const handleComment = () => {
        if (comment === '') return;
        const formData = new FormData();
        formData.append(
            'comment',
            JSON.stringify({
                Content: comment,
                PostId: data.Id,
            }),
        );
        fetch(`${apiURL}/api/usercomment/create`, {
            method: 'POST',
            headers: {
                Authorization: token,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((response) => {
                getPostById(response.PostId);
                setComment('');
            });
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <View style={styles.wrapper}>
            <Image source={{ uri: `${avatarURL}${userInformation.UserProfile.Avatar}` }} style={styles.avatar} />
            <Input
                style={styles.inputWrapper}
                inputStyle={styles.input}
                placeholder={'B??nh lu???n v??? b??i vi???t...'}
                value={comment}
                setValue={setComment}
                multiline
            />
            <IconButton icon={icons.send} style={styles.button} onPress={handleComment} />
        </View>
    );
}

export default CommentInput;
