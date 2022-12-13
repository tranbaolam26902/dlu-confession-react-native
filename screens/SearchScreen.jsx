import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../assets/styles/GlobalStyles';
import Empty from '../components/Empty';
import { useStore } from '../store';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 8,
        backgroundColor: GlobalStyles.colors.background,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderWidth: 0.4,
        borderStyles: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    title: {
        fontWeight: 'bold',
        marginStart: 8
    },
    text: {
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
    information: {
        flex: 1,
        marginHorizontal: 8,
    }
});

function SearchScreen({ navigation }) {
    const [states] = useStore();
    const { apiURL, avatarURL } = states;
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (keyword) => {
        if (keyword !== '') {
            setKeyword(keyword);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Tìm kiếm',
                autoFocus: true,
                onChangeText: (event) => {
                    handleSearch(event.nativeEvent.text);
                    const debounce = setTimeout(() => {
                        setSearchResults([]);
                    }, 1000);
                    return () => clearTimeout(debounce);
                },
                onSearchButtonPress: (event) => {
                    if (event.nativeEvent.text !== '') {
                        const formData = new FormData();
                        formData.append('keyword', event.nativeEvent.text);
                        fetch(`${apiURL}/api/post/FindPost`, {
                            method: 'POST',
                            body: formData,
                        })
                            .then((response) => response.json())
                            .then((responseSearchResults) => {
                                if (responseSearchResults.length !== 0) {
                                    navigation.navigate('SearchResult', {data: responseSearchResults});
                                }
                            });
                    }
                    
                },
            },
        });
    }, [navigation]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (keyword !== '') {
                const formData = new FormData();
                formData.append('keyword', keyword);
                fetch(`${apiURL}/api/post/FindPost`, {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((responseSearchResults) => {
                        if (responseSearchResults.length !== 0) {
                            setSearchResults(responseSearchResults);
                        }
                    });
            }
        }, 1000);
        return () => clearTimeout(debounce);
    }, [keyword]);

    return (
        <Pressable>
            {searchResults.length !== 0 ? (
                    <FlatList
                        decelerationRate={'normal'}
                        data={searchResults}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.wrapper}
                                onPress={() => navigation.navigate('PostDetail', { data: item })}
                            >
                                <Image source={{ uri: `${avatarURL}${item.Avatar}` }} style={styles.avatar} />
                                <View style={styles.information}>
                                    <Text numberOfLines={2} style={[styles.text, styles.title]}>
                                        {item.Title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
            ) : (
                <Empty text='Không tìm thấy bài viết!' />
            )}
        </Pressable>
    );
}

export default SearchScreen;
