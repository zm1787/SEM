import React, { useState } from 'react'
import RegisterBusinessForm from '../components/business/RegisterBusinessForm';
import TierSelector from '../components/business/TierSelector';
import CreditCardForm from '../components/CreditCardForm';
import { useForm } from '../components/useForm';
import { makeStyles } from '@material-ui/core';
import { clearErrors } from '../actions/errorActions';
import { useDispatch } from 'react-redux';
import { registerBusiness } from '../actions/businessActions';



const initialValues = {
    businessName: "",
    streetAddress: "",
    country: "",
    subdivision: {},
    phoneNumber: "",
    serviceType: "",
    searchTerms: [],
    wageType: "contract",
    wage: "",
    businessDescription: "",
    policyChecked: false,
}

const initialManagedErrors = {
    phoneNumber: "",
    wage: "",
}

const useStyles = makeStyles(theme => ({
    form: {
        display: 'block',
        width: '100%',
        margin: `${theme.spacing(3.5)}px auto 0 auto`,
    },
}));


export default function RegisterBusiness() {
    const dispatch = useDispatch();

    // Styles
    const classes = useStyles();

    // States and form functions of Section 1
    const {
        formFieldValues,
        setFormFieldValues,
        managedErrors,
        setManagedErrors,
        onInputChange,
        formatPhoneNumber
    } = useForm(initialValues, initialManagedErrors);

    // Credit Card States
    const [number, setNumber] = useState('') // card number
    const [name, setName] = useState('') // name of card owner
    const [expiry, setExpiry] = useState('') // card expiry date
    const [cvc, setCvc] = useState('') // cvc number on card
    const [focus, setFocus] = useState('') // for react-credit-cards' sty;eing and animation
    const creditCardStates = {number, setNumber, name, setName, expiry, setExpiry, cvc, setCvc, focus, setFocus}

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(clearErrors()); // clear server errors
        const {
            businessName,
            streetAddress,
            country,
            subdivision,
            phoneNumber,
            serviceType,
            searchTerms,
            wageType,
            wage,
            businessDescription,
            policyChecked,
        } = formFieldValues;

        // Error cleaning
        if (wageType === "contract") {
            setManagedErrors({ ...managedErrors, wage: "" })
        }
        else {
            if (wageType === "hourly" && wage === "") {
                setManagedErrors({ ...managedErrors, wage: "Please enter a wage amount." })
            }
        }

        const newBusiness = {
            businessName,
            address: {
                streetAddress,
                subdivisionName: subdivision.name,
                subdivisionCode: subdivision.code,
                country,
            },
            phoneNumber,
            serviceType,
            searchTerms,
            businessDescription,
            wageType,
            policyChecked,
        }
        if (wageType === "contract") {
            newBusiness.hourlyWage = undefined;
        }
        else {
            newBusiness.hourlyWage = wage;
        }

        //console.log(newBusiness);

        // Request new business creation on server
        dispatch(registerBusiness(newBusiness));
    }

    return (
        <div>
            <form className={classes.form} onSubmit={onSubmit} autoComplete="off" >
                <RegisterBusinessForm
                    formFieldValues={formFieldValues}
                    setFormFieldValues={setFormFieldValues}
                    managedErrors={managedErrors}
                    setManagedErrors={setManagedErrors}
                    onInputChange={onInputChange}
                    formatPhoneNumber={formatPhoneNumber}
                />
                <TierSelector />
                <CreditCardForm states={creditCardStates}/>
            </form>
        </div>
    )
}