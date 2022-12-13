import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import GlobalStyles from '../assets/styles/GlobalStyles';

import PostHeader from '../components/post/Header';
import PostBody from '../components/post/Body';
import CommentInput from '../components/comment/CommentInput';
import Comment from '../components/comment';

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: GlobalStyles.colors.white,
    },
    post: {
        padding: 16,
    },
    interaction: {
        marginTop: 8,
        fontSize: 14,
        fontStyle: 'italic',
        color: GlobalStyles.colors.secondary,
        textAlign: 'right',
    },
    commentTitle: {
        paddingVertical: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.secondary,
        textAlign: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: GlobalStyles.colors.secondary,
    },
    comments: {
        paddingHorizontal: 16,
    },
});

function PostDetailScreen({ route }) {
    const [data, setData] = useState(route.params.data);

    useEffect(() => {
        setData(route.params.data);
    }, [route]);

    return (
        <ScrollView showsHorizontalScrollIndicator={false} style={styles.wrapper}>
            <View style={styles.post}>
                <PostHeader data={data} />
                <PostBody data={data} />
                <Text style={styles.interaction}>{`${data.Like} lượt thích / ${data.TotalCmt} bình luận`}</Text>
            </View>
            <Text style={styles.commentTitle}>Bình luận</Text>
            <CommentInput data={data} setData={setData} />
            <View style={styles.comments}>
                {data.Comments.length !== 0
                    ? data.Comments.map((comment) => (
                          <Comment key={comment.Id} data={comment} style={{ marginBottom: 8 }} />
                      ))
                    : null}
            </View>
        </ScrollView>
    );
}

export default PostDetailScreen;
