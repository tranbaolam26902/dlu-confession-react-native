import { SET_SHOW_SIGN_IN_MODAL } from './constants';

const apiURL = 'https://localhost:30123';

const initStates = {
    apiURL: apiURL,
    imageURL: `${apiURL}/image/post?id=`,
    avatarURL: `${apiURL}/image/user?id=`,
    showSignInModal: false,
};

function reducer(state, action) {
    switch (action.type) {
        case SET_SHOW_SIGN_IN_MODAL:
            return {
                ...state,
                showSignInModal: action.payload,
            };
        default:
            throw new Error('Error');
    }
}

export { initStates };
export default reducer;
