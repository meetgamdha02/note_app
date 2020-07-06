import React, { useEffect, useState } from 'react';
import Header from './header';
import { withStyles, Box, Typography, Grid, colors, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import { randomColor } from 'randomcolor';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
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
});
let TodoPage = (props) => {

    var color = randomColor();
    const [open, setOpen] = useState(false);
    const [id , setId] = useState('');
    const [title , setTitle] = useState('');
    const [noteTitle , setNoteTitle] = useState('');
    const [desc , setdesc] = useState('');
    const handleCloseDialog = () => {
        setOpen(false);
    }
    const handleEditChanges =() =>{
        props.updateNotes(id , noteTitle , desc)
        setOpen(false);
    }

    const { classes } = props;
    return (
        <div>
            <Header user={props.user} logout={props.logout} />
          
            <Grid container spacing={2}>
                {props.notes.map((data) => {
                    
                    return (
                       

                        <Grid item xs={12} sm={4}>
                            <Box bgcolor={color} borderRadius={10} boxShadow={1} p={1} m={3} key={data._id}>
                                <Typography variant="h5" component="h2">
                                    {data.title}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {`Created at ${data.createdAt}`}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {`${data.description.substring(0, 65)}`}
                                </Typography>
                                <Button onClick={()=>{
                                    setOpen(true);
                                    setTitle('Edit');
                                    setNoteTitle(data.title);
                                    setdesc(data.description);
                                    setId(data._id);
                                }}>Edit</Button>
                                <Button>Completed</Button>
                                <Button>Get Reminder</Button>
                            </Box>
                        </Grid>


                    )
                })}

            </Grid>
            <Dialog fullScreen open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                           {`${title} Note`}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleCloseDialog}>
                            {`${title}`}
                        </Button>
                    </Toolbar>
                </AppBar>
                <TextField id="title" name="title" label="Title" variant="outlined" className={classes.dialogText} value = {noteTitle} onChange = {(e)=>{
                    setNoteTitle(e.target.value)
                }}></TextField>
                <TextField id="description" name="description" label="Description" variant="outlined" className={classes.dialogText} value = {desc} onChange = {(e)=>{
                    setdesc(e.target.value)
                }}></TextField>
                <DialogActions>
                    <Button color="primary" onClick={handleCloseDialog}>Cancel</Button>
                    <Button color="primary" onClick={handleEditChanges}>Edit</Button>
                </DialogActions>
            </Dialog>

            <Button color="primary" className={classes.button}>Add Notes</Button>
        </div>
    )
}

export default withStyles(Style)(TodoPage);