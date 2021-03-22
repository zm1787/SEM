import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Controls from './';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
};

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};



export default function MaskedField({ fieldType, name, label, variant, value, setValue }) {
    const classes = useStyles();
    // const [values, setValues] = React.useState({
    //     textmask: '(   )    -    ',
    //     numberformat: '0.00',
    // });

    const handleChange = (event) => {
        console.log(value);
        console.log(event.target.name);
        console.log(event.target.value);
        setValue({
            ...value,
            [event.target.name]: event.target.value,
        });
    };

    function SelectedField() {
        switch (fieldType) {
            case 'phoneNumber':
                return (
                    <FormControl>
                        <InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
                        <Controls.TextField
                            variant={variant}
                            label={label}
                            value={value.textmask}
                            name={name}
                            onChange={handleChange}
                            id="formatted-text-mask-input"
                            InputProps={{
                                inputComponent: TextMaskCustom,
                            }}

                        />
                    </FormControl>
                );
            case 'money':
                return (
                    <Controls.TextField
                        variant={variant}
                        label={label}
                        value={value.numberformat}
                        onChange={handleChange}
                        name={name}
                        id="formatted-numberformat-input"
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}

                    />
                );

            default:
                return <p>No valid input type was passed to component MaskedField!</p>;
        }
    }

    return (
        <div className={classes.root}>
            <SelectedField />
        </div>
    );
}
