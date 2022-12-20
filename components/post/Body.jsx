import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import { useStore } from '../../store';
import CategoryTag from '../CategoryTag';

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 4,
        marginBottom: 8,
    },
    title: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
    readMore: {
        paddingVertical: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
        textAlign: 'center',
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.secondary,
    },
    img: {
        height: 300,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray,
        borderRadius: 12,
        marginTop: 8,
    },
});

function Body({ data }) {
    // Global states
    const [states, dispatch] = useStore();
    const { imageURL } = states;

    // Variables
    const navigation = useNavigation();
    const route = useRoute();

    // Event handlers
    const handleNavigate = () => {
        if (route.name !== 'PostDetail') navigation.push('PostDetail', { data: data });
        else navigation.navigate('PostDetail', { data: data });
    };

    return (
        <View style={styles.wrapper}>
            <View style={{ marginLeft: -4 }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    overScrollMode={'never'}
                    data={data.Categories}
                    renderItem={({ item }) => <CategoryTag data={item} />}
                />
            </View>
            {route.name === 'PostDetail' ? (
                <View>
                    <Text style={[styles.text, styles.title]}>{data.Title}</Text>
                    <Text style={styles.text}>{data.Content.replace(/\n+/g, '\n').split('\n')}</Text>
                    {data.Pictures.map((image) => {
                        return <Image source={{ uri: `${imageURL}${image.Path}`}} key={image.Id} style={styles.img} />;
                    })}
                </View>
            ) : (
                <TouchableOpacity onPress={handleNavigate}>
                    <Text numberOfLines={2} style={[styles.text, styles.title]}>
                        {data.Title}
                    </Text>
                    <Text numberOfLines={4} style={styles.text}>
                        {data.Content}
                    </Text>
                    {data.Pictures.length == 1 ? (
                        <Image source={{ uri: `${imageURL}${data.Pictures[0].Path}` }} style={styles.img} />
                    ) : null}
                    {data.Pictures.length > 1 ? (
                        <View>
                            <Image source={{ uri: `${imageURL}${data.Pictures[0].Path}` }} style={styles.img} />
                            <Text style={styles.readMore}>Xem thêm</Text>
                        </View>
                    ) : null}
                </TouchableOpacity>
            )}
        </View>
    );
}

export default Body;
