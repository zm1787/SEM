import React from 'react'
import { TextField as MuiTextField, withStyles } from '@material-ui/core';

const FormTextField = withStyles(theme => ({
    root: {
        //WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.field} inset`,
        '& label.Mui-focused': {
            color: theme.palette.text.white,
        },
        '& label': {
            marginLeft: theme.spacing(1),
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(12px, -13px) scale(0.75)',
        },
        '& .MuiFormHelperText-contained': {
            marginLeft: '21px',
        },
        '& .MuiOutlinedInput-input': {
            marginLeft: theme.spacing(1),
        },
        '& .MuiInputBase-root': {
            width: '100%',
            backgroundColor: theme.palette.background.field,
            borderRadius: '28px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none',
            },
            '&:hover': {
                //backgroundColor: theme.palette.background.lighter,
            },
        },
    },
}))(MuiTextField);

export default function TextField(props) {
    const { variant, label, name, type, value, placeholder, onChange, InputProps } = props

    return (
        <FormTextField
            variant={variant || "outlined"}
            label={label}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            InputProps={InputProps}
        />
    )
}
