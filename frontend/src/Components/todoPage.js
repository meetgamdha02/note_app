import React, { useState, useEffect } from 'react';
import Header from './header';
import { useHistory , withRouter } from 'react-router-dom';
import { withStyles, Box, Typography, Grid, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect } from 'react-redux';
import { tempDisplayNotes , logOutUser  , tempDelNotes} from '../Redux/ActionCreators';
import { DialogContent, DialogActions, DialogTitle, DialogContentText , Dialog } from '@material-ui/core'; 

const mapStateToProps = (state) => {
    return {
        user: state.user,
        notes: state.notes
    }
}

const mapDispacherToProps = (disptach) =>({
    deleteNotes : (id)=>disptach(tempDelNotes(id)),
    displayNotes: () => disptach(tempDisplayNotes()),
    logOut : ()=>(disptach(logOutUser())),
})

const Style = (theme) => ({
    paper: {
        margin: theme.spacing(3, 0, 3),
    },
    button: {
        margin: theme.spacing(5),
        display: "flex",
        alignItems: "center"
    },
    pos: {
        marginBottom: 12
    },
    dialogText: {
        margin: theme.spacing(2)
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    floatingButton: {
        position: 'fixed',
        bottom: 10,
        right: 10
    },
    emptyTaxt : {
        margin : theme.spacing(25),
        color : "#999999"
    }
});

let EmptyTag = (props) => {
    return (
        <div className = {props.classes.emptyTaxt}>
            <Grid container spacing = {3}>
                <Grid item xs = {12} md = {12}>
                    <Typography variant="h4" component="h2">
                        You do not have any notes , add by clicking on Add button !!
                    </Typography>

                </Grid>
            </Grid>
        </div>
    )
}



let TodoPage = (props) => {
    const history = useHistory();
   
    useEffect(()=>{
        props.displayNotes()
    } , [])
    const [dialog , setdialog] = useState(props.notes.isError ? true : false);
    const handleEditClick = (data) => {
        // setId(data._id)
        history.replace(`/user/home/${data._id}/edit`)
    }
    const handleDelete = (data) => {
        props.deleteNotes(data._id);
    }
    const { classes } = props;
    return (
        <div>
            <Header user={props.user.user}
                logout={props.logOut} />
            {props.notes.notes.length === 0 ? <EmptyTag classes = {classes}/> :
                <Grid container spacing={1}>
                    {props.notes.notes.map((data) => {
                        return (
                            <Grid item xs={12} sm={12}>
                                <Box bgcolor="primary"
                                    boxShadow = {2}
                                    borderRadius = {2}
                                    p={1} m={2}
                                    key={data._id}>
                                    <Typography variant="h5" component="h2">
                                        {data.title}
                                    </Typography>
                                    {/* <Typography className={classes.pos} color="textSecondary">
                                        {`Created at ${data.createdAt}`}
                                    </Typography> */}
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {`${data.description.substring(0, 65)}`}
                                    </Typography>
                                    <Button size = "small"
                                    color = "primary" 
                                    onClick={() => {
                                        handleEditClick(data)
                                    }} >Edit</Button>
                                    <Button size = "small"
                                    color = "primary"  
                                    onClick={
                                        () => handleDelete(data)
                                    }>Completed</Button>
                                    <Button size = "small"
                                    color = "primary" >Get Reminder</Button>
                                </Box>
                            </Grid>
                        )
                    })
                    }

                </Grid>
            }
            <IconButton color="primary" aria-label="Add todo"
                className={classes.floatingButton}
                onClick={() => {
                    history.replace(`/user/home/addNote`)
                }}>
                <AddCircleIcon style={{ fontSize: 60 }} />
            </IconButton>

            <Dialog open={dialog}>
                <DialogTitle>Error while Sign Up</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Username or email already exists
                        
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick = {()=>setdialog(false)}>OK</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default withRouter(connect(mapStateToProps , mapDispacherToProps)(withStyles(Style)(TodoPage)));