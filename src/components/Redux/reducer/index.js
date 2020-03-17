import { combineReducers } from 'redux';
import { userReducer } from './UserReducer';
import { mapReducer } from './MapReducer';

export const reducer = combineReducers({ userReducer, mapReducer });