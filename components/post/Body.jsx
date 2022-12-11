import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { StretchInX } from 'react-native-reanimated';
import images from '../../assets/images';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import { useStore } from '../../store';

function PostBody({ data }) {
    const [states, dispatch] = useStore();
    const { apiURL, imageURL } = states;
    return (
        <View>
            <Text numberOfLines={2} style={styles.title}>
                {data.Title}
            </Text>
            <Text numberOfLines={4} style={styles.content}>
                {data.Content}
            </Text>
            <View>
                {data.Pictures.map((picture) => {
                    return (
                        <Image style={styles.logo} key={picture.Id} source={{ uri: `${imageURL}${picture.Path}` }} />
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    title: {
        color: GlobalStyles.colors.secondary,
        fontSize: 18,
        fontWeight: '600',
        marginEnd: 8,
    },
    content: {
        fontSize: 16,
    },
});

export default PostBody;
