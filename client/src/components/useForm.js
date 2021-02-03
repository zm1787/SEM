import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';

export function useForm(initialFieldValues) {
    const [formFieldValues, setFormFieldValues] = useState(initialFieldValues);

    // Text Fields and Checkboxes
    const onInputChange = (e) => {
        setFormFieldValues({
            ...formFieldValues,
            [e.target.name]: e.target.value
        });
    }

    return {
        formFieldValues,
        setFormFieldValues,
        onInputChange,
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            display: 'block',
            width: '90%',
            margin: `${theme.spacing(3)}px auto 0 auto`,
            
            [theme.breakpoints.down('sm')]: {
                
            },
        }
    },
}))

export function Form(props) {
    const classes = useStyles();
    if(!props.onSubmit) {
        console.log("Form has no onSubmit function.")
    }

    return (
        <form className={classes.root} onSubmit={props.onSubmit} autoComplete="off">
            {props.children}
        </form>
    )
}

