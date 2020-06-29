import * as ActionType from './ActionTypes';
import { URL } from '../config/urls'
export const createUser = (username, email, password) => (dispatch) => {
    const User = {
        username: username,
        email: email,
        password: password
    }
    return fetch(URL + 'signUp', {
        method: 'POST',
        body: JSON.stringify(User),
        headers: {
            "Content-type": 'application/json'
        },
        credentials: 'same-origin',
    })
        .then((res) => {
            if (res.ok) return res;
            else {
                var error = new Error(`Error ${res.status} : ${res.statusText}`)
                error.response = res;
                throw error;
            }
        },
            err => {
                var errmsg = new Error(err.message);
                throw errmsg;
            })
        .then(response => response.json())
        .then((User) => dispatch(addUser(User.username)))
        .catch((err) => {
            console.log(err.message)
        })
}

export const addUser = (username) => ({
    type: ActionType.SIGN_UP_USER,
    payload: username
});


export const logInUser = (username) => ({
    type : ActionType.lOG_IN_USER,
    payload : username
})

export const tepLogInUser = (username , password) =>(dispatch)=>{
    var User = {
        username : username,
        password : password
    };

    return fetch(URL + 'logIn' , {
        method : 'POST',
        body : JSON.stringify(User),
        credentials : 'same-origin',
        headers : {
            "Content-type" : "Application/json"
        },
    })
    .then((res)=>{
        if(res.ok)return res;
        else{
            var error = new Error(`Error ${res.status} : ${res.statusText}`);
            error.response = res;
            throw error;
        }
    } , err=>{
        var errmsg = new Error(err.message);
        throw errmsg;
    })
    .then((res)=>res.json())
    .then((res)=>dispatch(logInUser(res)))
    .catch((err)=>console.log(err));
}