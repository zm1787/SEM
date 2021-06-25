import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyBusinesses } from '../actions/businessActions';
import { useHistory, Link } from "react-router-dom";

// Material UI
import { makeStyles, Paper, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    header: {
        padding: '20px 0',
        marginBottom: '24px',
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    sectionTitle: {
        marginTop: theme.spacing(3),
        color: theme.palette.text.primary,
        textAlign: 'left',
    },
    paper: {
        overflow: 'auto',
        width: '50vw',
        maxWidth: '500px',
        margin: `${theme.spacing(5)}px auto`,
        padding: `0px 0px`,
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down('lg')]: {
            width: 'calc(100vw - ((100vw - 100%)/2))',
            margin: `${theme.spacing(5)}px auto`,
        },
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
            margin: `${theme.spacing(5)}px auto`,
        },
    },
    businessList: {
        margin: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
        "& a": {
            color: theme.palette.text.primary,
            '&:hover': {
                textDecoration: 'none',
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginRight: '8px',
            marginLeft: '8px',
        },
    },
    businessItem: {
        borderRadius: '7px',
        border: `2px solid ${theme.palette.secondary.dark}`,
        padding: '10px',
        margin: `${theme.spacing(2)}px 0px`,
        transition: '0.15s ease-in-out',
        '&:hover': {
            cursor: 'pointer',
            //transitionTimingFunction: 'ease-in-out',
            transform: 'translate(0px, 3px)',
        },
    },
    registerBusinessButton: {
        display: 'block',
        margin: '0 auto',
    },
}));

export default function MyBusinessList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((store) => store.auth);
    const businesses = useSelector((store) => store.business.myBusinessList);

    // If user not logged in, go to home page
    useEffect(() => {
        if (!auth.isAuthenticated) {
            history.push("/");
        }
    }, [auth.isAuthenticated, history])

    useEffect(() => {
        dispatch(fetchMyBusinesses());
    }, [dispatch, auth]);

    const onClick = (event) => {
        history.push("/register-business")
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3}>
                {businesses.length !== 0 ?
                    <h2 className={classes.header}>My Businesses</h2>
                    :
                    <div>
                        <h3 className={classes.header}>You do not have any business registered.</h3>
                        <Button className={classes.registerBusinessButton} variant="contained" color="primary" onClick={onClick}>Register a business now!</Button>
                    </div>
                }
                <div className={classes.businessList}>
                    {businesses.length !== 0 ?
                        businesses.map((business, index) => {
                            return (
                                <Link key={business._id} to={{
                                    pathname: '/view-my-business',
                                    state: {
                                        businessID: business._id
                                    }
                                }}
                                    className={classes.logoTextLink}
                                >
                                    <Typography key={business._id} variant="body1" className={classes.businessItem}>{business.name}</Typography>
                                </Link>
                            );
                        })
                        :
                        <div>
                            <Typography></Typography>
                        </div>
                    }
                </div>
            </Paper>
        </div>
    )
}
