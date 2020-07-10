import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { DialogContent, DialogActions, DialogTitle, DialogContentText , Dialog } from '@material-ui/core';
const Style = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {

        margin: theme.spacing(3, 3, 3)
    },
    button: {
        margin: theme.spacing(3, 0, 2)
    },
    link: {
        margin: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(3, 3, 2)
    }
});

let AddNotes = (props) => {

    const { classes } = props;
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [desc, setdesc] = useState('');
    const [dialog , setdialog] = useState(props.user ? false : true)
    const handleCancel = () => {
        history.replace(`/user/home`)
    }
    const handleAdd = () => {
        props.addNote(title, desc);
        history.replace(`/user/home`);
    }

    const handleDialog = () =>{
        setdialog(false);
        history.replace(`/logIn`)
    }
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Add Notes
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            name="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={5}
                            required
                            value={desc}
                            onChange={(e) => setdesc(e.target.value)}
                        />
                    </Grid>

                </Grid>
            </div>
            <Button color="primary"
                onClick={handleCancel}
                variant="contained"
                className={classes.button}>
                Cancel</Button>
            <Button color="primary"
                variant="contained"
                className={classes.button}
                onClick={handleAdd}
            > Add</Button>

            <Dialog open={dialog}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        You are not authenticated , Please Log in to continue
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick = {handleDialog}>OK</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default withStyles(Style)(AddNotes);