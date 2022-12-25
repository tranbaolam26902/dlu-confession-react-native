import { SET_POSTS, SET_POPULAR_POSTS, SET_USER_INFORMATION, SET_SHOW_POST_OPTIONS, SET_POST_DATA } from './constants';

const apiURL = 'https://5869-113-180-209-221.ngrok.io';

const initStates = {
    apiURL: apiURL,
    imageURL: `${apiURL}/image/post?id=`,
    avatarURL: `${apiURL}/image/user?id=`,
    posts: [],
    popularPosts: [],
    userInformation: {},
    showPostOptions: false,
    postData: {},
};

function reducer(state, action) {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            };
        case SET_POPULAR_POSTS:
            return {
                ...state,
                popularPosts: action.payload,
            };
        case SET_USER_INFORMATION:
            return {
                ...state,
                userInformation: action.payload,
            };
        case SET_SHOW_POST_OPTIONS:
            return {
                ...state,
                showPostOptions: action.payload,
            };
        case SET_POST_DATA:
            return {
                ...state,
                postData: action.payload,
            };
        default:
            throw new Error('Error');
    }
}

export { initStates };
export default reducer;
