import { StyleSheet, View, Image, StatusBar, Text, TouchableOpacity } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import icons from '../../assets/icons';
import images from '../../assets/images';

import HeaderButton from './HeaderButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import BottomModal from '../BottomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: GlobalStyles.colors.white,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.gray0,
    },
    action: {
        flexDirection: 'row',
    },
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
});

function HeaderBar() {
    // Component's states
    const [showModal, setShowModal] = useState(false);

    // Variables
    const navigation = useNavigation();

    // Event handlers
    const handleSearch = () => {
        navigation.navigate('Search');
    };
    const handleCreatePost = () => {
        navigation.navigate('CreatePost');
    };
    const handleMenu = () => {
        setShowModal(true);
    };
    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
        setShowModal(false);
    };
    const handleSignOut = async () => {
        await AsyncStorage.removeItem('@token');
        navigation.navigate('SignIn');
        setShowModal(false);
    };

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={showModal ? 'rgba(0, 0, 0, 0.5)' : GlobalStyles.colors.white}
                barStyle={'dark-content'}
            />
            <View style={styles.wrapper}>
                <Image source={images.logoText} />
                <View style={styles.action}>
                    <HeaderButton icon={icons.search} onPress={handleSearch} />
                    <HeaderButton icon={icons.add} style={{ marginHorizontal: 8 }} onPress={handleCreatePost} />
                    <HeaderButton icon={icons.menu} onPress={handleMenu} />
                </View>
            </View>
            <BottomModal showModal={showModal} setShowModal={setShowModal} bottom>
                <View style={styles.modalWrapper}>
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.text}>Đổi mật khẩu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                        <Text style={[styles.text, { color: GlobalStyles.colors.red }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </BottomModal>
        </>
    );
}

export default HeaderBar;
