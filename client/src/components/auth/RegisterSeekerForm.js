import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { useForm, Form } from '../useForm';
import Controls from '../controls/Controls';

// Actions
import { registerSeeker } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

// Material UI
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
    Typography,
    Paper,
    Grid,
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
        [theme.breakpoints.up('lg')]: {
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
    province: '',
    city: '',
    policyChecked: false,
}

function DisplayError(props) {
    return (
        <Alert variant="outlined" severity="error">{props.msg}</Alert>
    )
}


function RegisterForm(props) {
    const classes = useStyles();
    const { formFieldValues, setFormFieldValues, onInputChange } = useForm(initialFieldValues);
    const [msg, setMsg] = useState(null);

    // Setting error message when error received
    useEffect(() => {
        if (props.error.id === 'REGISTER_FAIL') {
            setMsg(props.error.msg.msg);
        } else {
            setMsg(null);
        }
    }, [props.error])

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

    function readyToSubmit() {
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
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.clearErrors();

        // Get values
        const { firstName, lastName, dateOfBirth, country, province, city, email, password, passwordCheck, policyChecked } = formFieldValues;

        // Create user object
        const newUser = {
            firstName,
            lastName,
            dateOfBirth,
            country, province, city,
            email,
            password,
            passwordCheck,
            policyChecked
        };

        // Attempt to register
        props.registerSeeker(newUser);
    }

    // standard (unspecified), outlined, filled,
    const textFieldVariant = "filled";
    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography className={classes.formHeader} variant="h4">Register</Typography>
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
                                    InputProps={{
                                        //startAdornment: <InputPersonIcon />
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
                                    InputProps={{
                                        //startAdornment: <InputPersonIcon />
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
                                <Controls.TextField
                                    variant={textFieldVariant}
                                    label="Country"
                                    name="country"
                                    value={formFieldValues.country}
                                    onChange={onInputChange}
                                    InputProps={{
                                        //startAdornment: <InputPersonIcon />
                                    }}
                                />
                            </Grid>
                            <Grid item className={classes.multiTxtField3}>
                                <Controls.TextField
                                    variant={textFieldVariant}
                                    label="Province/Territory"
                                    name="province"
                                    value={formFieldValues.province}
                                    onChange={onInputChange}
                                    InputProps={{
                                        //startAdornment: <InputPersonIcon />
                                    }}
                                />
                            </Grid>
                            <Grid item className={classes.multiTxtField3}>
                                <Controls.TextField
                                    variant={textFieldVariant}
                                    label="City"
                                    name="city"
                                    value={formFieldValues.city}
                                    onChange={onInputChange}
                                    InputProps={{
                                        //startAdornment: <InputPersonIcon />
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
                            InputProps={{
                                //startAdornment: <InputPersonIcon />
                            }}
                        />
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Password"
                            type="password"
                            name="password"
                            value={formFieldValues.password}
                            onChange={onInputChange}
                            InputProps={{
                                //startAdornment: <InputPersonIcon />
                            }}
                        />
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Re-enter Password"
                            type="password"
                            name="passwordCheck"
                            value={formFieldValues.passwordCheck}
                            onChange={onInputChange}
                            InputProps={{
                                //startAdornment: <InputPersonIcon />
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
                            type="Submit"
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


RegisterForm.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    registerSeeker: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    // Getting this from reducers/index.js
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { registerSeeker, clearErrors }
)(RegisterForm);
