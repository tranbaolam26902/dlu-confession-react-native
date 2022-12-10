import { useRef, useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';
import images from '../assets/images';

import Button from '../components/Button';
import Input from '../components/Input';

function SignInScreen({ navigation }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Component's refs
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    // Functions
    const isValidSignInData = () => {
        if (username === '' || password === '') {
            setErrorMessage('Vui lòng điền đầy đủ thông tin!');
            return false;
        }
        setErrorMessage('');
        return true;
    };
    const signIn = () => {
        fetch(`${apiURL}/token`, {
            method: 'POST',
            body: `grant_type=password&username=Admin&password=Admin#123`,
        })
            .then((response) => response.json())
            .then(async (response) => {
                if (response.access_token) {
                    await AsyncStorage.setItem('@token', response.access_token);
                    navigation.replace('MainScreen');
                } else setErrorMessage(response.error_description);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // Event handlers
    const handleSignIn = () => {
        // if (!isValidSignInData()) return;
        Keyboard.dismiss();
        signIn();
    };
    const handleSwitch = () => {
        setErrorMessage('');
        setUsername('');
        setPassword('');
        navigation.navigate('SignUp');
    };

    return (
        <Pressable style={styles.wrapper} onPress={Keyboard.dismiss}>
            <Image style={styles.logo} source={images.logo} />
            <Text style={styles.title}>ĐĂNG NHẬP</Text>
            {errorMessage !== '' ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
            <Input
                ref={usernameInputRef}
                style={{ marginBottom: 8 }}
                label='Tên đăng nhập'
                value={username}
                setValue={setUsername}
                blurOnSubmit={false}
                returnKeyType='next'
                onSubmitEditing={() => passwordInputRef.current.focus()}
            />
            <Input
                ref={passwordInputRef}
                label='Mật khẩu'
                secureTextEntry
                value={password}
                setValue={setPassword}
                onSubmitEditing={handleSignIn}
            />
            <Button style={{ marginVertical: 16 }} title='Đăng nhập' fluid accent onPress={handleSignIn} />
            <View style={styles.forgotPassword}>
                <Button title='Quên mật khẩu?' text />
            </View>
            <View style={styles.divider}></View>
            <View style={styles.createAccount}>
                <Text style={styles.text}>Chưa có tài khoản?</Text>
                <Button title='Đăng ký' textAccent onPress={handleSwitch} />
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
        marginBottom: 48,
        fontSize: 24,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
        textAlign: 'center',
    },
    errorMessage: {
        marginBottom: 24,
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

export default SignInScreen;
