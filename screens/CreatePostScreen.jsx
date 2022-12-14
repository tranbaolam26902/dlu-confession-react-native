import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';
import icons from '../assets/icons';

import Button from '../components/Button';
import Input from '../components/Input';
import IconButton from '../components/IconButton';

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 16,
        backgroundColor: GlobalStyles.colors.background,
    },
    error: {
        marginBottom: 8,
        paddingVertical: 8,
        fontSize: 16,
        color: GlobalStyles.colors.red,
        fontStyle: 'italic',
        textAlign: 'center',
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
    addImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 16,
    },
    addImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addImageIcon: {
        marginRight: 8,
    },
    addImageText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
    },
    uploadImages: {
        marginBottom: 16,
        paddingBottom: 6,
    },
    image: {
        marginRight: 8,
        width: 120,
        height: 120,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    deleteImage: {
        position: 'absolute',
        top: 8,
        right: 16,
        backgroundColor: GlobalStyles.colors.secondary,
        borderRadius: 999,
    },
    private: {
        marginTop: -24,
        marginBottom: 48,
    },
    privateToggle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    privateText: {
        marginLeft: 8,
        fontSize: 16,
        color: GlobalStyles.colors.secondary,
    },
    privateDescription: {
        marginTop: -6,
        fontSize: 14,
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

function CreatePostScreen({ navigation }) {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [token, setToken] = useState('');
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [isPrivate, setIsPrivate] = useState(false);

    // Component's refs
    const contentRef = useRef();

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
    const isValidatePostData = () => {
        setErrorMessage('');
        if (categoryIds.length === 0) {
            setErrorMessage('Vui l??ng ch???n ??t nh???t 01 danh m???c!');
            return false;
        }
        if (title === '') {
            setErrorMessage('Vui l??ng nh???p ti??u ????? cho b??i vi???t!');
            return false;
        }
        if (categoryIds.length === 0 || title === '') return false;
        return true;
    };

    // Event handlers
    const handleCreate = () => {
        if (!isValidatePostData()) return;
        const formData = new FormData();
        const postData = {
            Title: title,
            Content: content,
            SelectedCategories: categoryIds,
            PrivateMode: isPrivate,
        };
        formData.append('Post', JSON.stringify(postData));
        if (images.length !== 0) {
            images.map((image) => {
                let uri = 'file:///' + image.uri.split('file:/').join('');
                formData.append('File', {
                    uri: uri,
                    type: `${image.type}/jpg`,
                    name: uri.split('/').pop(),
                });
            });
        }
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
    const handleAddImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });
        if (!result.canceled) setImages([...images, ...result.assets]);
    };
    const handleDeleteImages = () => {
        setImages([]);
    };
    const handleDeleteImage = (e, image) => {
        setImages(images.filter((i) => i.assetId !== image.assetId));
    };

    useEffect(() => {
        getToken();
        getCategories();
    }, []);

    return (
        <>
            <ScrollView style={styles.body} nestedScrollEnabled={true}>
                {errorMessage !== '' ? <Text style={styles.error}>{errorMessage}</Text> : null}
                <Text style={styles.label}>Danh m???c *</Text>
                <DropDownPicker
                    schema={{ label: 'Name', value: 'Id' }}
                    mode='BADGE'
                    multiple={true}
                    placeholder='Ch???n danh m???c'
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
                    modalTitle='Ch???n danh m???c'
                    modalTitleStyle={{ marginLeft: 16 }}
                />
                <Input
                    label='Ti??u ????? *'
                    value={title}
                    style={styles.input}
                    setValue={setTitle}
                    blurOnSubmit={false}
                    returnKeyType='next'
                    onSubmitEditing={() => contentRef.current.focus()}
                />
                <Input
                    ref={contentRef}
                    label='N???i dung'
                    multiline
                    numberOfLines={10}
                    style={styles.input}
                    inputStyle={{ textAlignVertical: 'top' }}
                    value={content}
                    setValue={setContent}
                />
                <View style={styles.addImage}>
                    <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                        <Image source={icons.addImage} style={styles.addImageIcon} />
                        <Text style={styles.addImageText}>Th??m h??nh ???nh</Text>
                    </TouchableOpacity>
                    {images.length !== 0 ? <Button title='X??a t???t c???' text onPress={handleDeleteImages} /> : null}
                </View>
                {images.length !== 0 ? (
                    <ScrollView style={styles.uploadImages} horizontal={true}>
                        {images.map((image) => (
                            <TouchableOpacity key={image.assetId}>
                                <Image source={{ uri: image.uri }} style={styles.image} />
                                <IconButton
                                    icon={icons.delete}
                                    style={styles.deleteImage}
                                    iconWidth={28}
                                    iconHeight={28}
                                    onPress={(e) => handleDeleteImage(e, image)}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                ) : null}
                <View style={styles.private}>
                    <TouchableOpacity style={styles.privateToggle} onPress={() => setIsPrivate(!isPrivate)}>
                        <Switch
                            trackColor={{ true: '#AFEF9B' }}
                            thumbColor={isPrivate ? GlobalStyles.colors.accent : null}
                            value={isPrivate}
                            onValueChange={() => setIsPrivate(!isPrivate)}
                        />
                        <Text style={styles.privateText}>???n danh</Text>
                    </TouchableOpacity>
                    <Text style={styles.privateDescription}>(Ng?????i kh??c s??? kh??ng bi???t b???n l?? ng?????i ????ng b??i)</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <Button title='H???y' outline fluid style={styles.button} onPress={() => navigation.goBack()} />
                <Button title='T???o' accent fluid style={styles.button} onPress={handleCreate} />
            </View>
        </>
    );
}

export default CreatePostScreen;
