import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = () => {
    history.replace(`/user/profile`)
  }
  const handleLogOut = () => {
    props.logout();
    history.replace(`/logIn`)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
          <Button color="inherit" onClick={handleClick}>{props.user ? props.user['user'].username : ""}</Button>
          <Button color="inherit" onClick={handleLogOut}>LOG OUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}