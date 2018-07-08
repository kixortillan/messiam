import { createStore } from 'redux';
import app from '../reducers/reducer';

const store = createStore(app, {});

export default store;