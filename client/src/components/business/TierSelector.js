import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TierCard from './TierCard';

import {
    Typography,
    Paper,
    Grid,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('md')]: {
            margin: `${theme.spacing(3)} auto`,
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {

        },
    },
    paper: {
        maxWidth: '700px',
        height: '700px',
        margin: `${theme.spacing(5)}px auto`,
        padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary.main}`,

        [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        },
    },
    title: {
        marginTop: theme.spacing(1),
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    gridRoot: {
        height: '85%',
        // '& .MuiGrid-container': {
        //     height: '100%',
        // },
    },
    radioGridItem: {
        //border: `2px solid ${theme.palette.primary.main}`,
        // minHeight: '500px',
    },
    tierCardGridItem: {

    },
    formControl: {
        // paddingTop: '100px',
    },
}))

const styles = {
    bronze: {
        color: '#CD7F32',
        '&$checked': {
            color: '#CD7F32',
        },
    },
    silver: {
        color: '#C0C0C0',
        '&$checked': {
            color: '#C0C0C0',
        },
    },
    gold: {
        color: '#FFD700',
        '&$checked': {
            color: '#FFD700',
        },
    },
}

export default function TierSelector() {
    const classes = useStyles();
    const [value, setValue] = React.useState('bronze');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} >
                <Typography variant="h4" className={classes.title}>Select Tier</Typography>
                <Grid container className={classes.gridRoot} alignItems="center" justify="center">
                    <Grid item sm={12} md={4} className={classes.radioGridItem}>
                        <FormControl component="fieldset" className={classes.formControl}>
                            {/* <FormLabel component="legend">Business Tier</FormLabel> */}
                            <RadioGroup aria-label="tier" name="tier" value={value} onChange={handleChange}>
                                <FormControlLabel
                                    value="bronze"
                                    control={<Radio style={styles.bronze} />}
                                    label="Bronze" />
                                <FormControlLabel
                                    value="silver"
                                    control={<Radio style={styles.silver} />}
                                    label="Silver" />
                                <FormControlLabel
                                    value="gold"
                                    control={<Radio style={styles.gold} />}
                                    label="Gold" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item sm={12} md={8} className={classes.tierCardGridItem}>
                        <TierCard tier={value}/>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
