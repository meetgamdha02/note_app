import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";



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

let SignUp = (props) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { classes } = props;
    const {createUser , user} = props;
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(userName , email , password)
        // console.log(user);
       if(user){
           history.push("/home");
       }
    }
    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="username"
                                name="username"
                                variant="outlined"
                                label="User Name"
                                fullWidth
                                value={userName}
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                }}>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                name="email"
                                variant="outlined"
                                label="email"
                                fullWidth
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="password"
                                name="password"
                                variant="outlined"
                                label="Password"
                                fullWidth
                                value={password}
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}>
                            </TextField>
                        </Grid>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.button}
                            onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </form>
                <Link to="/logIn" className={classes.link}>
                    Already have an account ?
               </Link>
            </div>
        </Container>
    )
}

export default withStyles(Style)(SignUp);