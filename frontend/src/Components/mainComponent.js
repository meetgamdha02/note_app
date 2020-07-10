import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import { createUser, tepLogInUser, tempUpdateUser, tempDisplayNotes , logOutUser  , tempUpdateNotes , tempAddNote , tempDelNotes} from '../Redux/ActionCreators';
import LogIn from './logIn';
import SignUp from './signUp';
import UserProfile from './userProfile';
import TodoPage from './todoPage';
import EditNotes from './editNotes';
import AddNotes from './addNotes';
const mapStateToProps = (state) => {
    return {
        user: state.user,
        notes: state.notes
    }
}
const mapDispacherToProps = (disptach) => ({
    createUser: (username, email, password) => disptach(createUser(username, email, password)),
    tepLogInUser: (username, password) => disptach(tepLogInUser(username, password)),
    tempUpdateUser: (username, email) => disptach(tempUpdateUser( username, email)),
    displayNotes: () => disptach(tempDisplayNotes()),
    logOut : ()=>(disptach(logOutUser())),
    updateNotes : (id ,  title , description)=>disptach(tempUpdateNotes( id , title , description)),
    addNote : (title , description)=>disptach(tempAddNote(title , description)),
    deleteNotes : (id)=>disptach(tempDelNotes(id))
})

const Main = (props) => {
  
    useEffect(()=>{
        props.displayNotes()
        return ()=>{
    
        }
    } , [])
   
    const login = () => {
        return (
            <LogIn logInUser={props.tepLogInUser} user={props.user.user} isError = {props.user.isError}/>
        )
    }
    const signup = () => {
        return (
            <SignUp createUser={props.createUser} user={props.user.user} />
        )
    }
    const HomeComponenet = ({ match }) => {
        return (
            <TodoPage user={props.user.user}
             notes = {props.notes.notes} logout = {props.logOut} deleteNotes = {props.deleteNotes}/>
        )
    }
    const UserProfileComponent = () => {
        return (
            <UserProfile user={props.user.user} updateUser={props.tempUpdateUser} />
        )
    }

    const EditNotesFun = ({match}) =>{
        return(
            <EditNotes notes = {props.notes.notes.filter((notes)=>notes._id === match.params.id)}
            updateNotes = {props.updateNotes}/>
        )
    }

    const AddNoteFun = () =>{
        return (
            <AddNotes addNote = {props.addNote}/>
        )
    }
    
    return (
        <Switch>
            <Route path="/logIn" component={login}></Route>
            <Route path="/signUp" component={signup}></Route>
            <Route exact path="/user/home" component={HomeComponenet}></Route>
            <Route path="/user/profile" component={UserProfileComponent} />
            <Route path = "/user/home/:id/edit" component = {EditNotesFun}/>
            <Route path = "/user/home/addNote" component = {AddNoteFun}/>
            <Redirect to="/home"></Redirect>
        </Switch>
    )
}

export default withRouter(connect(mapStateToProps, mapDispacherToProps)(Main));