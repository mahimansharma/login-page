import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import Cookie from 'js-cookie';
import promiseMiddleware from 'redux-promise';
import {
    userSigninReducer,
    userRegisterReducer,
    userUpdateReducer,
} from './reducers';

const userInfo = Cookie.getJSON('userInfo') || null;

const initialState = {
    userSignin: { userInfo },
};

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(promiseMiddleware, ReduxThunk),
);
export default store;