import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, TextField, Box, InputAdornment, Typography, Divider } from '@material-ui/core';
import EditButton from './EditButton';
import CancelButton from './CancelButton';
import CloseIcon from '@material-ui/icons/Close';
import Controls from '../../controls';
import WagesRadio from '../registerForm/WagesRadio';
import DeletableListItem from '../registerForm/DeletableListItem';

import { useForm } from '../../useForm';


const useStyles = makeStyles(theme => ({
    root: {

    },
    title: {
        padding: '10px 0',
        textAlign: 'center',
        //backgroundColor: theme.palette.background.nav,
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    info: {
        textAlign: 'center',
        marginRight: 25,
    },
    capitalize: {
        textTransform: 'capitalize',
    },
    infoContainer: {
        padding: '20px'
    },
    textField: {
        marginBottom: 5,
        '& input': {
            padding: 10,
        }
    },
    fieldErrorMsg: {
        marginTop: '0',
        border: 'none',
    },
    Ymargins: {
        marginTop: "15px",
        marginBottom: "20px",
    },
}))

function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
}

const SelectedBusiness = () => {
    const classes = useStyles();
    const businessStore = useSelector((store) => store.business);

    const [editMode, setEditMode] = useState(false);

    const initialValues = {
        wageType: "",
    }
    const initialManagedErrors = {}

    const {
        formFieldValues: business,
        setFormFieldValues: setBusiness,
        managedErrors,
        setManagedErrors,
        onInputChange,
        formatPhoneNumber,
        format_MMYY_Date,
        onMoneyFieldKeyPressed,
        onPhoneFieldKeyPressed,
        DisplayError,
    } = useForm(initialValues, initialManagedErrors);

    useEffect(() => {
        if (businessStore.businessDetails) {
            const data = {
                hourlyWage: "",
                ...businessStore.businessDetails,
                keySearchTerms: undefined,
                address: undefined,
                searchTerms: businessStore.businessDetails.keySearchTerms,
                streetAddress: businessStore.businessDetails.address.streetAddress,
                city: businessStore.businessDetails.address.city,
                subdivision: businessStore.businessDetails.address.subdivisionName,
                country: businessStore.businessDetails.address.country,
            }
            delete data.keySearchTerms;
            delete data.address;
            setBusiness({
                ...data
            })
        }
    }, [businessStore, setBusiness])

    const onClickAdd = (e) => {
        Array.from(document.querySelectorAll('input')).forEach(input => {
            if (isEmptyOrSpaces(input.value) || business.searchTerms.includes(input.value)) {
                input.value = "";
                return;
            }

            if (input.name === 'searchTerms') {
                setBusiness({
                    ...business,
                    [input.name]: [...business.searchTerms, input.value],
                });
                input.value = "";
                input.focus();
            }
        });
        e.preventDefault();
    }

    const onSearchTermKeyPressed = (e) => {
        if (e.key === "Enter") {
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            e.preventDefault();
            form.elements[index].focus();

            if (isEmptyOrSpaces(e.target.value) || business.searchTerms.includes(e.target.value)) {
                e.target.value = "";
                return;
            }
            setBusiness({
                ...business,
                [e.target.name]: [...business.searchTerms, e.target.value],
            });
            e.target.value = "";
        }
    }

    const setFieldValue = (field, value) => {
        console.log("field", field)
        console.log("value", value)
        setBusiness({
            ...business,
            [field]: value,
        })
    }

    const toggleMode = () => {
        setEditMode(!editMode)
    }

    const onCancelEdit = () => {
        // Reset business state
        setBusiness({
            ...businessStore.businessDetails,
            address: undefined,
            streetAddress: businessStore.businessDetails.address.streetAddress,
            city: businessStore.businessDetails.address.city,
            subdivision: businessStore.businessDetails.address.subdivisionName,
            country: businessStore.businessDetails.address.country,
        })
        // Toggle mode
        setEditMode(!editMode)
    }

    return (
        <div className={classes.root}>
            {business ?
                <form>
                    <h2 className={classes.title}>{business.name}</h2>
                    <div className={classes.infoContainer}>
                        {business.streetAddress &&
                            <div className={classes.flexContainer}>
                                <h5 className={classes.info} style={{ display: 'inline' }}>Street Address: </h5>
                                {editMode ?
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        name="streetAddress"
                                        defaultValue={business.streetAddress}
                                        value={business.streetAddress}
                                        onChange={onInputChange}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                    :
                                    <h5 style={{ display: 'inline' }}>{business.streetAddress}</h5>
                                }
                            </div>
                        }
                        {business.city &&
                            <div className={classes.flexContainer}>
                                <h5 className={classes.info} style={{ display: 'inline' }}>City: </h5>
                                {editMode ?
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        name="city"
                                        defaultValue={business.city}
                                        value={business.city}
                                        onChange={onInputChange}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                    :
                                    <h5 style={{ display: 'inline' }}>{business.city}</h5>
                                }
                            </div>
                        }
                        {business.subdivision &&
                            <div className={classes.flexContainer}>
                                <h5 className={classes.info} style={{ display: 'inline' }}>Province/Territory: </h5>
                                {editMode ?
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        name="subdivision"
                                        defaultValue={business.subdivision}
                                        value={business.subdivision}
                                        onChange={onInputChange}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                    :
                                    <h5 style={{ display: 'inline' }}>{business.subdivision}</h5>
                                }
                            </div>
                        }
                        {business.country &&
                            <div className={classes.flexContainer}>
                                <h5 className={classes.info} style={{ display: 'inline' }}>Country: </h5>
                                {editMode ?
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        name="country"
                                        defaultValue={business.country}
                                        value={business.country}
                                        onChange={onInputChange}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                    :
                                    <h5 style={{ display: 'inline' }}>{business.country}</h5>
                                }
                            </div>
                        }

                        {business.serviceType &&
                            <div className={classes.flexContainer}>
                                <h5 className={classes.info} style={{ display: 'inline' }}>Type of service: </h5>
                                {editMode ?
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        name="serviceType"
                                        defaultValue={business.serviceType}
                                        value={business.serviceType}
                                        onChange={onInputChange}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                    :
                                    <h5 style={{ display: 'inline' }}>{business.serviceType}</h5>
                                }
                            </div>
                        }
                        {business.phoneNumber &&
                            <div className={classes.flexContainer}>
                                <h5 className={classes.info} style={{ display: 'inline' }}>Phone Number: </h5>
                                {editMode ?
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        name="phoneNumber"
                                        defaultValue={business.phoneNumber}
                                        value={business.phoneNumber}
                                        onChange={onInputChange}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                    :
                                    <h5 style={{ display: 'inline' }}>{business.phoneNumber}</h5>
                                }
                            </div>
                        }
                        {business.email &&
                            <div className={classes.flexContainer}>
                                <h5 className={classes.info} style={{ display: 'inline' }}>Email: </h5>
                                {editMode ?
                                    <TextField
                                        className={classes.textField}
                                        variant="outlined"
                                        name="email"
                                        defaultValue={business.email}
                                        value={business.email}
                                        onChange={onInputChange}
                                        inputProps={{
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                    :
                                    <h5 style={{ display: 'inline' }}>{business.email}</h5>
                                }
                            </div>
                        }
                        {editMode ?
                            <>
                                <Divider className={classes.Ymargins} />
                                <WagesRadio
                                    name="wageType"
                                    radioValue={business.wageType}
                                    formFieldValues={business}
                                    setFormFieldValues={setBusiness}
                                />
                                {
                                    business.wageType === "hourly" &&
                                    <>
                                        <Box className={classes.wageMoneyField}>
                                            <TextField
                                                variant="outlined"
                                                name="wage"
                                                value={business.hourlyWage}
                                                placeholder="0.00"
                                                onChange={(e) => onMoneyFieldKeyPressed(e)}
                                                onBlur={(e) => {
                                                    if (e.target.value !== "") {
                                                        // format
                                                        setBusiness({
                                                            ...business,
                                                            hourlyWage: parseFloat(e.target.value).toFixed(2)
                                                        });
                                                        setManagedErrors({
                                                            ...managedErrors,
                                                            hourlyWage: "",
                                                        })
                                                    }
                                                    else {
                                                        setManagedErrors({
                                                            ...managedErrors,
                                                            hourlyWage: "Please enter a wage amount.",
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
                                <Divider className={classes.Ymargins} />
                            </>
                            :
                            business.wageType === 'hourly' ?
                                <>
                                    <div className={classes.flexContainer}>
                                        <h5 className={classes.info} style={{ display: 'inline' }}>Wage Type:</h5>
                                        <h5 style={{ display: 'inline' }}>Hourly</h5>
                                    </div>
                                    <div className={classes.flexContainer}>
                                        <h5 className={classes.info} style={{ display: 'inline' }}>Wage:</h5>
                                        <h5 style={{ display: 'inline' }}>${business.hourlyWage}<sub>/h</sub></h5>
                                    </div>
                                </>
                                :
                                <div className={classes.flexContainer}>
                                    <h5 className={classes.info} style={{ display: 'inline' }}>Wage Type:</h5>
                                    <h5 style={{ display: 'inline' }}>Contract</h5>
                                </div>
                        }
                        <h5 className={classes.info}>
                            Key Search Terms: {business.searchTerms && business.searchTerms.map((term, index) => {
                                if (index + 1 !== business.searchTerms.length)
                                    return (
                                        <span className={classes.capitalize} key={index}>{term + ", "} </span>
                                    );
                                else
                                    return (
                                        <span className={classes.capitalize} key={index}>{term} </span>
                                    );
                            })}
                        </h5>
                        {business.searchTerms &&
                            <Box className={classes.searchTermsOuterContainer}>
                                <Box className={classes.searchTermsFieldAndButtonContainer}>
                                    <Box className={classes.searchTermsFieldDiv}>
                                        <TextField
                                            variant='outlined'
                                            label="Add a search term"
                                            name="searchTerms"
                                            onKeyPress={(e) => onSearchTermKeyPressed(e)}
                                        />
                                    </Box>
                                    <Controls.Button className={classes.addButton}
                                        onClick={(e) => onClickAdd(e)}
                                        text="Add"
                                    />
                                </Box>
                                <Box className={classes.searchTermList}>
                                    {business.searchTerms.length !== 0 ?
                                        business.searchTerms.map((searchTerm, index) => {
                                            return (
                                                <DeletableListItem
                                                    item={searchTerm}
                                                    key={index}
                                                    index={index}
                                                    stateFieldName="searchTerms"
                                                    state={business}
                                                    setState={setBusiness}
                                                />
                                            );
                                        })
                                        :
                                        <Typography>No search terms. Add search terms using the field above.</Typography>
                                    }
                                </Box>
                            </Box>
                        }
                        <h5 className={classes.info}>{business.description}</h5>
                        <h5 className={`${classes.info} ${classes.capitalize}`}>Tier: {business.selectedTier}</h5>
                        <div>
                            {editMode ?
                                <CancelButton toggleMode={onCancelEdit} />
                                :
                                <EditButton toggleMode={toggleMode} />
                            }
                        </div>
                        <div>
                            <Controls.Button
                                text="Upgrade Business Tier"
                            />
                        </div>
                    </div>
                </form>
                :
                <h2>Somethign went wrong! No business selected.</h2>
            }
        </div >
    )
}

export default SelectedBusiness
