import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import { useForm, Form } from '../useForm';
import Controls from '../controls';

// Actions
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { REGISTER_FAIL } from '../../actions/actionTypes';

// Material UI
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    Typography,
    Paper,
    Grid,
    TextField,
} from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    formHeader: {
        marginTop: theme.spacing(3),
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    paper: {
        maxWidth: '950px',
        margin: `${theme.spacing(5)}px auto`,
        padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
        backgroundColor: theme.palette.background.paper,

        [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        },
    },
    gridContainer: {
        flexGrow: 1,
    },
    multiTxtFieldContainer: {
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
    },
    multiTxtField2: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: 'none',
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '400px',
            maxWidth: '48%',
            minWidth: '200px',
        },
    },
    multiTxtField3: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: 'none',
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '400px',
            maxWidth: '48%',
            minWidth: '200px',
        },
        [theme.breakpoints.up('md')]: {
            width: '300px',
            maxWidth: '30%',
            minWidth: '200px',
        },
    },
    textFieldsCell: {
        marginTop: theme.spacing(1),
        paddingBottom: theme.spacing(0),
    },
    checkboxGrid: {
        padding: '13px',
    },
    checkbox: {

    },
    submitButton: {
        marginBottom: theme.spacing(3),
        width: '200px',
        maxWidth: '100%',
        margin: 0,
        display: 'block',
        fontSize: '1rem',
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto',
        },
    },
}));


const initialFieldValues = {
    email: '',
    password: '',
    passwordCheck: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(2000, 0, 1),
    country: '',
    subdivision: '',
    city: '',
    policyChecked: false,
}

function DisplayError(props) {
    return (
        <Alert variant="outlined" severity="error">{props.msg}</Alert>
    )
}


