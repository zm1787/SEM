import React from 'react'
import SpecialistCard from './SpecialistCard';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}))

export default function SpecialistCardsList( {users} ) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {users.map((user) => {
                return (
                    <SpecialistCard key={user._id} user={user} />
                )
            })}
        </div>
    )
}



