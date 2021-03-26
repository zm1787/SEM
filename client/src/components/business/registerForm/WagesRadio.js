import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormLabel-root.Mui-focused': {
            color: theme.palette.text.primary,
        }
    },
}))

export default function WagesRadio({name, radioValue, formFieldValues, setFormFieldValues}) {
    const classes = useStyles();

    const handleChange = (event) => {
        setFormFieldValues({
            ...formFieldValues,
            [name]: event.target.value
        });
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Wages</FormLabel>
                <RadioGroup aria-label="wages" name="wages" value={radioValue} onChange={handleChange}>
                    <FormControlLabel value="contract" control={<Radio color="primary"/>} label="Contract" />
                    <FormControlLabel value="hourly" control={<Radio color="primary"/>} label="Hourly wage" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}
