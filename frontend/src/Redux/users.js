import * as ActionTypes from './ActionTypes'
import Cookie from 'js-cookie';
const user = Cookie.getJSON("userInfo") || null;
export const USER = (state  = {
    user : user
}, action)=>{
    switch(action.type){
       
        case ActionTypes.SIGN_UP_USER:
            var User = action.payload;
            return {...state , user : User}

        case ActionTypes.lOG_IN_USER:
            var User = action.payload;
            Cookie.set('userInfo' , JSON.stringify(User));
            return {...state , user : User}
        default:
            return state;
    }
}