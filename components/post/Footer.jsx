import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { debug } from "react-native-reanimated";
import icons from "../../assets/icons";
import images from "../../assets/images";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import { useStore } from "../../store";


function PostFooter({ data }) {
    const [isLiked, setIsLiked] = useState(true);
    const [posts, setPosts] = useState([]);
    const [states, dispatch] = useStore();
    const [token, setToken] = useState('');
    
    const { apiURL} = states;

    const updatePosts = () => {
        fetch(`${apiURL}/api/post/index`)
            .then((response) => response.json())
            .then((responsePosts) => {
                
            });
    };

    const getToken = async() => {
        await AsyncStorage.getItem('@token', (err, item) => {
            setToken(item);

        });
    };

    const handleLike = () => {
        if (getToken) {
            const formData = new FormData();
            formData.append('id', data.Id);
            fetch(`${apiURL}/api/userpost/like`, {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formData,
            }).then(() => {
                
                setIsLiked(!isLiked);
                updatePosts();
            });
        }
    };


    return (
        <View style={styles.wrapper}>
            <View style={[styles.interact, styles["interact:first-child"]]}>
                <Image source={icons.comment} style={styles.icon}/>
                <Text style={styles.total}>{data.TotalCmt}</Text>
            </View>
            <View style={styles.interact}>
                <TouchableOpacity onPress={()=> {handleLike()}}>
                    {isLiked ? <Image source={icons.voteActive}  style={styles.icon}/>: <Image source={icons.vote} style={styles.icon}/>}
                </TouchableOpacity>
                <Text style={styles.total}>{data.Like}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection:"row",
        justifyContent: "flex-end" 
    },
    interact: {
        flexDirection: "row",
        alignItems: "center"
    },
    'interact:first-child': {
        marginEnd: 32,
    },
    icon: {
        marginEnd: 8,
    },
    total: {
        color: GlobalStyles.colors.secondary
    }

});

export default PostFooter;

