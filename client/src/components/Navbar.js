import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';


import Controls from './controls/';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiToolbar-gutters': {
            //padding: 0,
        },
        height: '64px',
        backgroundColor: theme.palette.background.nav,
    },
    gridContainer: {
        height: '100%',
        margin: 0,
    },
    logoText: {
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    logoTextLink: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
    logoCell: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRight: `2px solid ${theme.palette.background.default}`,
    },
    loginButton: {
        borderRadius: '27px',
        textTransform: 'none',
        fontSize: '1rem',
        borderWidth: '2px',
        transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
        },
        margin: `0 ${theme.spacing(0.5)}px`,
    },
    logoutButton: {
        borderRadius: '27px',
        textTransform: 'none',
        fontSize: '1rem',
        borderWidth: '2px',
        transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
        },
        margin: `0 ${theme.spacing(0.5)}px`,
    },
    RegisterButton: {
        borderRadius: '27px',
        textTransform: 'none',
        fontSize: '1rem',
        margin: `0 ${theme.spacing(0.5)}px`,
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
        },
    },
    buttonSpan: {
        float: 'right',
    },
}))

export default function NavBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);

    const logout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    }

    return (
        <div>
            <AppBar className={classes.root} position="fixed">
                {/* <Toolbar className={classes.gridContainer} disableGutters> */}
                <Grid className={classes.gridContainer} container alignItems="center">
                    <Grid className={classes.logoCell} item sm={1} >
                        <Link to="/" className={classes.logoTextLink}>
                            <Typography className={classes.logoText} variant="h4">SEM</Typography>
                        </Link>
                    </Grid>
                    <Grid item sm={9} className={classes.buttons} >
                        {auth.isAuthenticated ?
                            <span className={classes.buttonSpan}>
                                <Controls.Button className={classes.logoutButton}
                                    variant="outlined"
                                    text="Log out"
                                    onClick={logout}
                                />
                            </span>
                            :
                            <span className={classes.buttonSpan}>
                                <Controls.Button className={classes.loginButton}
                                    component={Link}
                                    to="/login"
                                    variant="outlined"
                                    text="Log In"
                                />
                                <Controls.Button className={classes.RegisterButton}
                                    component={Link}
                                    to="/register"
                                    variant="filled"
                                    text="Register"
                                />
                            </span>
                        }
                    </Grid>
                    <Grid item sm={2} >

                    </Grid>
                </Grid>
                {/* </Toolbar> */}
            </AppBar>
            <Toolbar />
        </div>
    )
}
