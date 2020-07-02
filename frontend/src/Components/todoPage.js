import React from 'react';
import Header from './header';
import { withStyles, Box, Typography, Grid, colors } from '@material-ui/core';


const Style = (theme) => ({
    paper: {
        margin: theme.spacing(3, 5, 3),
    },
});
let TodoPage = (props) => {
    const { classes } = props;
    return (
        <div>
            <Header user={props.user} />
            {
                props.notes.map((data) => {
                    return (
                        <div className={classes.paper}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Box m={1} bgcolor= "#90caf9" borderRadius={10}>
                                        <h3>{data.title}</h3>
                                        <p>{data.description}</p>
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default withStyles(Style)(TodoPage);