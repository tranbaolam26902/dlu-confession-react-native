import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import Empty from '../components/Empty';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: GlobalStyles.colors.background,
        paddingVertical: 12,
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
        marginStart: 8,
    },
    text: {
        fontSize: 14,
        color: GlobalStyles.colors.textColor,
    },
    information: {
        flex: 1,
        marginHorizontal: 8,
    },
});

function SearchScreen({ navigation }) {
    // Global states
    const [states] = useStore();
    const { apiURL, avatarURL } = states;

    // Component's states
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Event handlers
    const handleSearch = (keyword) => {
        if (keyword !== '') {
            setKeyword(keyword);
        }
    };

    // Component's effect
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
                                    navigation.navigate('SearchResult', { data: responseSearchResults });
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
        <FlatList
            decelerationRate={'normal'}
            data={searchResults}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <Empty text='Không tìm thấy bài viết!' />}
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
    );
}

export default SearchScreen;
