import { StyleSheet, View } from 'react-native';

import GlobalStyles from '../../assets/styles/GlobalStyles';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: GlobalStyles.colors.white,
    },
});

function Post({ data }) {
    return (
        <View style={styles.wrapper}>
            <Header data={data} />
            <Body data={data} />
            <Footer data={data} />
        </View>
    );
}

export default Post;
