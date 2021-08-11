import React, { useState } from 'react'

// Form Section Components
import BusinessInfoForm from '../components/business/registerForm/BusinessInfoForm';
import TierSelector from '../components/business/registerForm/TierSelector';
import CreditCardForm from '../components/business/registerForm/CreditCardForm';
import ReviewForm from '../components/business/registerForm/ReviewForm';

// Other Components/Hooks
import { useForm } from '../components/useForm';

// Redux and actions
import { useDispatch, useSelector } from 'react-redux';
import { registerBusiness } from '../actions/businessActions';
import { clearErrors } from '../actions/errorActions';

// Material UI
import { makeStyles } from '@material-ui/core';

const initialValues = {
    displayAddressFields: false,
    displayEmailFieldRequired: false,
    displayPhoneNumberFieldRequired: false,
    displayCalendarLinkRequired: false,

    businessName: "",
    streetAddress: "",
    city: "",
    country: "",
    subdivision: {},
    phoneNumber: "",
    email: "",
    serviceType: "",
    searchTerms: [],
    wageType: "contract",
    wage: "",
    businessDescription: "",
    calendarLink: "",
    policyChecked: false,
}

const initialCreditCardValues = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
}

const initialManagedErrors = {
    phoneNumber: "",
    wage: "",
    cardDate: "",
}

const formSections = {
    BusinessInfoForm: "BusinessInfoForm",
    TierSelector: "TierSelector",
    CreditCardForm: "CreditCardForm",
    Review: "Review",
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


    // States and form functions of business info section
    const {
        formFieldValues,
        setFormFieldValues,
        managedErrors,
        setManagedErrors,
        onInputChange,
        formatPhoneNumber,
        format_MMYY_Date,
    } = useForm(initialValues, initialManagedErrors);

    // State of Tier Selector section
    const [selectedTier, setSelectedTier] = useState('bronze');

    // State of Credit Card section
    const [creditCardState, setCreditCardState] = useState(initialCreditCardValues);

    // State holding the current form section to display 
    const [currentSection, setCurrentSection] = useState(formSections.BusinessInfoForm);

    const onSubmit = (e) => {
        e.preventDefault();
        if (e.key === 'Enter') return;
        dispatch(clearErrors()); // clear server errors
        const {
            // Section display controls (bool switches)
            displayAddressFields,
            displayEmailFieldRequired,
            displayPhoneNumberFieldRequired,
            displayCalendarLinkRequired,

            // Information fields
            businessName,
            streetAddress,
            city,
            country,
            subdivision,
            phoneNumber,
            email,
            serviceType,
            searchTerms,
            wageType,
            wage,
            businessDescription,
            calendarLink,
            policyChecked,
        } = formFieldValues;

        const {
            number,
            name,
            expiry,
            cvc,
        } = creditCardState;

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
            hasAddress: displayAddressFields,
            hasEmail: displayEmailFieldRequired,
            hasPhoneNumber: displayPhoneNumberFieldRequired,
            hasScheduleApp: displayCalendarLinkRequired,

            businessName,
            address: {
                streetAddress,
                city,
                subdivisionName: subdivision.name,
                subdivisionCode: subdivision.code,
                country,
            },
            phoneNumber,
            email,
            serviceType,
            searchTerms,
            businessDescription,
            linkToSchedule: calendarLink,
            wageType,
            policyChecked,
            selectedTier,
        }
        if (wageType === "contract") {
            newBusiness.hourlyWage = undefined;
        }
        else {
            newBusiness.hourlyWage = wage;
        }

        console.log("New Business Info: ", newBusiness);
        // console.log("Selected Tier: ", selectedTier);
        // console.log("Credit Card Information: ", creditCardState);

        // Request new business creation on server
        dispatch(registerBusiness(newBusiness));
    }

    // Prevent form submit from an "Enter" key press
    const onFormKeyPress = (e) => {
        if (e.key === 'Enter') e.preventDefault()
    }


    return (
        <div>
            <form className={classes.form} onSubmit={onSubmit} onKeyPress={onFormKeyPress} autoComplete="off" >
                <div style={currentSection === formSections.BusinessInfoForm ? {} : { display: 'none' }}>
                    <BusinessInfoForm
                        formFieldValues={formFieldValues}
                        setFormFieldValues={setFormFieldValues}
                        managedErrors={managedErrors}
                        setManagedErrors={setManagedErrors}
                        onInputChange={onInputChange}
                        formatPhoneNumber={formatPhoneNumber}
                        setCurrentSection={setCurrentSection}
                        formSections={formSections}
                    />
                </div>
                <div style={currentSection === formSections.TierSelector ? {} : { display: 'none' }}>
                    <TierSelector
                        selectedTier={selectedTier}
                        setSelectedTier={setSelectedTier}
                        setCurrentSection={setCurrentSection}
                        formSections={formSections}
                    />
                </div>
                <div style={currentSection === formSections.CreditCardForm ? {} : { display: 'none' }}>
                    <CreditCardForm
                        state={creditCardState}
                        setState={setCreditCardState}
                        managedErrors={managedErrors}
                        setManagedErrors={setManagedErrors}
                        setCurrentSection={setCurrentSection}
                        formSections={formSections}
                        format_MMYY_Date={format_MMYY_Date}
                    />
                </div>
                <div style={currentSection === formSections.Review ? {} : { display: 'none' }}>
                    <ReviewForm
                        businessInfo={formFieldValues}
                        selectedTier={selectedTier}
                        creditCardInfo={creditCardState}
                        formSections={formSections}
                        setCurrentSection={setCurrentSection}
                        setPolicyChecked={onInputChange}
                    />
                </div>
            </form>
        </div >
    )
}