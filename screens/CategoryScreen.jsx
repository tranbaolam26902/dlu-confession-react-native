import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, RefreshControl, Pressable } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import HeaderBar from '../components/header';
import Empty from '../components/Empty';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.background,
    },
    title: {
        padding: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
    },
    categoryItem: {
        marginHorizontal: 16,
        marginBottom: 8,
        padding: 16,
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 0.4,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.gray0,
        borderRadius: 12,
    },
    categoryText: {
        fontSize: 16,
    },
});

function CategoryScreen({ navigation, route }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState([]);

    // Functions
    const getCategories = () => {
        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((response) => {
                setCategories(response);
                setRefreshing(false);
            });
    };
    const onRefresh = () => {
        setRefreshing(true);
        getCategories();
    };
    const handlePress = (e, category) => {
        navigation.navigate('PostsByCategory', {
            data: category,
        });
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <HeaderBar />
            <ScrollView
                style={styles.wrapper}
                decelerationRate={'normal'}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Text style={styles.title}>Chọn danh mục</Text>
                {categories.length !== 0 ? (
                    categories.map((category) => (
                        <Pressable
                            key={category.Id}
                            style={styles.categoryItem}
                            onPress={(e) => handlePress(e, category)}
                        >
                            <Text style={styles.categoryText}>{category.Name}</Text>
                        </Pressable>
                    ))
                ) : (
                    <Empty text='Chưa có danh mục!' />
                )}
            </ScrollView>
        </>
    );
}

export default CategoryScreen;
