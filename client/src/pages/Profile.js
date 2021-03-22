import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core';

// Components
import SeekerProfileCard from '../components/seeker/SeekerProfileCard';

const useStyles = makeStyles({
    root: {

    },
    title: {
        marginTop: '50px',
        textAlign: 'center',
    }
})

export default function Profile() {
    const history = useHistory();
    const auth = useSelector((store) => store.auth);
    const classes = useStyles();

    // If user not logged in, go to home page
    useEffect(() => {
        if(!auth.isAuthenticated) {
            history.push("/");
        }
    }, [auth.isAuthenticated, history])

    return (
        <div>
            <h2 className={classes.title}>Your Profile!</h2>
            <SeekerProfileCard />
        </div>
    )
}
