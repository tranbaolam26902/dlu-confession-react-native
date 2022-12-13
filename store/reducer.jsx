import { SET_USER_INFORMATION } from './constants';

const apiURL = 'https://0f91-113-180-209-221.ngrok.io';

const initStates = {
    apiURL: apiURL,
    imageURL: `${apiURL}/image/post?id=`,
    avatarURL: `${apiURL}/image/user?id=`,
    userInformation: {},
};

function reducer(state, action) {
    switch (action.type) {
        case SET_USER_INFORMATION:
            return {
                ...state,
                userInformation: action.payload,
            };
        default:
            throw new Error('Error');
    }
}

export { initStates };
export default reducer;
