import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Modal, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../assets/styles/GlobalStyles';
import Button from '../components/Button';
import Input from '../components/Input';
import { useStore } from '../store';

const styles = StyleSheet.create({
    modalWrapper: {
        alignItems: 'center',
        marginTop: 120,
        marginHorizontal: 32,
        padding: 32,
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

function CreateCategoryScreen() {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [token, setToken] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [decription, setDecription] = useState('');

    // Variables
    const navigation = useNavigation();

    // Functions
    const getToken = async () =>
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);
        });

    const removeAccents = (str) =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');

    const getAlias = (name) => removeAccents(name).split(' ').join('-');

    const isValid = () => {
        if (categoryName === '') {
            setErrorMessage('Vui lòng điền tên danh mục!');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSave = () => {
        if (!isValid()) return;
        const data = {
            Name: categoryName,
            Alias: getAlias(categoryName),
            Description: decription,
            Active: true,
        };
        fetch(`${apiURL}/api/admcategory/create`, {
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
                navigation.goBack({data: response.data});
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
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <Pressable style={styles.body} onPress={() => Keyboard.dismiss()}>
                <Modal animationType='slide' transparent={true} visible={showModal}>
                    <View style={styles.modalWrapper}>
                        <Text style={styles.modalMessage}>Thêm danh mục thành công</Text>
                        <Button title='Đóng' accent fluid onPress={handleBack} />
                    </View>
                </Modal>
                {errorMessage !== '' ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <View style={styles.input}>
                    <Input
                        label='Tên danh mục'
                        style={{ marginBottom: 8 }}
                        blurOnSubmit={false}
                        returnKeyType='next'
                        value={categoryName}
                        setValue={setCategoryName}
                    />
                    <Input
                        label='Mô tả'
                        multiline
                        numberOfLines={10}
                        style={{ marginBottom: 8 }}
                        inputStyle={{ textAlignVertical: 'top' }}
                        value={decription}
                        setValue={setDecription}
                    />
                </View>
            </Pressable>
            <View style={styles.footer}>
                <Button title='Hủy' outline fluid style={styles.button} onPress={handleBack} />
                <Button title='Lưu' accent fluid style={styles.button} onPress={handleSave} />
            </View>
        </>
    );
}

export default CreateCategoryScreen;
