import React from 'react'
import { TextField as MuiTextField, FormControl, withStyles, fade } from '@material-ui/core';



const FormTextFieldOutlined = withStyles(theme => ({
    root: {

        '& label.Mui-focused': {
            color: theme.palette.text.primary,
        },
        '& label': {
            marginLeft: theme.spacing(1),
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(12px, -20px) scale(0.9)',
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
            '&:focus-within': {
                boxShadow: `${fade(theme.palette.primary.main, 0.6)} 0 0 4px 2px`,
            },
        },
    },
}))(MuiTextField);

const FormTextFieldFilled = withStyles(theme => ({
    root: {
        '& label.Mui-focused': {
            color: theme.palette.text.white,
        },
        '& label': {
            marginLeft: theme.spacing(1),
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            //transform: 'translate(12px, -13px) scale(0.75)',
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
            //borderRadius: '28px',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                //border: 'none',
            },
            '&:hover': {
                //backgroundColor: theme.palette.background.lighter,
            },
        },
    },
}))(MuiTextField);

function TextField(props) {
    const { variant, label, name, type, value, placeholder, onChange, InputProps, disableEnterSubmit, ...rest } = props

    return (
        variant === "outlined" ?
            rest.multiline ?
                <MuiTextField
                    variant="outlined"
                    label={label}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyPress={e => {
                        if (e.key === 'Enter' && disableEnterSubmit) e.preventDefault();
                    }}
                    InputProps={InputProps}
                    autoComplete="off"
                    {...rest}
                />
                :
                <FormTextFieldOutlined
                    variant="outlined"
                    label={label}
                    name={name}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyPress={e => {
                        if (e.key === 'Enter' && disableEnterSubmit) e.preventDefault();
                    }}
                    InputProps={InputProps}
                    autoComplete="off"
                    {...rest}
                />
            :
            <FormTextFieldFilled
                variant="filled"
                label={label}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onKeyPress={e => {
                    if (e.key === 'Enter' && disableEnterSubmit) e.preventDefault();
                }}
                InputProps={InputProps}
                autoComplete="off"
                {...rest}
            />
    )
}

export default TextField;