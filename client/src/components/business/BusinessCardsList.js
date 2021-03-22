import React from 'react'
import BusinessCard from './BusinessCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}))

export default function BusinessCardsList( {users} ) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {users.map((user) => {
                return (
                    <BusinessCard key={user._id} user={user} />
                )
            })}
        </div>
    )
}



