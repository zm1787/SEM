import React from 'react'
import { withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


const CustomDropdownFieldOutlined = withStyles(theme => ({
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
}))(Autocomplete);

const CustomDropdownFieldFilled = withStyles(theme => ({
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
}))(Autocomplete);

function DropdownField(props) {
    const { variant, ...rest } = props

    return (
        variant === "outlined" ?
            <CustomDropdownFieldOutlined
                {...rest}
            />
            :
            <CustomDropdownFieldFilled
                {...rest}
            />
    )
}

export default DropdownField;