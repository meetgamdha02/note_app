import React, { useState, useEffect } from 'react';
import Header from './header';
import { useHistory } from 'react-router-dom';
import { withStyles, Box, Typography, Grid, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Style = (theme) => ({
    paper: {
        margin: theme.spacing(3, 0, 3),
    },
    button: {
        margin: theme.spacing(5),
        display: "flex",
        // flexDirection: "column",
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
            <Header user={props.user}
                logout={props.logout} />
            {props.notes.length == 0 ? <EmptyTag classes = {classes}/> :
                <Grid container spacing={1}>
                    {props.notes.map((data) => {
                        return (
                            <Grid item xs={12} sm={4}>
                                <Box bgcolor="primary"
                                    border={1}
                                    borderRadius={10}
                                    boxShadow={1} p={1} m={3}
                                    key={data._id}>
                                    <Typography variant="h5" component="h2">
                                        {data.title}
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        {`Created at ${data.createdAt}`}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {`${data.description.substring(0, 65)}`}
                                    </Typography>
                                    <Button onClick={() => {
                                        handleEditClick(data)
                                    }}>Edit</Button>
                                    <Button onClick={
                                        () => handleDelete(data)
                                    }>Completed</Button>
                                    <Button>Get Reminder</Button>
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
        </div>
    )
}

export default withStyles(Style)(TodoPage);