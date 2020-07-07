import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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
let EditNotes = (props) => {

    const { classes } = props;
    const history = useHistory();
    const notes = props.notes[0];
    const [title, setTitle] = useState(notes.title);
    const [desc, setdesc] = useState(notes.description);
    const handleCancel = () => {
        history.replace(`/user/home`)
    }
    const handleEdit = () => {
        props.updateNotes(notes._id , title, desc);
        history.replace(`/user/home`);
    }

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit Notes
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
                onClick={handleEdit}
            > Edit</Button>
        </div>
    )
}

export default withStyles(Style)(EditNotes);