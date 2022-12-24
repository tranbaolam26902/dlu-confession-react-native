import { useEffect, useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    StatusBar,
    RefreshControl,
    Pressable,
    View,
    TouchableOpacity,
} from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import HeaderBar from '../components/header';
import Empty from '../components/Empty';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    categoryHeader: {
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonCreate: {
        padding: 16,
    },
});

function CategoryScreen({ navigation, route }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [refreshing, setRefreshing] = useState(false);
    const [categories, setCategories] = useState([]);
    const [roleTemps, setRoleTemps] = useState([]);

    // Functions
    const getCategories = () => {
        fetch(`${apiURL}/api/category/index`)
            .then((response) => response.json())
            .then((response) => {
                setCategories(response);
                setRefreshing(false);
            });
    };
    const getUserInformation = async () => {
        const token = await AsyncStorage.getItem('@token', (err, item) => {
            return item;
        });
        fetch(`${apiURL}/api/useraccount/getinfo`, {
            method: 'POST',
            headers: {
                Authorization: token,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                setRoleTemps(response.RoleTemps);
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
    const handleCreate = () => {
        navigation.navigate('CreateCategory');
    };

    useEffect(() => {
        getUserInformation();
        getCategories();
    }, []);

    return (
        <>
            <StatusBar backgroundColor={GlobalStyles.colors.white} barStyle={'dark-content'} />
            <HeaderBar />
            <ScrollView
                style={styles.wrapper}
                decelerationRate={'normal'}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={styles.categoryHeader}>
                    <Text style={styles.title}>Chọn danh mục</Text>{' '}
                    <View style={styles.buttonCreate}>
                        <Button title='Thêm danh mục' text onPress={handleCreate} />
                    </View>
                </View>
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
