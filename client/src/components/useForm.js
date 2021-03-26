import React, { useState } from 'react';
import { useForm as reactUseForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core';

// const normalizePhoneNumber = (value) => {
//     var regex = /^(.{0,3})(.{0,3})(.{0,4})$/;

//     var cleaned = ('' + value).replace(/\D/g, '').substr(0,10) || "";

//     var match = cleaned.match(regex);
//     if (match) {
//         return (
//             ( match[1] ? '(' + match[1] + ( match[1].length === 3 && value.lenght !== 6 ? ') ' : '') : '') + 
//             ( match[2] ? match[2] + ( match[2].length === 3 && value.lenght !== 9 ? '-' : '') : '') + 
//             ( match[3] ? match[3] : '' )
//         )
//     }
//     return ""
// }

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match
    if (cleaned.length === 10) {
        match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
    }
    if (cleaned.length === 11) {
        match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            return '+' + match[1] + '-' + match[2] + '-' + match[3] + '-' + match[4]
        }
    }
    return null
}

function format_MMYY_Date(dateNumberString) {
    var cleaned = ('' + dateNumberString).replace(/\D/g, '')
    var match
    if (cleaned.length === 4) {
        match = cleaned.match(/^(\d{2})(\d{2})$/)
        if (match) {
            return match[1] + '/' + match[2] 
        }
    }
    return null
}

const normalizeCardNumber = (value) => {
    return value.replace(/\s/g).match(/.{1,4}/g).join(" ").substr(0, 19) || ""
}

export function useForm(initialFieldValues, initialManagedErrors) {
    // States
    const [formFieldValues, setFormFieldValues] = useState(initialFieldValues);
    const [managedErrors, setManagedErrors] = useState(initialManagedErrors);

    // Text Fields and Checkboxes
    const onInputChange = (e) => {
        setFormFieldValues({
            ...formFieldValues,
            [e.target.name]: e.target.value
        });
    }

    const onPhoneNumberChange = (e) => {
        var res = e.target.value.toString().replace(/\D/g, "")
        if (res.length === 10 || res.length === 11) {
            setFormFieldValues({
                ...formFieldValues,
                [e.target.name]: formatPhoneNumber(res)
            });
        }
        else {
            setManagedErrors({
                ...managedErrors,
                phoneNumber: "The phone number must be a full 10 or 11 digit number.",
            })
        }
    }

    const onCardNumberChange = (event) => {
        const { value } = event.target;
        setFormFieldValues({
            ...formFieldValues,
            [event.target.name]: normalizeCardNumber(value)
        });
    }

    return {
        formFieldValues,
        setFormFieldValues,
        onInputChange,
        onPhoneNumberChange,
        onCardNumberChange,
        managedErrors,
        setManagedErrors,
        formatPhoneNumber,
        format_MMYY_Date,
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            display: 'block',
            width: '100%',
            margin: `${theme.spacing(3.5)}px auto 0 auto`,

            [theme.breakpoints.down('sm')]: {

            },
        }
    },
}))

export function Form(props) {
    const classes = useStyles();
    if (!props.onSubmit) {
        console.log("Form has no onSubmit function.")
    }

    return (
        <form className={classes.root} onSubmit={props.onSubmit} autoComplete="off">
            {props.children}
        </form>
    )
}

