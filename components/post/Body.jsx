import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';
import { useStore } from '../../store';

import Button from '../Button';
import CategoryTag from '../CategoryTag';
import ScaleImage from '../ScaleImage';

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
        marginTop: 8,
    },
    img: {
        marginTop: 8,
        width: '100%',
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
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
                    {data.Content ? (
                        <Text style={styles.text}>{data.Content.replace(/\n+/g, '\n').split('\n')}</Text>
                    ) : null}
                    {data.Pictures.map((image) => (
                        <ScaleImage source={`${imageURL}${image.Path}`} key={image.Id} style={styles.img} />
                    ))}
                </View>
            ) : (
                <>
                    <TouchableOpacity onPress={handleNavigate}>
                        <Text numberOfLines={2} style={[styles.text, styles.title]}>
                            {data.Title}
                        </Text>
                        {data.Content ? (
                            <Text numberOfLines={4} style={styles.text}>
                                {data.Content}
                            </Text>
                        ) : null}
                    </TouchableOpacity>
                    <Pressable onPress={handleNavigate}>
                        {data.Pictures.length == 1 ? (
                            <ScaleImage source={`${imageURL}${data.Pictures[0].Path}`} style={styles.img} />
                        ) : null}
                        {data.Pictures.length > 1 ? (
                            <View>
                                <ScaleImage source={`${imageURL}${data.Pictures[0].Path}`} style={styles.img} />
                                <Button title='Xem thêm' text style={styles.readMore} onPress={handleNavigate} />
                            </View>
                        ) : null}
                    </Pressable>
                </>
            )}
        </View>
    );
}

export default Body;
