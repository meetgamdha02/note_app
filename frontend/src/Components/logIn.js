import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from '@material-ui/core/CircularProgress';
import { DialogContent, DialogActions, DialogTitle, DialogContentText , Dialog } from '@material-ui/core';

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
let LogInComponent = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPasswod] = useState('');
    const [dialog , setdialog] = useState(props.isError ? true : false);
    const history = useHistory();
    useEffect(() => {
        if (props.user) history.replace(`/user/home`);
    }, [props.user])
    const handleSubmit = (e) => {
        e.preventDefault();
        props.logInUser(userName, password);
        // console.log(props.user.username);
    }
    const  classes  = props.classes;
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
                            onClick={handleSubmit}
                            className={classes.button}>
                            Submit
                        </Button>
                    </Grid>
                </form>
                <Link to="/signUp" className={classes.link}>Create A new Account</Link>
            </div>
            <Dialog open={dialog}>
                <DialogTitle>Error while LogIn</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Please check your email or password
                        {/* {console.log(props.isError ? props.isError.response.statuste : "")} */}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick = {()=>setdialog(false)}>OK</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

var LogIn = (props) =>{
    const {classes} = props;
    return(
        props.isLoading ? <CircularProgress/>: <LogInComponent classes = {classes} logInUser={props.logInUser} 
        user={props.user} 
        isError = {props.isError} 
        />
    )
}
export default withStyles(Style)(LogIn);