import { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import images from '../../assets/images';
import icons from '../../assets/icons';

import Input from '../Input';
import IconButton from '../post/IconButton';
import GlobalStyles from '../../assets/styles/GlobalStyles';

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    avatar: {
        marginTop: 2,
        width: 40,
        height: 40,
        borderRadius: 12,
    },
    inputWrapper: {
        flex: 1,
        marginHorizontal: 8,
    },
    input: {
        backgroundColor: GlobalStyles.colors.white,
        borderWidth: 1.4,
        borderColor: GlobalStyles.colors.gray,
    },
    button: {
        alignSelf: 'flex-end',
        marginBottom: 6,
    },
});

function CommentInput() {
    // Component's value
    const [comment, setComment] = useState('');

    return (
        <View style={styles.wrapper}>
            <Image source={images.avatar} style={styles.avatar} />
            <Input
                style={styles.inputWrapper}
                inputStyle={styles.input}
                placeholder={'Bình luận về bài viết...'}
                value={comment}
                setValue={setComment}
                multiline
            />
            <IconButton icon={icons.send} style={styles.button} />
        </View>
    );
}

export default CommentInput;
