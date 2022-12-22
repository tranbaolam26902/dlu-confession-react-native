import { useEffect, useRef, useState } from 'react';
import { StyleSheet, StatusBar, View, Image, TouchableOpacity, Pressable, Keyboard, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore, actions } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Button from '../components/Button';
import Input from '../components/Input';

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: GlobalStyles.colors.background,
    },
    changeAvatar: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    changeAvatarText: {
        marginTop: 8,
    },
    error: {
        marginTop: -16,
        marginBottom: 16,
        fontSize: 16,
        fontStyle: 'italic',
        color: GlobalStyles.colors.red,
        textAlign: 'center',
    },
    input: {
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        paddingLeft: 0,
        backgroundColor: GlobalStyles.colors.white,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderTopColor: GlobalStyles.colors.gray0,
    },
    button: {
        flex: 1,
        marginLeft: 16,
    },
});

function EditProfileScreen() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL, userInformation } = states;

    // Component's states
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [avatar, setAvatar] = useState(`${avatarURL}${userInformation.UserProfile.Avatar}`);
    const [avatarData, setAvatarData] = useState({});
    const [nickname, setNickname] = useState(userInformation.UserProfile.NickName);
    const [description, setDescription] = useState(userInformation.UserProfile.Description);

    // Component's refs
    const descriptionRef = useRef();

    // Variables
    const navigation = useNavigation();

    // Functions
    const getToken = async () =>
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);
        });
    const isEdited = () => {
        if (
            avatar !== `${avatarURL}${userInformation.UserProfile.Avatar}` ||
            nickname !== userInformation.UserProfile.NickName ||
            description !== userInformation.UserProfile.Description
        )
            return true;
        return false;
    };
    const isValid = () => {
        if (nickname === '') {
            setErrorMessage('Tên hiển thị không được để trống!');
            return false;
        }
        return true;
    };
    const updateUserInformation = () => {
        fetch(`${apiURL}/api/useraccount/getinfo`, {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((responseUser) => {
                dispatch(actions.setUserInformation(responseUser));
            });
    };

    // Event handler
    const handleBack = () => {
        navigation.goBack();
    };
    const handleSave = () => {
        if (!isEdited) {
            handleBack();
            return;
        }
        if (!isValid()) return;
        const formData = new FormData();
        const data = {
            UserProfile: {
                Nickname: nickname,
                Description: description,
            },
        };
        formData.append('account', JSON.stringify(data));
        if (avatar !== `${avatarURL}${userInformation.UserProfile.Avatar}`) formData.append('file', avatarData);
        fetch(`${apiURL}/api/useraccount/UpdateAccount`, {
            method: 'POST',
            headers: {
                Authorization: token,
            },
            body: formData,
        }).then(() => {
            updateUserInformation();
            handleBack();
        });
    };
    const handleSelectAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.canceled) {
            let uri = 'file:///' + result.assets[0].uri.split('file:/').join('');
            setAvatar(result.assets[0].uri);
            setAvatarData({
                uri: uri,
                type: `${result.assets[0].type}/jpg`,
                name: uri.split('/').pop(),
            });
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <Pressable style={styles.body} onPress={() => Keyboard.dismiss()}>
                <View style={styles.changeAvatar}>
                    <TouchableOpacity onPress={handleSelectAvatar}>
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    </TouchableOpacity>
                    <Button
                        title='Đổi ảnh đại diện'
                        text
                        style={styles.changeAvatarText}
                        onPress={handleSelectAvatar}
                    />
                </View>
                {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <View style={styles.input}>
                    <Input
                        label='Tên hiển thị'
                        value={nickname}
                        setValue={setNickname}
                        style={{ marginBottom: 8 }}
                        blurOnSubmit={false}
                        returnKeyType='next'
                        onSubmitEditing={() => descriptionRef.current.focus()}
                    />
                    <Input label='Giới thiệu' ref={descriptionRef} value={description} setValue={setDescription} />
                </View>
            </Pressable>
            <View style={styles.footer}>
                <Button title='Hủy' outline fluid style={styles.button} onPress={handleBack} />
                <Button title='Lưu' accent fluid style={styles.button} onPress={handleSave} />
            </View>
        </>
    );
}

export default EditProfileScreen;
