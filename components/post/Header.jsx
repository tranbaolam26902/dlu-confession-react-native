import { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { StretchInX } from "react-native-reanimated";
import icons from "../../assets/icons";
import images from "../../assets/images";
import GlobalStyles from "../../assets/styles/GlobalStyles";
import { useStore } from "../../store";


function Header({ data}) {
    const date = data.CreatedTime.split('-');
    const day = date[2].split('T')[0];
    const month = date[1];
    
    const [states, dispatch] = useStore();
    const { apiURL, avatarURL } = states;

    return (
        <View >
            <View style={styles.wrapper}>
            <View style={styles.information}>
                <Image 
                    style={styles.logo}
                    source={{uri:`${avatarURL}${data.Avatar}`}} />
                    <View style={styles.info_detail}>
                        <Text style={styles.nickName}>{data.NickName}</Text>
                        <Text style>{day + ' tháng ' + month}</Text>
                    </View>
            </View>
            <Image 
                style={styles.options}
                source={icons.optionVertical}/>
            </View>
            <FlatList horizontal={true}
                data={data.Categories}
                showsHorizontalScrollIndicator={false}
                style={styles.category_Wrap}
                renderItem={({item}) => (
                    <Text style={[styles.category, styles["category:first-child"]]}>{item.Name}</Text>
                )}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        marginRight: 4,
        fontSize: 16,
        color: GlobalStyles.colors.textColor,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 12,
    },
    information: {
        flexDirection: 'row',
       
    },
    info_detail: {
        paddingStart: 16,
    },
    nickName: {
        color: GlobalStyles.colors.secondary,
        fontSize: 18,
        fontWeight: "600", 
    },
    time : {
        color: GlobalStyles.colors.secondary,
        fontSize: 12, 
    },
    options: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    category_Wrap: {
        marginVertical: 16,
    },
    category: {
        fontSize: 14,
        lineHeight: 16,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: GlobalStyles.colors.primary,
        borderRadius: 16,
        marginEnd: 12,
        marginVertical: 1, 
        textAlign: "justify",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 16,
        elevation: 4,
    },
    'category:first-child': {
        marginStart: 4,
    }
});

export default Header