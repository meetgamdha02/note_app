import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { URL } from '../config/urls'
const Style = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    button: {
        margin: theme.spacing(3, 0, 2)
    },
    link: {
        margin: theme.spacing(3)
    }
});
let LogIn = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPasswod] = useState('');
    // const [text, setText] = useState('');

    // useEffect(() => {
    //     return fetch(URL + 'users', {
    //         method: 'GET',
    //         credentials : 'same-origin'
    //     })
    //         .then((res) => res.text())
    //         .then((data) => setText(data))
    //         .catch((err)=>setText(err))
    // }, [])
    const { classes } = props;
    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Log In
               </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="username"
                                name="username"
                                label="User Name"
                                variant="outlined"
                                fullWidth
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                fullWidth value={password}
                                onChange={(e) => {
                                    setPasswod(e.target.value)
                                }} />
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.button}>
                            Submit
                        </Button>
                    </Grid>
                </form>
                <Link to="/signUp" className={classes.link}>Create A new Account</Link>
            </div>
        </Container>
    )
}

export default withStyles(Style)(LogIn);