function RegisterUserForm() {
    const dispatch = useDispatch();
    const storeError = useSelector((store) => store.error);
    const classes = useStyles();
    const { formFieldValues, setFormFieldValues, onInputChange } = useForm(initialFieldValues);
    const [msg, setMsg] = useState(null);

    
    // Setting error message when error received
    useEffect(() => {
        if (storeError.id === REGISTER_FAIL) {
            setMsg(storeError.msg.msg);
        } else {
            setMsg(null);
        }
    }, [storeError])

    // Calculates if user is 18 or older. Returns true or false
    function isOldEnough(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 18;
    }

    // Not currently used (Could be used to enable/disable Submit button for example). Returns true or false
    /*function readyToSubmit() {
        var isReady = true;
        const { firstName, lastName, dateOfBirth, country, province, city, email, password, passwordCheck, policyChecked } = formFieldValues;
        if (!isOldEnough(dateOfBirth)) {
            isReady = false;
        }
        if (!policyChecked) {
            isReady = false;
        }
        if (!firstName || !lastName || !country || !province || !city || !email || !password || !passwordCheck) {
            isReady = false;
        }
        return isReady;
    }*/

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());

        // Get values
        const { firstName, lastName, dateOfBirth, country, subdivision, city, email, password, passwordCheck, policyChecked } = formFieldValues;

        // Create user object
        const newUser = {
            firstName,
            lastName,
            dateOfBirth,
            country, subdivision, city,
            email,
            password,
            passwordCheck,
            policyChecked
        };

        // Attempt to register
        dispatch(registerUser(newUser));
    }

    // standard (unspecified), outlined, filled,
    const textFieldVariant = "outlined";
    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography className={classes.formHeader} variant="h4">Create Your SEM Account</Typography>
            <Form onSubmit={handleSubmit}>
                <Grid container className={classes.gridContainer} spacing={3}>
                    <Grid item className={classes.textFieldsCell} xs={12} >
                        <Grid container className={classes.multiTxtFieldContainer} spacing={0}>
                            <Grid item className={classes.multiTxtField2}>
                                <Controls.TextField
                                    variant={textFieldVariant}
                                    label="First Name"
                                    name="firstName"
                                    value={formFieldValues.firstName}
                                    onChange={onInputChange}
                                    inputProps={{
                                        autoComplete: 'off', // disable autocomplete and autofill
                                    }}
                                />
                            </Grid>
                            <Grid item className={classes.multiTxtField2}>
                                <Controls.TextField
                                    variant={textFieldVariant}
                                    label="Second Name"
                                    name="lastName"
                                    value={formFieldValues.lastName}
                                    onChange={onInputChange}
                                    inputProps={{
                                        autoComplete: 'off', // disable autocomplete and autofill
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Controls.DatePicker
                            variant={textFieldVariant}
                            error={!isOldEnough(formFieldValues.dateOfBirth)}
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={formFieldValues.dateOfBirth}
                            onChange={onInputChange}
                        />
                        <Grid container className={classes.multiTxtFieldContainer} spacing={0}>
                            <Grid item className={classes.multiTxtField3}>
                                <Controls.DropdownPicker
                                    id="country-dropdown"
                                    variant="outlined"
                                    options={countries}
                                    getOptionLabel={(option) => option.country}
                                    inputValue={formFieldValues.country}
                                    onInputChange={(event, newInputValue) => {
                                        setFormFieldValues({
                                            ...formFieldValues,
                                            subdivision: "",
                                            country: newInputValue
                                        });
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Country"
                                            variant="outlined"

                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item className={classes.multiTxtField3}>
                                <Controls.DropdownPicker
                                    id="subdivision-dropdown"
                                    variant="outlined"
                                    options={formFieldValues.country === "United States" ? states : provinces}
                                    getOptionLabel={(option) => option.subdivision}
                                    inputValue={formFieldValues.subdivision}
                                    onInputChange={(event, newInputValue) => {
                                        setFormFieldValues({
                                            ...formFieldValues,
                                            subdivision: newInputValue
                                        });
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label={formFieldValues.country === "United States" ? "State" : "Province/Territory"}
                                            variant="outlined"

                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'new-password', // disable autocomplete and autofill
                                            }}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item className={classes.multiTxtField3}>
                                <Controls.TextField
                                    variant={textFieldVariant}
                                    label="City"
                                    name="city"
                                    value={formFieldValues.city}
                                    onChange={onInputChange}
                                    inputProps={{
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Email"
                            name="email"
                            type="email"
                            value={formFieldValues.email}
                            placeholder="example@domain.com"
                            onChange={onInputChange}
                            inputProps={{
                                autoComplete: 'off', // disable autocomplete and autofill
                            }}
                        />
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Password"
                            type="password"
                            name="password"
                            value={formFieldValues.password}
                            onChange={onInputChange}
                            inputProps={{
                                autoComplete: 'off', // disable autocomplete and autofill
                            }}
                        />
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Re-enter Password"
                            type="password"
                            name="passwordCheck"
                            value={formFieldValues.passwordCheck}
                            onChange={onInputChange}
                            inputProps={{
                                autoComplete: 'off', // disable autocomplete and autofill
                            }}
                        />
                    </Grid>
                    <Grid item className={classes.checkboxGrid} xs={12} >
                        <Controls.Checkbox className={classes.checkbox}
                            checked={formFieldValues.policyChecked}
                            onChange={onInputChange}
                            name="policyChecked"
                            color="secondary"
                            label="I agree to the Terms of Service"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Controls.Button className={classes.submitButton}
                            type="submit"
                            text="Register"
                        //disabled={!readyToSubmit()}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {msg ? <DisplayError msg={msg} /> : null}
                    </Grid>
                </Grid>
            </Form>
        </Paper >
    )
}

export default RegisterUserForm;



const countries = [
    { country: 'Canada' },
    { country: 'United States' },
];
const provinces = [
    { subdivision: 'Alberta', code: 'AB' },
    { subdivision: 'British Columbia', code: 'BC' },
    { subdivision: 'Manitoba', code: 'MB' },
    { subdivision: 'New Brunswick', code: 'NB' },
    { subdivision: 'Newfoundland and Labrador', code: 'NL' },
    { subdivision: 'Northwest Territories', code: 'NT' },
    { subdivision: 'Nova Scotia', code: 'NS' },
    { subdivision: 'Nunavut', code: 'NU' },
    { subdivision: 'Ontario', code: 'ON' },
    { subdivision: 'Prince Edward Island', code: 'PE' },
    { subdivision: 'Quebec', code: 'QC' },
    { subdivision: 'Saskatchewan', code: 'SK' },
    { subdivision: 'Yukon', code: 'YT' },
];
const states = [
    { subdivision: 'Alabama', code: 'AL' },
    { subdivision: 'Alaska', code: 'AK' },
    { subdivision: 'American Samoa',  code: 'AS'},
    { subdivision: 'Arizona', code: 'AZ'},
    { subdivision: 'Arkansas', code: 'AR'},
    { subdivision: 'California', code: 'CA'},
    { subdivision: 'Colorado', code: 'CO'},
    { subdivision: 'Connecticut', code: 'CT'},
    { subdivision: 'Delaware', code: 'DE'},
    { subdivision: 'District Of Columbia', code: 'DC'},
    { subdivision: 'Federated States Of Micronesia', code: 'FM'},
    { subdivision: 'Florida', code: 'FL'},
    { subdivision: 'Georgia', code: 'GA'},
    { subdivision: 'Guam', code: 'GU'},
    { subdivision: 'Hawaii', code: 'HI'},
    { subdivision: 'Idaho', code: 'ID'},
    { subdivision: 'Illinois', code: 'IL'},
    { subdivision: 'Indiana', code: 'IN'},
    { subdivision: 'Iowa', code: 'IA'},
    { subdivision: 'Kansas', code: 'KS'},
    { subdivision: 'Kentucky', code: 'KY'},
    { subdivision: 'Louisiana', code: 'LA'},
    { subdivision: 'Maine', code: 'ME'},
    { subdivision: 'Marshall Islands', code: 'MH'},
    { subdivision: 'Maryland', code: 'MD'},
    { subdivision: 'Massachusetts', code: 'MA'},
    { subdivision: 'Michigan', code: 'MI'},
    { subdivision: 'Minnesota', code: 'MN'},
    { subdivision: 'Mississippi', code: 'MS'},
    { subdivision: 'Missouri', code: 'MO'},
    { subdivision: 'Montana', code: 'MT'},
    { subdivision: 'Nebraska', code: 'NE'},
    { subdivision: 'Nevada', code: 'NV'},
    { subdivision: 'New Hampshire', code: 'NH'},
    { subdivision: 'New Jersey', code: 'NJ'},
    { subdivision: 'New Mexico', code: 'NM'},
    { subdivision: 'New York', code: 'NY'},
    { subdivision: 'North Carolina', code: 'NC'},
    { subdivision: 'North Dakota', code: 'ND'},
    { subdivision: 'Northern Mariana Islands', code: 'MP'},
    { subdivision: 'Ohio', code: 'OH'},
    { subdivision: 'Oklahoma', code: 'OK'},
    { subdivision: 'Oregon', code: 'OR'},
    { subdivision: 'Palau', code: 'PW'},
    { subdivision: 'Pennsylvania', code: 'PA'},
    { subdivision: 'Puerto Rico', code: 'PR'},
    { subdivision: 'Rhode Island', code: 'RI'},
    { subdivision: 'South Carolina', code: 'SC'},
    { subdivision: 'South Dakota', code: 'SD'},
    { subdivision: 'Tennessee', code: 'TN'},
    { subdivision: 'Texas', code: 'TX'},
    { subdivision: 'Utah', code: 'UT'},
    { subdivision: 'Vermont', code: 'VT'},
    { subdivision: 'Virgin Islands', code: 'VI'},
    { subdivision: 'Virginia', code: 'VA'},
    { subdivision: 'Washington', code: 'WA'},
    { subdivision: 'West Virginia', code: 'WV'},
    { subdivision: 'Wisconsin', code: 'WI'},
    { subdivision: 'Wyoming', code: 'WY'},
];
