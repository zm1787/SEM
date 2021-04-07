import React, { useState, useEffect } from 'react'
import { Card, makeStyles, Typography, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';

import { loadUserProfile } from '../../actions/authActions';

import profilePic from '../../images/Profile Pic1.png';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        margin: '0 auto 30px auto',
        maxWidth: '500px',
        backgroundColor: theme.palette.background.dark,
    },
    cardInfo: {
        justifyContent: 'center',
    },
    cardText: {
        //color: '#e4e6eb',
        color: theme.palette.text.primary,
    },
    imgContainer: {
        height: '200px',
        width: '200px',
        margin: '0 auto',
        overflow: 'hidden',
        border: `2px solid ${theme.palette.text.primary}`,
        borderRadius: '50%',
    },
    img: {
        margin: '0 auto',
        height: 'auto',
        width: '100%',
    },

}))

function DisplayError(props) {
    return (
        <Alert variant="outlined" severity="error">{props.msg}</Alert>
    )
}

export default function SeekerProfileCard() {
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
    const user = auth.user;
    const [profileInfo, setProfileInfo] = useState({});


    // Refresh user's info when SeekerProfileCard is first rendered
    useEffect(() => {
        dispatch(loadUserProfile());
    }, [dispatch]);

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.cardInfo}>
                    {user ?
                        <>
                        <div className={classes.imgContainer}>
                            <img className={classes.img} src={profilePic} alt=""/>
                        </div>
                            <Typography className={classes.cardText} variant="h5">{user.firstName} {user.lastName}</Typography>
                            <Typography className={classes.cardText} variant="h5">{user.email}</Typography>
                            <Typography className={classes.cardText} variant="h5">{user.userType}</Typography>
                            <Typography className={classes.cardText} variant="h5">{user.location.country}</Typography>
                            <Typography className={classes.cardText} variant="h5">{user.location.province}</Typography>
                            <Typography className={classes.cardText} variant="h5">{user.location.city}</Typography>
                        </>
                        :
                        <Box>
                            <DisplayError msg={"No user loaded!"} />
                        </Box>
                    }
                </div>
            </Card>
        </div >
    )
}
