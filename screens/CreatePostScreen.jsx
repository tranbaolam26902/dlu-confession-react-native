import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Button from '../components/Button';
import Input from '../components/Input';

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 16,
        backgroundColor: GlobalStyles.colors.background,
    },
    label: {
        paddingLeft: 16,
        marginBottom: 4,
        fontSize: 16,
        color: GlobalStyles.colors.secondary,
    },
    input: {
        marginBottom: 8,
    },
    dropdown: {
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
        backgroundColor: GlobalStyles.colors.background,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.secondary90,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    dropdownItem: {
        paddingHorizontal: 16,
        fontSize: 16,
    },
    dropdownItemSelected: {
        fontWeight: 'bold',
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

function CreatePostScreen({ navigation }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [token, setToken] = useState('');
    const [open, setOpen] = useState(false);
    const [categoryIds, setCategoryIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Variables
    const { apiURL } = states;

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
            });
    };

    // Event handlers
    const handleCreate = () => {
        const formData = new FormData();
        const postData = {
            Title: title,
            Content: content,
            SelectedCategories: categoryIds,
        };
        formData.append('Post', JSON.stringify(postData));
        fetch(`${apiURL}/api/userpost/create`, {
            method: 'POST',
            headers: {
                Authorization: token,
            },
            body: formData,
        }).then(() => {
            navigation.navigate('Home', { data: true });
        });
    };

    useEffect(() => {
        getToken();
        getCategories();
    }, []);

    return (
        <>
            <ScrollView style={styles.body} nestedScrollEnabled={true}>
                <Text style={styles.label}>Danh mục</Text>
                <DropDownPicker
                    schema={{ label: 'Name', value: 'Id' }}
                    mode='BADGE'
                    multiple={true}
                    placeholder='Chọn danh mục'
                    open={open}
                    style={[styles.input, styles.dropdown]}
                    badgeDotColors={[GlobalStyles.colors.accent]}
                    dropDownContainerStyle={styles.dropdownContainer}
                    listItemLabelStyle={styles.dropdownItem}
                    selectedItemLabelStyle={styles.dropdownItemSelected}
                    setOpen={setOpen}
                    items={categories}
                    setItems={setCategories}
                    value={categoryIds}
                    setValue={setCategoryIds}
                    listMode='MODAL'
                    modalTitle='Chọn danh mục'
                    modalTitleStyle={{ marginLeft: 16 }}
                />
                <Input label='Tiêu đề' value={title} style={styles.input} setValue={setTitle} />
                <Input
                    label='Nội dung'
                    multiline
                    numberOfLines={10}
                    style={styles.input}
                    inputStyle={{ textAlignVertical: 'top' }}
                    value={content}
                    setValue={setContent}
                />
            </ScrollView>
            <View style={styles.footer}>
                <Button title='Hủy' outline fluid style={styles.button} onPress={() => navigation.goBack()} />
                <Button title='Tạo' accent fluid style={styles.button} onPress={handleCreate} />
            </View>
        </>
    );
}

export default CreatePostScreen;
