import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import Cards from 'react-credit-cards';
import Controls from './controls';
import { FIELD_VARIANT } from '../constants/AppConstants';

import 'react-credit-cards/es/styles-compiled.css';

import {
    Typography,
    Paper,
    Box,
    Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '300px',
        flexGrow: 1,
    },
    formHeader: {
        marginTop: theme.spacing(3),
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    paper: {
        maxWidth: '500px',
        margin: `${theme.spacing(5)}px auto`,
        padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary.main}`,

        [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        },
    },
    cardNumber: {
        width: '100%',
    },
    cardName: {
        width: '100%',
    },
    expiryDate: {
        width: '100%',
    },
    cvc: {
        width: '100%',
    },
    cardNumberGrid: {
        margin: '32px 0 10px 0',
    },
    cardNameGrid: {
        margin: '10px 0 10px 0',
    },
    expiryDateGrid: {
        margin: '10px 0 10px 0',
        paddingRight: '5px',
        [theme.breakpoints.down('xs')]: {
            paddingRight: '0',
        },
    },
    cvcGrid: {
        margin: '10px 0 10px 0',
        paddingLeft: '5px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '0',
        },
    },
}));

export default function CreditCardForm({ states }) {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} >
                <Cards
                    number={states.number}
                    name={states.name}
                    expiry={states.expiry}
                    cvc={states.cvc}
                    focused={states.focus}
                />
                <Grid container >
                    <Grid item xs={12} className={classes.cardNumberGrid}>
                        <Controls.TextField className={classes.cardNumber}
                            variant={FIELD_VARIANT}
                            type="tel"
                            //label="Card number"
                            name="number"
                            placeholder="Card Number"
                            value={states.number}
                            onChange={e => states.setNumber(e.target.value)}
                            onFocus={e => states.setFocus(e.target.name)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.cardNameGrid}>
                        <Controls.TextField className={classes.cardName}
                            variant={FIELD_VARIANT}
                            type="text"
                            //label="Name on Card"
                            name="name"
                            placeholder="Name on card"
                            value={states.name}
                            onChange={e => states.setName(e.target.value)}
                            onFocus={e => states.setFocus(e.target.name)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.expiryDateGrid}>
                        <Controls.TextField className={classes.expiryDate}
                            variant={FIELD_VARIANT}
                            type="text"
                            //label="Expiry date"
                            name="expiry"
                            placeholder="MM/YY"
                            value={states.expiry}
                            onChange={e => states.setExpiry(e.target.value)}
                            onFocus={e => states.setFocus(e.target.name)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.cvcGrid}>
                        <Controls.TextField className={classes.cvc}
                            variant={FIELD_VARIANT}
                            type="tel"
                            //label="CVC"
                            name="cvc"
                            placeholder="CVC"
                            value={states.cvc}
                            onChange={e => states.setCvc(e.target.value)}
                            onFocus={e => states.setFocus(e.target.name)}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
