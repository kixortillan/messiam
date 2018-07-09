import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import app from '../reducers/reducer';

const store = createStore(app, applyMiddleware(thunkMiddleware));

export default store;