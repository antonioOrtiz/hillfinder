/* initial state */
export var usersStartState = { isLoggedIn: false, error: null, userAvatar: '' }

/* action types */
export const actionTypes = {
    IS_LOGGED_IN: "IS_LOGGED_IN",
    IS_LOGGED_OUT: "IS_LOGGED_OUT",
    LOAD_USER_AVATAR: "LOAD_USER_AVATAR",
    // LOAD_MULTER_IMAGE: "LOAD_MULTER_IMAGE"
};

/* reducer(s) */
export default function users(state = usersStartState, action) {
    switch (action.type) {
        case actionTypes.IS_LOGGED_IN:
            return Object.assign({}, state, { isLoggedIn: true });
        case actionTypes.IS_LOGGED_OUT:
            return Object.assign({}, state, { isLoggedIn: false });
        case actionTypes.LOAD_USER_AVATAR:
            return Object.assign({}, state, { userAvatar: action.data });
            // case actionTypes.LOAD_MULTER_IMAGE:
            //     return Object.assign({}, state, { userImages: action.data });
        default:
            return state
    }
};

/* actions */
export const logInUser = () => {
    return { type: actionTypes.IS_LOGGED_IN }
}
export const logOutUser = () => {
    return { type: actionTypes.IS_LOGGED_OUT }
}
export const loadAvatar = (data) => {
    return { type: actionTypes.LOAD_USER_AVATAR, data }
}