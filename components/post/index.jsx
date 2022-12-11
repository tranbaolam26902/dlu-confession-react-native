import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";


function Post({ data }) {
    return(
        <View style={styles.wrapper}>
            <Header data={data}/>
            <Body data={data}/>
            <Footer data={data}/>
        </View>
        
    ); 
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginVertical: 8,
        padding: 16,
        backgroundColor: GlobalStyles.colors.primary,
        
    },
});

export default Post;