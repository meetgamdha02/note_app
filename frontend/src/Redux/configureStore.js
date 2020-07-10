import {combineReducers , applyMiddleware ,createStore} from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {USER} from './users';
import {Notes} from './notes'
export const configureStore = () =>{
    const store = createStore( 
        combineReducers({
            user : USER,
            notes : Notes
        }) , applyMiddleware(thunk , logger)
    );

    return store;
}