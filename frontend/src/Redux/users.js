import * as ActionTypes from './ActionTypes'
import Cookie from 'js-cookie';
const user = Cookie.getJSON("userInfo") || null;
export const USER = (state = {
    user: user,
    isError: null,
    isLoading : false
}, action) => {
    switch (action.type) {

        case ActionTypes.SIGN_UP_USER:
            var User = action.payload;
            Cookie.set('userInfo', JSON.stringify(User));
            return {
                ...state, user: User, isError: null, isLoading : false
            }

        case ActionTypes.SIGN_USER_FAILED:
            return {
                ...state, isError: action.payload, isLoading : false
            }

        case ActionTypes.lOG_IN_USER:
            var User = action.payload;
            Cookie.set('userInfo', JSON.stringify(User));
            return {
                ...state, user: User, isError: null, isLoading : false
            }

        case ActionTypes.UPDATE_USER:
            var User = action.payload;
            Cookie.set('userInfo', JSON.stringify(User));
            return {
                ...state, user: User, isError: null, isLoading : false
            }

        case ActionTypes.UPDATE_USER_FAILED : 
            return{
                ...state , isError : action.payload , isLoading : false
            }

        case ActionTypes.LOGIN_USER_FAILED:
            return {
                ...state, isError: action.payload, user: null , isLoading : false
            }

        case ActionTypes.LOGIN_USER_LOADING : 
            return{
                ...state , isLoading : true
            }
        case ActionTypes.LOGOUT_USER:
            Cookie.remove("userInfo")
            return {};
        default:
            return state;
    }
}