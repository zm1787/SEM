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


export default function BusinessCard({ business }) {

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.cardInfo}>
                    <Typography className={classes.cardText} variant="h5">{business.name}</Typography>
                    <Typography className={classes.cardText} variant="h5">{business.address.full}</Typography>
                    <Typography className={classes.cardText} variant="h5">{business.phoneNumber}</Typography>
                </div>
            </Card>
        </div >
    )
}
