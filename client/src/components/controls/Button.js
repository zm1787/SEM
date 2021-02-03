import React from 'react'
import { Button as MuiButton, withStyles } from '@material-ui/core';

const CustomButton = withStyles(theme => ({
    root: {
        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
    },
}))(MuiButton);

export default function Button(props) {
    const { text, size, color, variant, onClick, ...other } = props;

    return (
        <CustomButton
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            {...other}
        >
            {text}
        </CustomButton>
    )
}
