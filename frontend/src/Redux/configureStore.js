import {combineReducers , applyMiddleware ,createStore} from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {USER} from './users';
import Cookie from 'js-cookie'
export const configureStore = () =>{
    const store = createStore( 
        combineReducers({
            user : USER,
        }) , applyMiddleware(thunk , logger)
    );

    return store;
}