import React from 'react'
import { Button as MuiButton, withStyles } from '@material-ui/core';

const ContainedButton = withStyles(theme => ({
    root: {
        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
        textTransform: 'none',
        fontSize: '1.1rem',
    },
}))(MuiButton);

const OutlinedButton = withStyles(theme => ({
    root: {
        '&:hover': {
            color: 'inherit',
        },
        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
    },
}))(MuiButton);

export default function Button(props) {
    const { text, size, color, variant, onClick, ...other } = props;


    return (
        !variant || variant === "contained" ?
            <ContainedButton
                variant="contained"
                size={size || "large"}
                color={ color || "primary" }
                onClick={onClick}
                {...other}
            >
                {text}
            </ContainedButton>
            :
            <OutlinedButton
                variant="outlined"
                size={size || "large"}
                onClick={onClick}
                {...other}
            >
                {text}
            </OutlinedButton>
    )
}
