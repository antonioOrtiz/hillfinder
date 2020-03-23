/* initial state */
export var usersStartState = {
  isAccountVerified: false,
  isLoggedIn: false,
  error: true,
  userAvatar: ''
};

/* action types */
export const actionTypes = {
  IS_ACCOUNT_VERIFIED: 'IS_ACCOUNT_VERIFIED',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
  IS_LOGGED_OUT: 'IS_LOGGED_OUT',
  LOAD_USER_AVATAR: 'LOAD_USER_AVATAR',
  ERROR_LOADING: 'ERROR_LOADING' // LOAD_MULTER_IMAGE: "LOAD_MULTER_IMAGE"
};

/* reducer(s) */
export default function users(state = usersStartState, action) {
  switch (action.type) {
    case actionTypes.IS_ACCOUNT_VERIFIED:
      return Object.assign({}, state, { isAccountVerified: true });

    case actionTypes.IS_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: true });

    case actionTypes.IS_LOGGED_OUT:
      return Object.assign({}, state, { isLoggedIn: false });

    case actionTypes.LOAD_USER_AVATAR:
      return Object.assign({}, state, { error: false, userAvatar: action.data });

    case actionTypes.ERROR_LOADING:
      return Object.assign({}, state, { error: true });

    default:
      return state;
  }
}

/* actions */
export const hasBeenVerified = () => {
  return { type: actionTypes.IS_ACCOUNT_VERIFIED };
};

export const logInUser = () => {
  return { type: actionTypes.IS_LOGGED_IN };
};

export const logOutUser = () => {
  return { type: actionTypes.IS_LOGGED_OUT };
};

export const loadAvatar = data => {
  return { type: actionTypes.LOAD_USER_AVATAR, data };
};

export const errorLoading = () => {
  return { type: actionTypes.ERROR_LOADING };
};
