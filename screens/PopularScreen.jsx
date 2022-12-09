import { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, Text, StatusBar, RefreshControl } from 'react-native';

import { useStore } from '../store';
import GlobalStyles from '../assets/styles/GlobalStyles';

import HeaderBar from '../components/header';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});

function PopularScreen({ navigation, route }) {
    // Global states
    const [states, dispatch] = useStore();
    const { apiURL } = states;

    // Component's states
    const [refreshing, setRefreshing] = useState(false);

    // Functions
    const wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        let time = new Date();
        // Call API
        // fetch(`${apiURL}/token`, {
        //     method: 'POST',
        //     body: `grant_type=password&username=Admin&password=Admin#123`,
        // })
        //     .then((response) => response.json())
        //     .then((response) => {
        //         let time = new Date() - time;        // set time for refreshing
        //         if (response.access_token) {
        //             console.log(time);
        //         }
        //     });
        wait(1000).then(() => setRefreshing(false));
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
                <Text>Popular Screen</Text>
            </ScrollView>
        </>
    );
}

export default PopularScreen;
