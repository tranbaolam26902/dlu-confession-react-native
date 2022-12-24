import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, RefreshControl, Pressable, View, Modal, Keyboard } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import HeaderBar from '../components/header';
import Empty from '../components/Empty';
import Button from '../components/Button';
import ButtonModal from '../components/BottomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
    title: {
        padding: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
    },
    categoryHeader: {
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    categoryItem: {
        marginHorizontal: 16,
        marginBottom: 8,
        padding: 16,
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.4,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    modalWrapper: {
        padding: 16,
        marginHorizontal: 32,
        width: '90%',
        backgroundColor: GlobalStyles.colors.white,
        borderRadius: 20,
    },
    categoryText: {
        fontSize: 16,
    },
    buttonCreate: {
        padding: 16,
    },
    footer: {
        flexDirection: 'row',
        paddingLeft: 0,
        backgroundColor: GlobalStyles.colors.white,
        borderTopColor: GlobalStyles.colors.gray0,
    },
    button: {
        flex: 1,
    },
    buttonSave: {
        marginLeft: 16,
    },
    modalMessage: {
        marginBottom: 8,
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
    error: {
        marginBottom: 8,
        fontSize: 16,
        fontStyle: 'italic',
        color: GlobalStyles.colors.red,
        textAlign: 'center',
    },
});

function CategoryScreen({ navigation, route }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [showBottonModal, setShowBottonModal] = useState(false);

    // Functions
    const getToken = async () =>
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);
        });
    const getCategories = () => {
        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((response) => {
                setCategories(response);
                setRefreshing(false);
            });
    };
    const getUserInformation = async () => {
        const token = await AsyncStorage.getItem('@token', (err, item) => {
            return item;
        });
        fetch(`${apiURL}/api/useraccount/getinfo`, {
            method: 'GET',
            headers: {
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setRoles(response.RoleTemps);
            });
    };
    const onRefresh = () => {
        setRefreshing(true);
        getCategories();
    };
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

    // Event handlers
    const handlePress = (e, category) => {
        navigation.navigate('PostsByCategory', {
            data: category,
        });
    };
    const handleCreate = () => {
        setShowBottonModal(!showBottonModal);
        setErrorMessage('');
        setCategoryName('');
    };
    const handleSave = () => {
        if (!isValid()) return;
        const data = {
            Name: categoryName,
            Alias: getAlias(categoryName),
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
                getCategories();
                setShowBottonModal(false);
            }
            if (response.status === 400) {
                response.json().then((response) => {
                    setErrorMessage(response.ModelState.Error[0]);
                });
            }
        });
    };
    const handleCancel = () => {
        setShowBottonModal(false);
    };

    // Component's Effects
    useEffect(() => {
        getUserInformation();
        getCategories();
        getToken();
    }, []);

    return (
        <>
            <HeaderBar />
            <ScrollView
                style={styles.wrapper}
                decelerationRate={'normal'}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.categoryHeader}>
                    <Text style={styles.title}>Chọn danh mục</Text>
                    {roles && roles.includes('Manager') ? (
                        <View style={styles.buttonCreate}>
                            <Button title='Thêm danh mục' text onPress={handleCreate} />
                        </View>
                    ) : null}
                </View>
                {categories.length !== 0 ? (
                    categories.map((category) => (
                        <Pressable
                            key={category.Id}
                            style={styles.categoryItem}
                            onPress={(e) => handlePress(e, category)}
                        >
                            <Text style={styles.categoryText}>{category.Name}</Text>
                        </Pressable>
                    ))
                ) : (
                    <Empty text='Chưa có danh mục!' />
                )}
            </ScrollView>
            <ButtonModal showModal={showBottonModal} setShowModal={setShowBottonModal}>
                <View style={styles.modalWrapper}>
                    <Pressable onPress={() => Keyboard.dismiss()}>
                        {errorMessage !== '' ? <Text style={styles.error}>{errorMessage}</Text> : null}
                        <View style={styles.input}>
                            <Input
                                label='Tên danh mục'
                                style={{ marginBottom: 16 }}
                                blurOnSubmit={false}
                                returnKeyType='next'
                                value={categoryName}
                                setValue={setCategoryName}
                            />
                        </View>
                    </Pressable>
                    <View style={styles.footer}>
                        <Button title='Hủy' outline fluid style={styles.button} onPress={handleCancel} />
                        <Button
                            title='Tạo'
                            accent
                            fluid
                            style={[styles.button, styles.buttonSave]}
                            onPress={handleSave}
                        />
                    </View>
                </View>
            </ButtonModal>
        </>
    );
}

export default CategoryScreen;
