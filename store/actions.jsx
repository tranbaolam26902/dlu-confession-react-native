import { SET_USER_INFORMATION } from './constants';

export const setUserInformation = (payload) => ({
    type: SET_USER_INFORMATION,
    payload,
});
