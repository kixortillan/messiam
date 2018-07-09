import Immutable from 'immutable';
import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import thunk from 'redux-thunk';

const initialState = Immutable.Map({
  isAppReady: false,
  accessToken: null,
  refreshToken: null,
  idToken: null,
  user: null,
  circles: null,
  chat: null,
});

function loginFirebase() {

}

function app(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.data.user };
      break;
    case 'SAVE_TOKEN':
      return { ...state, accessToken: action.data.accessToken };
      break;
    case 'USER_AUTH':
      return { ...state, user: action.data.user };
      break;
    case 'GET_TOKEN':
      break;
    case 'UPDATE_APP_READY':
      return { ...state, isAppReady: action.data.isAppReady };
      break;
    default: 
      return state;
  }
}

initialState.propTypes = {
  isAppReady: PropTypes.bool,
  accessToken: PropTypes.object,
  user: PropTypes.object,
  circles: PropTypes.arrayOf(PropTypes.object),
  chat: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
};

export default app;

// function auth(state = initialState, ) {

// }

// const app = combineReducers({
//   auth,
// });

// export default app;