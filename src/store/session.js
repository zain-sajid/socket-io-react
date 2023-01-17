export const setUserActionCreator = (payload) => ({
    type: 'SET_USER',
    payload
  });
  

const defaultUser = { name: 'Demo User', username: 'demo' };
const initialState = {
  user: defaultUser,
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
        
      }
    default:
      return state;
  }
}

export default sessionReducer;