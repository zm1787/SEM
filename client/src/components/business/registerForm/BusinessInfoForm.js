import React, { useState, useEffect } from 'react'
import { COUNTRIES, CANADIAN_PROVINCES, US_STATES, FIELD_VARIANT } from '../../../constants/AppConstants';

// Components
import Controls from '../../controls';
import IconTextPopover from '../../iconFunctions/IconTextPopover';
import DeletableListItem from './DeletableListItem';
import WagesRadio from './WagesRadio';



// Material UI
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
    InputAdornment,
    Typography,
    Paper,
    Box,
    Grid,
    TextField,
} from '@material-ui/core';

// Icons
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


const useStyles = makeStyles(theme => ({
    formHeader: {
        marginTop: theme.spacing(3),
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    sectionTitle: {
        marginTop: theme.spacing(3),
        color: theme.palette.text.primary,
        textAlign: 'left',
    },
    paper: {
        overflow: 'auto', 
        width: '50vw',
        maxWidth: '700px',
        margin: `${theme.spacing(5)}px auto`,
        padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down('lg')]: {
            width: 'calc(100vw - ((100vw - 100%)/2))',
            margin: `${theme.spacing(5)}px auto`,
        },
        [theme.breakpoints.down('xs')]: {
            padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
            margin: `${theme.spacing(5)}px auto`,
        },
    },
    paperlessForm: {
        width: '50vw',
        maxWidth: '700px',
        margin: `${theme.spacing(5)}px auto`,
        padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,

        [theme.breakpoints.down('sm')]: {
            width: 'calc(100vw - ((100vw - 100%)/2))',
            margin: 0,
            padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        },
    },

    gridContainer: {
        flexGrow: 1,
    },
    gridItem: {
        padding: '8px',
        [theme.breakpoints.down('md')]: {
            padding: 0,
        },
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
    textFieldsCell: {
        '& .MuiFormControl-root': {
            display: 'block',
            width: '100%',
            margin: `${theme.spacing(3.5)}px auto 0 auto`,

            [theme.breakpoints.down('sm')]: {

            },
        },
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        paddingBottom: theme.spacing(0),
    },
    searchTermsOuterContainer: {

    },
    searchTermsFieldAndButtonContainer: {
        position: 'relative',
        display: 'flex',
    },
    searchTermsFieldDiv: {
        width: '100%',
        marginRight: '10px',
    },
    addButton: {
        '&.MuiButtonBase-root': { margin: '0', marginTop: 'auto', },
        borderRadius: '30px',
        backgroundColor: theme.palette.primary.main,
        marginBottom: theme.spacing(3),
        padding: 0,
        maxWidth: '55px',
        width: '55px',
        height: '55px',
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
        [theme.breakpoints.down('sm')]: {
            right: '0%',
        },
    },
    searchTermList: {
        marginTop: '24px',
        padding: '18px',
        borderRadius: '5px',
        minHeight: '100px',
        border: `1px solid ${theme.palette.primary.main}`,
    },
    businessDescription: {
        '& .MuiInputBase-root': {
            width: '100%',
            //borderRadius: '28px',
        },
    },
    businessDescriptionHelpIcon: {
        '& .icon-text-popover': {
            marginBottom: 'auto',
        },
    },
    fieldErrorMsg: {
        marginTop: '0',
        border: 'none',
    },
    flexContainer: {
        //display: 'block',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    wagesRadio: {
        display: 'inline-block',
    },
    wageMoneyField: {
        display: 'inline-block',
        verticalAlign: 'bottom',
        height: '58px',
        //border: '1px solid red',
    },
    moneySign: {
        color: theme.palette.text.primary,
    },
    nextButton: {
        marginBottom: theme.spacing(2),
        float: 'right',
        padding: '8px 14px', 
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            float: 'none',
            margin: '0 auto',
        },
    },
}));

// Checks that string is not empty or all whitespaces
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

function DisplayError(props) {
    return (
        <Alert className={props.styles} variant="outlined" severity="error">{props.msg}</Alert>
    )
}

