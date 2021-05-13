import React, {useEffect} from 'react'
import profilePic from '../../images/Profile Pic1.png';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    secondaryText: {
        color: theme.palette.text.secondary,
    },
}))

const Contact = ({ contact }) => {
    const classes = useStyles();

    // useEffect(() => {
    //    contact.m
    // }, [contact])

    return (
        <div className="contact-root">
            <div className="img-container">
                <img className="img" src={profilePic} alt="" />
            </div>
            <div className="contact-info">
                <Typography>{contact.name}</Typography>
                <Typography /*className="last-message-preview"*/ className={`${classes.secondaryText} last-message-preview`} >{contact.lastMessage}</Typography>
            </div>
        </div>
    )
}

export default Contact
