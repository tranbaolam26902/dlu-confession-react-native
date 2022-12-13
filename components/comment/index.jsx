import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import { useStore } from '../../store';
import GlobalStyles from '../../assets/styles/GlobalStyles';

import Body from './Body';
import Footer from './Footer';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatar: {
        marginRight: 8,
        width: 40,
        height: 40,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    main: {
        flex: 1,
    },
    childComments: {
        marginTop: 8,
    },
});

function Comment({ data, style }) {
    // Global states
    const [states, dispatch] = useStore();
    const { avatarURL } = states;

    // Variables
    const navigation = useNavigation();

    // Event handlers
    const handleNavigate = () => {
        navigation.navigate('Profile', { data: { Name: data.NickName, Id: data.AccountId } });
    };

    return (
        <View style={[styles.wrapper, style]}>
            <TouchableOpacity onPress={handleNavigate}>
                <Image source={{ uri: `${avatarURL}${data.Avatar}` }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.main}>
                <Body data={data} />
                <Footer data={data} />
                {data.ChildComments.length !== 0 ? (
                    <View style={styles.childComments}>
                        {data.ChildComments.map((comment) => (
                            <Comment key={comment.Id} data={comment} />
                        ))}
                    </View>
                ) : null}
            </View>
        </View>
    );
}

export default Comment;
