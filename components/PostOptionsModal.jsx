import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore, actions } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import CustomModal from './CustomModal';
import Button from './Button';

const styles = StyleSheet.create({
    modalWrapper: {
        paddingVertical: 16,
        width: '100%',
        backgroundColor: GlobalStyles.colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    text: {
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
    confirmWrapper: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: '80%',
        backgroundColor: GlobalStyles.colors.white,
        borderRadius: 20,
    },
    title: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
    },
    confirmFooter: {
        flexDirection: 'row',
        marginTop: 16,
    },
    confirmButton: {
        flex: 1,
    },
});

function PostOptionsModal() {
    // Global states
    const [states, dispatch] = useStore();

    // Component's states
    const [token, setToken] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Variables
    const { apiURL, showPostOptions, postData, userInformation, popularPosts } = states;

    // Functions
    const getToken = async () =>
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);
        });
    const deletePost = () => {
        const formData = new FormData();
        formData.append('id', postData.Id);
        if (userInformation.RoleTemps.includes('Manager'))
            fetch(`${apiURL}/api/admpost/delete`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });
        else
            fetch(`${apiURL}/api/userpost/delete`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formData,
            });
    };
    const getPosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                dispatch(actions.setPosts(responsePosts));
            });
    };
    const isPopularPost = () => {
        let result = false;
        popularPosts.map((post) => {
            if (post.Id === postData.Id) result = true;
        });
        return result;
    };
    const getPopularPosts = () => {
        fetch(`${apiURL}/api/post/hotpost`)
            .then((response) => response.json())
            .then((response) => {
                dispatch(actions.setPopularPosts(response));
            });
    };

    // Event handlers
    const handleDelete = () => {
        dispatch(actions.setShowPostOptions(false));
        setShowConfirmModal(true);
    };
    const handleCancel = () => {
        setShowConfirmModal(false);
    };
    const handleConfirm = () => {
        deletePost();
        setShowConfirmModal(false);
        getPosts();
        if (isPopularPost()) getPopularPosts();
    };

    useEffect(() => {
        getToken();
    }, []);

    return (
        <>
            <CustomModal
                showModal={showPostOptions}
                setShowModal={() => {
                    dispatch(actions.setShowPostOptions(false));
                }}
                bottom
            >
                {Object.keys(postData).length !== 0 ? (
                    <View style={styles.modalWrapper}>
                        {userInformation.RoleTemps.includes('Manager') ||
                        userInformation.UserProfile.Id === postData.PostHistories[0].AccountId ? null : (
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.text}>Báo cáo</Text>
                            </TouchableOpacity>
                        )}
                        {userInformation.UserProfile.Id === postData.PostHistories[0].AccountId ? (
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.text}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                        ) : null}
                        {userInformation.RoleTemps.includes('Manager') ||
                        userInformation.UserProfile.Id === postData.PostHistories[0].AccountId ? (
                            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                                <Text style={[styles.text, { color: GlobalStyles.colors.red }]}>Xóa</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                ) : null}
            </CustomModal>
            <CustomModal showModal={showConfirmModal} setShowModal={setShowConfirmModal}>
                <View style={styles.confirmWrapper}>
                    <Text style={styles.title}>Thông báo</Text>
                    <Text style={styles.text}>Xác nhận xóa bài viết?</Text>
                    <View style={styles.confirmFooter}>
                        <Button
                            title='Hủy'
                            outline
                            fluid
                            style={[styles.confirmButton, { marginRight: 16 }]}
                            onPress={handleCancel}
                        />
                        <Button title='Xóa' accent fluid style={styles.confirmButton} onPress={handleConfirm} />
                    </View>
                </View>
            </CustomModal>
        </>
    );
}

export default PostOptionsModal;
