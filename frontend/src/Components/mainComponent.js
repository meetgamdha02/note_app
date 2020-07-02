import React , { useState, useCallback } from 'react';
import {connect , useDispatch} from 'react-redux';
import {Route , Switch, Redirect , withRouter} from 'react-router-dom';
import {createUser , tepLogInUser , tempUpdateUser} from '../Redux/ActionCreators';
import LogIn from './logIn';
import SignUp from './signUp';
import Home from './home'
import UserProfile from './userProfile';
const mapStateToProps = (state)=>{
    return{
        user : state.user
    }
}
const mapDispacherToProps = (disptach) =>({
    createUser : (username , email , password)=>disptach(createUser(username , email , password)),
    tepLogInUser : (username , password) => disptach(tepLogInUser(username , password)),
    tempUpdateUser : (token , username , email)=>disptach(tempUpdateUser(token , username , email))
})

const Main = (props)=>{
    {console.log(props.user.user)}
    const login = () =>{
        return (
            <LogIn logInUser = {props.tepLogInUser} user = {props.user.user}/>
        )
    }
    const signup = () =>{
        return(
            <SignUp createUser = {props.createUser} user = {props.user.user}/>
        )
    }
    const HomeComponenet = ({match}) =>{
        return (
            <Home user = {props.user.user}/>
        )
    }
    const UserProfileComponent = () =>{
        return(
            <UserProfile user = {props.user.user} updateUser = {props.tempUpdateUser}/>
        )
    }
    return(
        <Switch>
            <Route path = "/logIn" component = {login}></Route>
            <Route path = "/signUp" component = {signup}></Route>
            <Route path = "/user/home" component = {HomeComponenet }></Route>
            <Route path  = "/user/profile" component = {UserProfileComponent}/>
            <Redirect to = "/home"></Redirect>
        </Switch>
    )
}

export default withRouter(connect(mapStateToProps , mapDispacherToProps)(Main));