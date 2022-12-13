import { StyleSheet, View, Image } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import icons from '../../assets/icons';
import images from '../../assets/images';

import HeaderButton from './HeaderButton';
import { useNavigation } from '@react-navigation/native';

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
});

function HeaderBar() {
    const navigation = useNavigation();
    const handleSearch = () => {
        navigation.navigate('Search');
    };
    const handleAdd = () => {
        // navigation.replace('Search');
    };
    const handleMenu = () => {
        // navigation.replace('Search');
    };
    return (
        <View style={styles.wrapper}>
            <Image source={images.logoText} />
            <View style={styles.action}>
                <HeaderButton icon={icons.search} onPress={handleSearch} />
                <HeaderButton icon={icons.add} style={{ marginHorizontal: 8 }} onPress={handleAdd} />
                <HeaderButton icon={icons.menu} onPress={handleMenu} />
            </View>
        </View>
    );
}

export default HeaderBar;
