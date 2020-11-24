import React from "react";
import {combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { systemReducer } from './reducer';

//Specifying the reducers that can operate on this store for storing information
const rootReducer = combineReducers({
  system: systemReducer,
});

//This is the redux store where the friend channels are going to be stored for passing between screens
const store = createStore(
  rootReducer,
  composeWithDevTools()
);

export default store;
