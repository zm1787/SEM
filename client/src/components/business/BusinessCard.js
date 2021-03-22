import React from 'react'
import { Card, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles( theme => ({
    root: {
        padding: theme.spacing(2),
        margin: '0 auto 30px auto',
        maxWidth: '300px',
        backgroundColor: theme.palette.background.dark,
    },
    cardInfo: {
        justifyContent: 'center',
    },
    cardText: {
        //color: '#e4e6eb',
        color: theme.palette.text.main,
    }
}))


export default function BusinessCard(props) {

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.cardInfo}>
                    <Typography className={classes.cardText} variant="h5">{props.user.firstName} {props.user.lastName}</Typography>
                    <Typography className={classes.cardText} variant="h5">{props.user.userType}</Typography>
                    <Typography className={classes.cardText} variant="h5">{props.user.profession}</Typography>
                </div>
            </Card>
        </div >
    )
}
