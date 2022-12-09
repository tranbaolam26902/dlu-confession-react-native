import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import PostBody from "./Body";
import PostFooter from "./Footer";
import PostHeader from "./Header";


function Post({ data }) {
    return(
        <View style={styles.wrapper}>
            <PostHeader data={data}/>
            <PostBody data={data}/>
            <PostFooter data={data}/>
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