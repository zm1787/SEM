import { AppBar, Toolbar, Typography } from '@material-ui/core'
import React from 'react';

import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiToolbar-gutters': {
            //padding: 0,
        },
        height: '64px',
        backgroundColor: theme.palette.background.dark,
    },
    gridContainer: {
        height: '100%',
        margin: 0,
    },
    logoText: {
        color: theme.palette.primary.main,
        textAlign: 'center',

    },
    logoCell: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `2px solid ${theme.palette.background.darker}`,
    },

}))

export default function NavBar() {
    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.root} position="fixed">
                {/* <Toolbar className={classes.gridContainer} disableGutters> */}
                <Grid className={classes.gridContainer} container alignItems="center">
                    <Grid className={classes.logoCell} item sm={1} >
                        <Typography className={classes.logoText} variant="h4">SEM</Typography>
                    </Grid>
                    <Grid item sm={11} >

                    </Grid>
                </Grid>
                {/* </Toolbar> */}
            </AppBar>
            <Toolbar />
        </div>
    )
}
