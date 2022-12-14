import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Pressable, Keyboard, Text, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Button from '../components/Button';
import Input from '../components/Input';
import CustomModal from '../components/CustomModal';

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalWrapper: {
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 64,
        backgroundColor: GlobalStyles.colors.white,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalMessage: {
        marginBottom: 8,
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
    body: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: GlobalStyles.colors.background,
    },
    error: {
        marginBottom: 8,
        fontSize: 16,
        fontStyle: 'italic',
        color: GlobalStyles.colors.red,
        textAlign: 'center',
    },
    input: {
        width: '100%',
    },
    passwordRequires: {
        marginTop: 16,
    },
    inquire: {
        fontSize: 16,
        fontStyle: 'italic',
        color: GlobalStyles.colors.secondary,
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

function ChangePasswordScreen() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [token, setToken] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Component's refs
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    // Variables
    const navigation = useNavigation();

    // Functions
    const getToken = async () =>
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);
        });
    const isValid = () => {
        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            setErrorMessage('Vui l??ng ??i???n ?????y ????? th??ng tin!');
            return false;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage('M???t kh???u kh??ng tr??ng kh???p!');
            return false;
        }
        if (currentPassword === newPassword) {
            setErrorMessage('M???t kh???u m???i ph???i kh??c v???i m???t kh???u hi???n t???i!');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    // Event handler
    const handleBack = () => {
        navigation.goBack();
    };
    const handleSave = () => {
        if (!isValid()) return;
        const data = {
            OldPassword: currentPassword,
            NewPassword: newPassword,
            ConfirmPassword: confirmPassword,
        };
        fetch(`${apiURL}/api/Account/ChangePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status === 200) {
                setErrorMessage('');
                setShowModal(true);
            }
            if (response.status === 400) {
                response.json().then((response) => {
                    setErrorMessage(response.ModelState.Error[0]);
                });
            }
        });
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <>
            <Pressable style={styles.body} onPress={() => Keyboard.dismiss()}>
                <CustomModal showModal={showModal} setShowModal={setShowModal}>
                    <View style={styles.modalWrapper}>
                        <Text style={styles.modalMessage}>?????i m???t kh???u th??nh c??ng!</Text>
                        <Button title='????ng' accent fluid onPress={handleBack} />
                    </View>
                </CustomModal>
                {errorMessage !== '' ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <View style={styles.input}>
                    <Input
                        label='M???t kh???u hi???n t???i'
                        secureTextEntry
                        value={currentPassword}
                        setValue={setCurrentPassword}
                        style={{ marginBottom: 8 }}
                        blurOnSubmit={false}
                        returnKeyType='next'
                        onSubmitEditing={() => newPasswordRef.current.focus()}
                    />
                    <Input
                        label='M???t kh???u m???i'
                        secureTextEntry
                        ref={newPasswordRef}
                        value={newPassword}
                        setValue={setNewPassword}
                        style={{ marginBottom: 8 }}
                        blurOnSubmit={false}
                        returnKeyType='next'
                        onSubmitEditing={() => confirmPasswordRef.current.focus()}
                    />
                    <Input
                        label='Nh???p l???i m???t kh???u m???i'
                        secureTextEntry
                        ref={confirmPasswordRef}
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                    />
                    <View style={styles.passwordRequires}>
                        <Text style={styles.inquire}>* M???t kh???u ph???i c?? ??t nh???t 06 k?? t???</Text>
                        <Text style={styles.inquire}>* M???t kh???u ph???i c?? ??t nh???t 01 ch??? s???</Text>
                        <Text style={styles.inquire}>* M???t kh???u ph???i c?? ??t nh???t 01 ch??? c??i th?????ng</Text>
                    </View>
                </View>
            </Pressable>
            <View style={styles.footer}>
                <Button title='H???y' outline fluid style={styles.button} onPress={handleBack} />
                <Button title='L??u' accent fluid style={styles.button} onPress={handleSave} />
            </View>
        </>
    );
}

export default ChangePasswordScreen;
