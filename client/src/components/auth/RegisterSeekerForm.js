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
        margin: theme.spacing(1),
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.dark,

        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1),
            padding: theme.spacing(1),
        },
    },
    gridContainer: {
        flexGrow: 1,
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
        margin: '0 auto',
        display: 'block',
        fontSize: '1rem',
    },
}));


const initialFieldValues = {
    email: '',
    password: '',
    passwordCheck: '',
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(2000, 0, 1),
    location: '',
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
        const { firstName, lastName, dateOfBirth, location, email, password, passwordCheck, policyChecked } = formFieldValues;
        if (!isOldEnough(dateOfBirth)) {
            isReady = false;
        }
        if (!policyChecked) {
            isReady = false;
        }
        if (!firstName || !lastName || !location || !email || !password || !passwordCheck) {
            isReady = false;
        }

        return isReady;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.clearErrors();

        // Get values
        const { firstName, lastName, dateOfBirth, location, email, password, passwordCheck, policyChecked } = formFieldValues;

        // Create user object
        const newUser = {
            firstName,
            lastName,
            dateOfBirth,
            location,
            email,
            password,
            passwordCheck,
            policyChecked
        };

        // Attempt to register
        props.registerSeeker(newUser);
    }

    // standard (unspecified), outlined, filled,
    const textFieldVariant = "outlined";
    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography className={classes.formHeader} variant="h4">Register</Typography>
            <Form onSubmit={handleSubmit}>
                <Grid container className={classes.gridContainer} spacing={3}>
                    <Grid item className={classes.textFieldsCell} xs={12} >
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
                        <Controls.DatePicker
                            error={!isOldEnough(formFieldValues.dateOfBirth)}
                            label="Date of Birth"
                            name="dateOfBirth"
                            value={formFieldValues.dateOfBirth}
                            onChange={onInputChange}
                        />
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Location"
                            name="location"
                            value={formFieldValues.location}
                            placeholder="Country/Province/City"
                            onChange={onInputChange}
                            InputProps={{
                                //startAdornment: <InputPersonIcon />
                            }}
                        />
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
        </Paper>
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
