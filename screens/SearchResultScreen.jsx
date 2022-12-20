import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Empty from '../components/Empty';
import Post from '../components/post';

const styles = StyleSheet.create({
    header: {
        marginBottom: 8,
        padding: 16,
        backgroundColor: GlobalStyles.colors.white,
        fontSize: 16,
        color: GlobalStyles.colors.secondary,
    },
    accent: {
        color: GlobalStyles.colors.accent,
        fontWeight: 'bold',
    },
});

function SearchResultScreen({ route }) {
    // Component's useState
    const [data, setData] = useState(route.params.data);

    // Component's useEffect
    useEffect(() => {
        setData(route.params.data);
    }, []);

    return (
        <View>
            <FlatList
                decelerationRate={'normal'}
                data={data}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Text style={styles.header}>
                        Tìm thấy <Text style={styles.accent}>{data.length}</Text> bài viết liên quan:
                    </Text>
                )}
                ListEmptyComponent={() => <Empty text='Không tìm thấy bài viết!' />}
                renderItem={({ item }) => <Post data={item} />}
            />
        </View>
    );
}

export default SearchResultScreen;
