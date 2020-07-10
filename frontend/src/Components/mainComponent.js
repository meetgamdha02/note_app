import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter,  } from 'react-router-dom';
import { createUser, tepLogInUser, tempUpdateUser,  tempUpdateNotes , tempAddNote} from '../Redux/ActionCreators';
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
    updateNotes : (id ,  title , description)=>disptach(tempUpdateNotes( id , title , description)),
    addNote : (title , description)=>disptach(tempAddNote(title , description)),
})

 const HomeComponenet = (props) => { 
        return (
            <TodoPage/>
        )
    }
const Main = (props) => {
   
    const login = () => {
        return (
            <LogIn logInUser={props.tepLogInUser} user={props.user.user} isError = {props.user.isError}/>
        )
    }
    const signup = () => {
        return (
            <SignUp createUser={props.createUser} user={props.user.user} isError = {props.user.isError}/>
        )
    }
   
    const UserProfileComponent = () => {
        return (
            <UserProfile user={props.user.user} updateUser={props.tempUpdateUser} isError = {props.user.isError}/>
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
            <AddNotes addNote = {props.addNote} user = {props.user.user}/>
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