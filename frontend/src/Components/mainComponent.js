import React , {useState} from 'react';
import {Route , Switch, Redirect} from 'react-router-dom';
import LogIn from './logIn';
import SignUp from './signUp'
export const Main = (props)=>{
    return(
        <Switch>
            <Route path = "/logIn" component = {LogIn}></Route>
            <Route path = "/signUp" component = {SignUp}></Route>
            <Redirect to = "/logIn"></Redirect>
        </Switch>
    )
}