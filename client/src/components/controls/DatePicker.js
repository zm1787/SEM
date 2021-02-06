import React from 'react'
import { withStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CostomDatePicker = withStyles(theme => ({
    root: {
        '& .MuiPickersBasePicker-pickerView': {
            backgroundColor: theme.palette.background.dark,
        },
        '& .MuiInputBase-root': {
            width: '100%',
            backgroundColor: theme.palette.background.field,
            borderRadius: '28px',
        },
        '& .MuiOutlinedInput-input': {
            marginLeft: theme.spacing(1),
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(12px, -13px) scale(0.75)',
        },
        '& .MuiFormHelperText-contained': {
            marginLeft: '21px',
            fontSize: '.9rem',
        },
        '& label.Mui-focused': {
            color: theme.palette.text.white,
        },
        '& label': {
            marginLeft: theme.spacing(1),
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
}))(KeyboardDatePicker);

export default function DatePicker(props) {
    const { name, label, value, onChange, error } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {error ?
                <>
                    <CostomDatePicker inputVariant="outlined"
                        error
                        label={label}
                        name={name}
                        format="yyyy/MM/dd"
                        value={value}
                        helperText="Must be 18 or older"
                        onChange={date => onChange(convertToDefEventPara(name, date))}
                    />
                    {/* <p class="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled">Must be 18 or older</p> */}
                </>
            :
                <CostomDatePicker inputVariant="outlined"
                    label={label}
                    name={name}
                    format="yyyy/MM/dd"
                    value={value}
                    onChange={date => onChange(convertToDefEventPara(name, date))}
                />}
        </MuiPickersUtilsProvider>
    )
}
