export const addMessageActionCreator = (payload) => ({
    type: 'ADD_MESSAGE',
    payload
  });
  

const defaultUser = { name: 'Demo User', username: 'demo' };
const initialKey = Date.now()
const initialState = {
  // [initialKey]: {user: 'Demo2', message: 'initial message'},
  // messages: []
};

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      if (action.payload && action.payload.user && action.payload.message) {
        const key = Date.now();
        return {
          ...state,
          [key]: {
            user: action.payload.user,
            message: action.payload.message
          }
        };
      } else {
        console.log("Invalid payload for ADD_MESSAGE action");
        return state;
      }
    default:
      return state;
  }
}

