import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
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
        marginTop: theme.spacing(8)
    },
    button: {
        margin: theme.spacing(3, 6, 2)
    },
    link: {
        margin: theme.spacing(3)
    }
});
let UserProfile = (props) => {
    const {classes} = props
    const [disabel , setDisable] = useState(true);
    const history = useHistory();
    const [newName , setnewName] = useState('');
    const [newEmail , setnewEmail] = useState('');
    const [dialog , setdialog] = useState(props.isError ? true : false);
    // console.log(props.user['token']);
    let handleBack = ()=>{
        history.replace(`/user/home`)
    }

    let handleUpdate = () =>{
        setDisable(false);
    }

    let handleChange =()=>{
        props.updateUser(newName , newEmail);
    }
    return (
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    User Profile
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
                                value={disabel ? props.user['user'].username : newName}
                                disabled = {disabel}
                                onChange = {(e)=>{
                                    setnewName(e.target.value)
                                }}
                            >
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                name="email"
                                variant="outlined"
                                label="email"
                                fullWidth
                                value={disabel ? props.user['user'].email : newEmail}
                                disabled = {disabel}
                                onChange = {
                                    (e)=>{
                                        setnewEmail(e.target.value);
                                    }
                                }
                            >
                            </TextField>
                        </Grid>
                       { disabel && <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick = {handleBack}
                            className={classes.button}
                           >
                            Back
                    </Button>}
                       {disabel &&  <Button
                            variant="contained"
                            color="primary"
                            onClick = {handleUpdate}
                            className={classes.button}
                           >
                            Update profile
                    </Button>}

                    {!disabel &&  <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick = {handleChange}
                           >
                            Update Change
                    </Button>}
                    </Grid>
                </form>
            </div>
            <Dialog open={dialog}>
                <DialogTitle>Error while Update</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        Username or email already exists
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick = {()=>setdialog(false)}>OK</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default  withStyles(Style)(UserProfile);