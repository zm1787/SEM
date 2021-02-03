import React from 'react'
import { Checkbox as MuiCheckbox, Divider, FormControlLabel as MuiFormControlLabel, withStyles } from '@material-ui/core';

const FormControlLabel = withStyles(theme => ({
    root: {
        marginLeft: theme.spacing(4),
    },
}))(MuiFormControlLabel);

export default function Checkbox(props) {
    const { checked, onChange, name, color, label } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value
        }
    })

    return (
        <FormControlLabel
            control={
                <MuiCheckbox
                    checked={checked}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                    name={name}
                    color={color}
                />
            }
            label={label}
        />
    )
}
