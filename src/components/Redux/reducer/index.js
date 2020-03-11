import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';

export const reducer = combineReducers({ userReducer });