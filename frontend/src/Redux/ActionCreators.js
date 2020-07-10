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
        .then((User) => dispatch(addUser(User)))
        .catch((err) => {
            console.log(err.message)
        })
}

export const addUser = (username) => ({
    type: ActionType.SIGN_UP_USER,
    payload: username
});


export const logInUser = (username) => ({
    type: ActionType.lOG_IN_USER,
    payload: username
})
export const logInFailed = (err) =>({
    type : ActionType.LOGIN_USER_FAILED,
    payload : err
})
export const tepLogInUser = (username, password) => (dispatch) => {
    var User = {
        username: username,
        password: password
    };

    return fetch(URL + 'logIn', {
        method: 'POST',
        body: JSON.stringify(User),
        credentials: 'same-origin',
        headers: {
            "Content-type": "Application/json"
        },
    })
        .then((res) => {
            if (res.ok) return res;
            else {
                var error = new Error(`Error ${res.status} : ${res.statusText}`);
                error.response = res;
                throw error;
            }
        }, err => {
            var errmsg = new Error(err.message);
            throw errmsg;
        })
        .then((res) => res.json())
        .then((res) => dispatch(logInUser(res)))
        .catch((err) => dispatch(logInFailed(err)));
}

export const tempUpdateUser = (username, email) => (dispatch, getState) => {
    var userInfo;

    if (username === '') {
        userInfo = { email: email }
    }
    else {
        userInfo = { username: username }
    }

    const {
        user: { user }
    } = getState();
    const token = user ? user.token : ''
    return fetch(URL + 'user/profile', {
        method: 'PUT',
        body: JSON.stringify(userInfo),
        headers: {
            "Content-type": "Application/json",
            "authorization": `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) return res;
            else {
                var error = new Error(`Error ${res.status} : ${res.statusText}`);
                error.response = res;
                throw error;
            }
        }, err => {
            var errmsg = new Error(err.message);
            throw errmsg;
        })
        .then((res) => res.json())
        .then((res) => dispatch(updateUser(res)))
        .catch((err) => console.log(err));
}

export const updateUser = (user) => ({
    type: ActionType.UPDATE_USER,
    payload: user
});

export const tempDisplayNotes = () => (dispatch, getState) => {
    // var note = {
    //     title : title,
    //     description : description
    // },
    const {
        user: { user }
    } = getState()
    // console.log(user.token)
    const token = user ? user.token : ''
    return fetch(URL + 'user/home', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    })
        .then((res) => {
            if (res.ok) return res;
            else {
                var error = new Error(`Error ${res.status} : ${res.statusText}`);
                error.response = res;
                throw error;
            }
        }, err => {
            var errmsg = new Error(err.message);
            throw errmsg;
        })
        .then((res) => res.json())
        .then((data) => dispatch(displayNotes(data)))
        .catch((err) => console.log(err));
}

export const displayNotes = (notes) => ({
    type: ActionType.DISPLAY_NOTES,
    payload: notes
})

export const logOutUser = () => ({
    type: ActionType.LOGOUT_USER
});


export const tempUpdateNotes = (id, title, description) => (dispatch, getState) => {
    var note = {
        title: title,
        description: description
    }


    const {
        user: { user }
    } = getState();
    const token = user ? user.token : ''
    return fetch(URL + `user/home/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(note)
    })

        .then((res) => {
            if (res.ok) return res;
            else {
                var error = new Error(`Error ${res.status} : ${res.statusText}`);
                error.response = res;
                throw error;
            }
        }, err => {
            var errmsg = new Error(err.message);
            throw errmsg;
        })
        .then((res) => res.json())
        .then((data) => dispatch(updateNotes(data)))
        .catch((err) => console.log(err));
}

export const updateNotes = (data) => ({
    type: ActionType.UPDATE_NOTE,
    payload: data
});

export const tempAddNote = (title , description) => (dispatch , getState) => {
    var note = {
        title: title,
        description: description
    }
    const {
        user: { user }
    } = getState();
    const token = user ? user.token : ''
    return fetch(URL + `user/home`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(note)
    })

        .then((res) => {
            if (res.ok) return res;
            else {
                var error = new Error(`Error ${res.status} : ${res.statusText}`);
                error.response = res;
                throw error;
            }
        }, err => {
            var errmsg = new Error(err.message);
            throw errmsg;
        })
        .then((res) => res.json())
        .then((data) => dispatch(addNote(data)))
        .catch((err) => console.log(err));
}

export const addNote = (note) =>({
    type : ActionType.ADD_NOTE,
    payload : note
})

export const tempDelNotes = (id) => (dispatch , getState)=>{
    const note = {
        id : id
    }
    const {
        user: { user }
    } = getState();
    const token = user ? user.token : ''
    return fetch(URL + `user/home`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(note)
    })

        .then((res) => {
            if (res.ok) return res;
            else {
                var error = new Error(`Error ${res.status} : ${res.statusText}`);
                error.response = res;
                throw error;
            }
        }, err => {
            var errmsg = new Error(err.message);
            throw errmsg;
        })
        .then((res) => res.json())
        .then((data) => dispatch(deleteNotes(data)))
        .catch((err) => console.log(err));
}

export const deleteNotes = (notes) =>({
    type : ActionType.DELETE_NOTE,
    payload : notes
})