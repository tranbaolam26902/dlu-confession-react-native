import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import Empty from '../components/Empty';
import Post from '../components/post';

function SearchResultScreen({ route }) {
    // Component's useState
    const [data, setData] = useState(route.params.data);

    // Component's useEffect
    useEffect(() => {
        setData(route.params.data);
    }, []);

    return (
        <View>
            {data.length !== 0 ? (
                <FlatList
                    decelerationRate={'normal'}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <Post data={item} />}
                />
            ) : (
                <Empty text='Không tìm thấy bài viết!' />
            )}
        </View>
    );
}

export default SearchResultScreen;
