import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import Cards from 'react-credit-cards';
import Controls from '../../controls';
import { FIELD_VARIANT } from '../../../constants/AppConstants';

import 'react-credit-cards/es/styles-compiled.css';

import {
    Typography,
    Paper,
    Box,
    Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '18px',
        flexGrow: 1,
    },
    title: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    paper: {
        overflow: 'auto',
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
    setFieldLabel: {
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(12px, -15px) scale(0.9)',
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
    bottomButtons: {
        marginTop: '24px',
    },
    backButton: {
        //borderRadius: '27px',
        padding: '8px 14px', 
    },
    nextButton: {
        float: 'right',
        padding: '8px 14px',
        //borderRadius: '27px',
    },
}));

export default function CreditCardForm({ state, setState, managedErrors, setManagedErrors, setCurrentSection, formSections, format_MMYY_Date }) {
    // styles
    const classes = useStyles();

    const onClickPrev = (e) => {
        setCurrentSection(formSections.TierSelector);
    }
    const onClickNext = (e) => {
        setCurrentSection(formSections.Review);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} >
                <Typography variant="h4" className={classes.title}>Credit Card Information</Typography>
                <Cards
                    number={state.number}
                    name={state.name}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    focused={state.focus}
                />
                <Grid container >
                    <Grid item xs={12} className={`${classes.cardNumberGrid} ${classes.setFieldLabel}`}>
                        <Controls.TextField className={classes.cardNumber}
                            variant={FIELD_VARIANT}
                            type="tel"
                            label="Card Number"
                            name="number"
                            placeholder="Card Number"
                            value={state.number}
                            onChange={e => setState({ ...state, number: e.target.value })}
                            onFocus={e => setState({ ...state, focus: e.target.name })}
                        />
                    </Grid>
                    <Grid item xs={12} className={`${classes.cardNameGrid} ${classes.setFieldLabel}`}>
                        <Controls.TextField className={classes.cardName}
                            variant={FIELD_VARIANT}
                            type="text"
                            name="name"
                            label="Name on card"
                            placeholder="Name on card"
                            value={state.name}
                            onChange={e => setState({ ...state, name: e.target.value })}
                            onFocus={e => setState({ ...state, focus: e.target.name })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.expiryDateGrid}>
                        <Controls.TextField className={`${classes.expiryDate} ${classes.setFieldLabel}`}
                            variant={FIELD_VARIANT}
                            type="text"
                            name="expiry"
                            label="Expiry"
                            placeholder="MM/YY"
                            value={state.expiry}
                            onChange={e => setState({ ...state, expiry: e.target.value })}
                            onFocus={e => setState({ ...state, focus: e.target.name })}
                            onBlur={(e) => {
                                var res = e.target.value.toString().replace(/\D/g, "")
                                if (res.length === 4) {
                                    setState({
                                        ...state,
                                        expiry: format_MMYY_Date(res)
                                    });
                                    setManagedErrors({
                                        ...managedErrors,
                                        cardDate: "",
                                    })
                                }
                                else {
                                    setManagedErrors({
                                        ...managedErrors,
                                        cardDate: "The card date can only contain 4 digits.",
                                    })
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.cvcGrid}>
                        <Controls.TextField className={`${classes.cvc} ${classes.setFieldLabel}`}
                            variant={FIELD_VARIANT}
                            type="tel"
                            name="cvc"
                            label="CVC"
                            placeholder="CVC"
                            value={state.cvc}
                            onChange={e => setState({ ...state, cvc: e.target.value })}
                            onFocus={e => setState({ ...state, focus: e.target.name })}
                        />
                    </Grid>
                </Grid>
                <div className={classes.bottomButtons}>
                    <Controls.Button className={classes.backButton}
                        color='secondary'
                        text="Back"
                        onClick={onClickPrev}
                    />
                    <Controls.Button className={classes.nextButton}
                        color='secondary'
                        text="Next"
                        onClick={onClickNext}
                    />
                </div>
            </Paper>
        </div>
    )
}
