import React from 'react'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    root: {

    },
    title: {
        marginTop: '50px',
        textAlign: 'center',
    }
})

export default function Home() {
    const classes = useStyles();


    return (
        <div>
            <h2 className={classes.title}>Welcome to the Home Page!</h2>
        </div>
    )
}
