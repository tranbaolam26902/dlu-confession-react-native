import { SET_POSTS, SET_POPULAR_POSTS, SET_USER_INFORMATION, SET_SHOW_POST_OPTIONS, SET_POST_DATA } from './constants';

export const setPosts = (payload) => ({
    type: SET_POSTS,
    payload,
});

export const setPopularPosts = (payload) => ({
    type: SET_POPULAR_POSTS,
    payload,
});

export const setUserInformation = (payload) => ({
    type: SET_USER_INFORMATION,
    payload,
});

export const setShowPostOptions = (payload) => ({
    type: SET_SHOW_POST_OPTIONS,
    payload,
});

export const setPostData = (payload) => ({
    type: SET_POST_DATA,
    payload,
});
