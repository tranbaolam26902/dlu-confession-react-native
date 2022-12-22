import { StyleSheet, Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Button from './Button';

const styles = StyleSheet.create({
    wrapper: {
        padding: 16,
        backgroundColor: GlobalStyles.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 48,
    },
    avatar: {
        width: 80,
        height: 80,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 16,
    },
    information: {
        alignItems: 'center',
    },
    name: {
        marginVertical: 8,
    },
    emphasize: {
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.textColor,
    },
    description: {
        fontSize: 16,
        fontStyle: 'italic',
        color: GlobalStyles.colors.secondary,
    },
    button: {
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: GlobalStyles.colors.gray0,
        marginBottom: 8,
    },
});

function ProfileSection({ canEdit, data, totalPosts }) {
    // Global states
    const [states, dispatch] = useStore();

    // Variables
    const { avatarURL } = states;
    const navigation = useNavigation();

    // Event handlers
    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.header}>
                <Image source={{ uri: `${avatarURL}${data.UserProfile.Avatar}` }} style={styles.avatar} />
                <View style={styles.information}>
                    <Text style={styles.emphasize}>{totalPosts}</Text>
                    <Text>Bài viết</Text>
                </View>
                <View style={styles.information}>
                    <Text style={styles.emphasize}>
                        {Math.floor((Date.now() - Date.parse(data.UserProfile.Birthday)) / 86400000)}
                    </Text>
                    <Text>Ngày hoạt động</Text>
                </View>
            </View>
            <View style={styles.name}>
                <Text style={styles.emphasize}>{data.UserProfile.NickName}</Text>
                {data.UserProfile.Description ? (
                    <Text style={styles.description}>{data.UserProfile.Description}</Text>
                ) : null}
            </View>
            {canEdit ? (
                <Button title='Chỉnh sửa' outline fluid style={styles.button} onPress={handleEditProfile} />
            ) : (
                <View style={styles.divider}></View>
            )}
            <Text style={[styles.title, styles.emphasize]}>Bài viết</Text>
        </View>
    );
}

export default ProfileSection;
