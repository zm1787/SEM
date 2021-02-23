import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

// Components
import { useForm, Form } from '../useForm';
import Controls from '../controls/';

// Actions
import { loginUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { LOGIN_FAIL } from '../../actions/actionTypes';


// Material UI
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
    Typography,
    Paper,
    Box,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    formHeader: {
        marginTop: theme.spacing(3),
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    paper: {
        maxWidth: '500px',
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
    textFieldsCell: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        paddingBottom: theme.spacing(0),
    },
    submitButton: {
        marginBottom: theme.spacing(3),
        width: '150px',
        maxWidth: '100%',
        margin: 0,
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            margin: '0 auto',
        },
    },
}));


const initialFieldValues = {
    email: '',
    password: '',
}

function DisplayError(props) {
    return (
        <Alert variant="outlined" severity="error">{props.msg}</Alert>
    )
}


function LoginForm() {
    // Redux
    const dispatch = useDispatch();
    const storeError = useSelector((store) => store.error);
    const auth = useSelector((store) => store.auth);

    // States
    const { formFieldValues, setFormFieldValues, onInputChange } = useForm(initialFieldValues);
    const [msg, setMsg] = useState(null);

    // Others
    const history = useHistory();
    const classes = useStyles();

    // Setting error message when error received
    useEffect(() => {
        if (storeError.id === LOGIN_FAIL) {
            setMsg(storeError.msg.msg);
        } else {
            setMsg(null);
        }
    }, [storeError])

    useEffect(() => {
        if(auth.isAuthenticated) {
            history.push("/");
        }
    }, [auth.isAuthenticated, history])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());

        // Get values
        const { email, password } = formFieldValues;

        // Create user object
        const user = {
            email,
            password,
        };

        // Attempt to login
        dispatch(loginUser(user));
    }

    // standard (unspecified), outlined, filled,
    const textFieldVariant = "outlined";
    return (
        <Paper className={classes.paper} elevation={3}>
            <Typography className={classes.formHeader} variant="h4">Login</Typography>
            <Form onSubmit={handleSubmit}>
                <Box className={classes.textFieldsCell}>
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
                </Box>
                <Controls.Button className={classes.submitButton}
                    type="submit"
                    text="Log In"
                />
            </Form>
        </Paper >
    )
}

export default LoginForm;
