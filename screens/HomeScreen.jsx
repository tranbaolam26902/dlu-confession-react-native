import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../assets/styles/GlobalStyles';
import PostModal from '../components/post';
import { useStore } from '../store';
function HomeScreen() {
    const [states, dispatch] = useStore();
    const { apiURL } = states;
    const [data, setData] = useState([]);
    

    useEffect(() => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                setData(responsePosts);
            });
        // eslint-disable-next-line
    }, []);

    

    return (
        // <ScrollView showsVerticalScrollIndicator={false}>
        //     <PostModal styles={styles.container} data={data} />
            
        // </ScrollView>
        <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
            <PostModal styles={styles.container} data={item} />
        )}
        />
    );
}

const styles = StyleSheet.create({
    container: {

    }
});

export default HomeScreen;
