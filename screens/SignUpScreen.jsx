import { useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore, actions } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';
import images from '../assets/images';

import Button from '../components/Button';
import Input from '../components/Input';

function SignUpScreen({ navigation }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Component's refs
    const emailInputRef = useRef();
    const usernameInputRef = useRef();
    const nicknameInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    // Functions
    const isValidSignUpData = () => {
        if (email === '' || username === '' || nickname === '' || password === '' || confirmPassword === '') {
            setErrorMessage('Vui lòng điền đầy đủ thông tin!');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Mật khẩu xác thực không trùng khớp!');
            return false;
        }
        setErrorMessage('');
        return true;
    };
    const signIn = () => {
        fetch(`${apiURL}/token`, {
            method: 'POST',
            body: `grant_type=password&username=${username}&password=${password}`,
        })
            .then((response) => response.json())
            .then(async (response) => {
                if (response.access_token) {
                    const token = 'bearer ' + response.access_token;
                    await AsyncStorage.setItem('@token', token);
                    fetch(`${apiURL}/api/useraccount/getinfo`, {
                        headers: {
                            Authorization: token,
                        },
                    })
                        .then((response) => response.json())
                        .then((responseUser) => {
                            dispatch(actions.setUserInformation(responseUser));
                        })
                        .then(() => {
                            navigation.replace('MainScreen');
                        });
                } else setErrorMessage(response.error_description);
            });
    };
    const signUp = () => {
        const signUpData = {
            Email: email,
            UserName: username,
            NickName: nickname,
            Password: password,
            ConfirmPassword: confirmPassword,
        };
        fetch(`${apiURL}/api/Account/Register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.ModelState) {
                    setErrorMessage(response.ModelState.Error[0]);
                    return;
                } else signIn();
            });
    };

    // Event handlers
    const handleSignUp = () => {
        if (!isValidSignUpData()) return;
        Keyboard.dismiss();
        signUp();
    };
    const handleSwitch = () => {
        setErrorMessage('');
        setEmail('');
        setUsername('');
        setNickname('');
        setPassword('');
        setConfirmPassword('');
        navigation.goBack();
    };

    return (
        <Pressable style={styles.wrapper} onPress={Keyboard.dismiss}>
            <Image style={styles.logo} source={images.logo} />
            <Text style={styles.title}>ĐĂNG KÝ</Text>
            {errorMessage !== '' ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Input
                ref={emailInputRef}
                style={{ marginBottom: 8 }}
                label='Email'
                value={email}
                setValue={setEmail}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={() => usernameInputRef.current.focus()}
            />
            <Input
                ref={usernameInputRef}
                style={{ marginBottom: 8 }}
                label='Tên đăng nhập'
                value={username}
                setValue={setUsername}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={() => nicknameInputRef.current.focus()}
            />
            <Input
                ref={nicknameInputRef}
                style={{ marginBottom: 8 }}
                label='Tên hiển thị'
                value={nickname}
                setValue={setNickname}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <Input
                ref={passwordInputRef}
                style={{ marginBottom: 8 }}
                label='Mật khẩu'
                secureTextEntry
                value={password}
                setValue={setPassword}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
            />
            <Input
                ref={confirmPasswordInputRef}
                style={{ marginBottom: 8 }}
                label='Nhập lại mật khẩu'
                secureTextEntry
                value={confirmPassword}
                setValue={setConfirmPassword}
                onSubmitEditing={handleSignUp}
            />
            <Button style={{ marginVertical: 16 }} title='Đăng ký' fluid accent onPress={handleSignUp} />
            <View style={styles.divider}></View>
            <View style={styles.createAccount}>
                <Text style={styles.text}>Đã có tài khoản?</Text>
                <Button title='Đăng nhập' textAccent onPress={handleSwitch} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: GlobalStyles.colors.background,
    },
    logo: {
        alignSelf: 'center',
    },
    title: {
        marginTop: 16,
        marginBottom: 32,
        fontSize: 24,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
        textAlign: 'center',
    },
    errorMessage: {
        marginBottom: 16,
        fontSize: 16,
        color: GlobalStyles.colors.red,
        textAlign: 'center',
    },
    forgotPassword: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    divider: {
        marginVertical: 16,
        height: 1,
        backgroundColor: '#A7A7B1',
    },
    createAccount: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        marginRight: 4,
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
});

export default SignUpScreen;
