/* initial state */
export var uiStartState = { modalActive: false, avatarModalActive: false, }

/* action types */
export const actionTypes = {
  MODAL_ACTIVE: 'MODAL_ACTIVE',
  MODAL_INACTIVE: 'MODAL_INACTIVE',
  AVATAR_MODAL_ACTIVE: 'AVATAR_MODAL_ACTIVE',
  AVATAR_MODAL_INACTIVE: 'AVATAR_MODAL_INACTIVE',
}

/* reducer(s) */
export default function ui(state = uiStartState, action) {
  switch (action.type) {

    case actionTypes.MODAL_ACTIVE:
      return Object.assign({}, state, { modalActive: true });

    case actionTypes.MODAL_INACTIVE:
      return Object.assign({}, state, { modalActive: false });

    case actionTypes.AVATAR_MODAL_ACTIVE:
      return Object.assign({}, state, { avatarModalActive: true });

    case actionTypes.AVATAR_MODAL_INACTIVE:
      return Object.assign({}, state, { avatarModalActive: false });

    default:
      return state
  }
};

/* actions */
export const modalStateOn = () => {
  return { type: actionTypes.MODAL_ACTIVE }
}

export const modalStateOff = () => {
  return { type: actionTypes.MODAL_INACTIVE }
}

export const avatarModalStateOn = () => {
  return { type: actionTypes.AVATAR_MODAL_ACTIVE }
}

export const avatarModalStateOff = () => {
  return { type: actionTypes.AVATAR_MODAL_INACTIVE }
}
