import React from 'react'
import { withStyles } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CostomDatePickerOutlined = withStyles(theme => ({
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
const CostomDatePickerFilled = withStyles(theme => ({
    root: {
        '& .MuiPickersBasePicker-pickerView': {
            backgroundColor: theme.palette.background.dark,
        },
        '& .MuiInputBase-root': {
            width: '100%',
            backgroundColor: theme.palette.background.field,
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
    const { variant, name, label, value, onChange, error } = props;

    const convertToDefEventPara = (name, value) => ({
        target: {
            name,
            value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {variant === "outlined" ?

                error ?
                    <>
                        <CostomDatePickerOutlined inputVariant="outlined"
                            error
                            label={label}
                            name={name}
                            format="yyyy/MM/dd"
                            value={value}
                            helperText="Must be 18 or older"
                            onChange={date => onChange(convertToDefEventPara(name, date))}
                        />
                    </>
                :
                    <CostomDatePickerOutlined inputVariant="outlined"
                        label={label}
                        name={name}
                        format="yyyy/MM/dd"
                        value={value}
                        onChange={date => onChange(convertToDefEventPara(name, date))}
                    />
            :
                error ?
                    <>
                        <CostomDatePickerFilled inputVariant="filled"
                            error
                            label={label}
                            name={name}
                            format="yyyy/MM/dd"
                            value={value}
                            helperText="Must be 18 or older"
                            onChange={date => onChange(convertToDefEventPara(name, date))}
                        />
                    </>
                :
                    <CostomDatePickerFilled inputVariant="filled"
                        label={label}
                        name={name}
                        format="yyyy/MM/dd"
                        value={value}
                        onChange={date => onChange(convertToDefEventPara(name, date))}
                    />
            }
        </MuiPickersUtilsProvider>
    )
}