export default function RegisterSpecialistForm({ formFieldValues, setFormFieldValues, managedErrors, setManagedErrors, onInputChange, formatPhoneNumber, setCurrentSection, formSections }) {
    // Styles
    const classes = useStyles();

    const onClickNext = (e) => {
        setCurrentSection(formSections.TierSelector);
    }

    const onMoneyFieldKeyPressed = (e, state, setState) => {
        const re = /^[(0-9|.)\b]+$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        }
    }

    const onPhoneFieldKeyPressed = (e, state, setState) => {
        const regex = /^[- +()0-9]+$/;

        if (e.target.value === '' || regex.test(e.target.value)) {
            setState({
                ...state,
                [e.target.name]: e.target.value,
            });
        }
    }

    const onSearchTermKeyPressed = (e, state, setState) => {
        if (e.key === "Enter") {
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            e.preventDefault();
            form.elements[index].focus();

            if (isEmptyOrSpaces(e.target.value) || state.searchTerms.includes(e.target.value)) {
                e.target.value = "";
                return;
            }
            setState({
                ...state,
                [e.target.name]: [...state.searchTerms, e.target.value],
            });
            e.target.value = "";
        }
    }

    const onClickAdd = (e, state, setState) => {
        Array.from(document.querySelectorAll('input')).forEach(input => {

            if (isEmptyOrSpaces(input.value) || state.searchTerms.includes(input.value)) {
                input.value = "";
                return;
            }

            if (input.name === 'searchTerms') {
                setState({
                    ...state,
                    [input.name]: [...state.searchTerms, input.value],
                });
                input.value = "";
                input.focus();
            }
        });
        e.preventDefault();
    }

    // outlined or filled,
    const textFieldVariant = "outlined";

    return (
        <Grid container className={classes.gridContainer}>
            <Grid item className={classes.gridItem} lg={12} md={12} sm={12} >
                {/* <div className={classes.paperlessForm}> */}
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h5">Business Information</Typography>
                    <Box className={classes.textFieldsCell}>
                        <Controls.TextField
                            autoFocus
                            variant={textFieldVariant}
                            label="Name of Business"
                            name="businessName"
                            value={formFieldValues.businessName}
                            onChange={onInputChange}
                            InputProps={{
                                endAdornment:
                                    <IconTextPopover
                                        msg={"If you are advertising as an individual and don't have a business name, you can simply your name here."}
                                        icon={HelpOutlineIcon}
                                    />
                            }}
                            inputProps={{
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Street Address of Business"
                            name="streetAddress"
                            value={formFieldValues.streetAddress}
                            onChange={onInputChange}
                            inputProps={{
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
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
                        <Grid container className={classes.multiTxtFieldContainer} spacing={0}>
                            <Grid item className={classes.multiTxtField2}>
                                <Controls.DropdownPicker
                                    id="country-dropdown"
                                    variant="outlined"
                                    options={COUNTRIES}
                                    getOptionLabel={(option) => option.country}
                                    inputValue={formFieldValues.country}
                                    onInputChange={(event, newInputValue) => {
                                        setFormFieldValues({
                                            ...formFieldValues,
                                            subdivision: {}
                                        });
                                        setFormFieldValues({
                                            ...formFieldValues,
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
                            <Grid item className={classes.multiTxtField2}>
                                <Controls.DropdownPicker
                                    id="subdivision-dropdown"
                                    variant="outlined"
                                    options={formFieldValues.country === "United States" ? US_STATES : CANADIAN_PROVINCES}
                                    getOptionLabel={(option) => option.name}
                                    getOptionSelected={(option, value) => option.name === value.name}
                                    onChange={(event, newValue) => {
                                        setFormFieldValues({
                                            ...formFieldValues,
                                            subdivision: newValue
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
                        </Grid>
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Phone Number"
                            name="phoneNumber"
                            value={formFieldValues.phoneNumber}
                            onBlur={(e) => {
                                var res = e.target.value.toString().replace(/\D/g, "")
                                if (res.length === 10 || res.length === 11) {
                                    setFormFieldValues({
                                        ...formFieldValues,
                                        phoneNumber: formatPhoneNumber(res)
                                    });
                                    setManagedErrors({
                                        ...managedErrors,
                                        phoneNumber: "",
                                    })
                                }
                                else {
                                    setManagedErrors({
                                        ...managedErrors,
                                        phoneNumber: "The phone number must be a full 10 or 11 digit number.",
                                    })
                                }
                            }}
                            onChange={(event) => onPhoneFieldKeyPressed(event, formFieldValues, setFormFieldValues)}
                            placeholder="(000) 000-0000"
                            inputProps={{
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                        {managedErrors.phoneNumber && (
                            <DisplayError msg={managedErrors.phoneNumber} styles={classes.fieldErrorMsg} />
                        )}
                        <Controls.TextField
                            variant={textFieldVariant}
                            label="Profession or service type"
                            name="serviceType"
                            value={formFieldValues.serviceType}
                            onChange={onInputChange}
                            InputProps={{
                                endAdornment:
                                    <IconTextPopover
                                        msg={"The type of service you proviode, or your profession. Example: Plumber or plumbing"}
                                        icon={HelpOutlineIcon}
                                    />
                            }}
                            inputProps={{
                                autoComplete: 'off', // disable autocomplete and autofill
                            }}
                        />
                        <Box className={classes.searchTermsOuterContainer}>
                            <Box className={classes.searchTermsFieldAndButtonContainer}>
                                <Box className={classes.searchTermsFieldDiv}>
                                    <Controls.TextField
                                        variant={textFieldVariant}
                                        label="Add a search term"
                                        name="searchTerms"
                                        onKeyPress={(event) => onSearchTermKeyPressed(event, formFieldValues, setFormFieldValues)}
                                        InputProps={{
                                            endAdornment:
                                                <IconTextPopover
                                                    msg={"List keywords that will help people find you."}
                                                    icon={HelpOutlineIcon}
                                                />
                                        }}
                                        inputProps={{
                                            autoComplete: 'off', // disable autocomplete and autofill
                                        }}
                                    />
                                </Box>
                                <Controls.Button className={classes.addButton}
                                    onClick={(event) => onClickAdd(event, formFieldValues, setFormFieldValues)}
                                    text="Add"
                                />
                            </Box>
                            <Box className={classes.searchTermList}>
                                {formFieldValues.searchTerms.map((serachTerm, index) => {
                                    return (
                                        <DeletableListItem
                                            item={serachTerm}
                                            key={index}
                                            index={index}
                                            stateFieldName="searchTerms"
                                            state={formFieldValues}
                                            setState={setFormFieldValues}
                                        />
                                    );
                                })}
                            </Box>
                        </Box>
                        <Typography className={classes.sectionTitle} variant="h5">Work Skills Summary</Typography>
                        <Controls.TextField className={classes.businessDescription}
                            variant={textFieldVariant}
                            label="Skills Summary or Business Description"
                            name="businessDescription"
                            multiline
                            rowsMax={6}
                            rows={6}
                            value={formFieldValues.businessDescription}
                            onChange={onInputChange}
                            inputProps={{
                                autoComplete: 'off', // disable autocomplete and autofill
                            }}
                            InputProps={{
                                endAdornment:
                                    <IconTextPopover
                                        msg={"Here you can describe in more details what type of service you provide."}
                                        icon={HelpOutlineIcon}
                                    />,
                                classes: {
                                    adornedEnd: classes.businessDescriptionHelpIcon
                                }
                            }}
                        />
                    </Box>
                    <Box className={classes.flexContainer}>
                        <Box className={classes.wagesType}>
                            <WagesRadio
                                name="wageType"
                                radioValue={formFieldValues.wageType}
                                formFieldValues={formFieldValues}
                                setFormFieldValues={setFormFieldValues}
                            />
                        </Box>
                        {
                            formFieldValues.wageType === "hourly" &&
                            <>
                                <Box className={classes.wageMoneyField}>
                                    <TextField
                                        variant="outlined"
                                        name="wage"
                                        value={formFieldValues.wage}
                                        placeholder="0.00"
                                        onChange={(event) => onMoneyFieldKeyPressed(event, formFieldValues, setFormFieldValues)}
                                        onBlur={(e) => {
                                            if (e.target.value !== "") {
                                                // format
                                                setFormFieldValues({
                                                    ...formFieldValues,
                                                    wage: parseFloat(e.target.value).toFixed(2)
                                                });
                                                setManagedErrors({
                                                    ...managedErrors,
                                                    wage: "",
                                                })
                                            }
                                            else {
                                                setManagedErrors({
                                                    ...managedErrors,
                                                    wage: "Please enter a wage amount.",
                                                })
                                            }
                                            // validate

                                        }}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Typography className={classes.moneySign}>$</Typography></InputAdornment>,
                                        }}
                                    />
                                </Box>
                                {managedErrors.wage && (
                                    <DisplayError msg={managedErrors.wage} styles={classes.fieldErrorMsg} />
                                )}
                            </>
                        }
                    </Box>
                    <Box>
                        {/* <Controls.Checkbox className={classes.checkbox}
                            checked={formFieldValues.policyChecked}
                            onChange={onInputChange}
                            name="policyChecked"
                            color="secondary"
                            label="I agree to the Terms of Service"
                        /> */}
                    </Box>
                    <div>
                        <Controls.Button className={classes.nextButton}
                            color='secondary'
                            text="Next"
                            onClick={onClickNext}
                        />
                    </div>
                </Paper>

                {/* </div> */}
            </Grid>
        </Grid>
    )
}

