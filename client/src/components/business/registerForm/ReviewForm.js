import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

// Components
import Controls from '../../controls';

// Actions
import { REGISTER_BUSINESS_FAIL } from '../../../actions/actionTypes';

// Material UI
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
    InputAdornment,
    Typography,
    Paper,
    Box,
    Divider,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '18px',
        flexGrow: 1,
    },
    paper: {
        overflow: 'auto',
        maxWidth: '700px',
        margin: `${theme.spacing(5)}px auto`,
        padding: `${theme.spacing(3)}px ${theme.spacing(6)}px`,
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary.main}`,

        [theme.breakpoints.down('xs')]: {
            margin: 0,
            padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`,
        },
    },
    title: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    subSectionTitle: {
        color: theme.palette.primary.main,
    },
    capitalize: {
        textTransform: 'capitalize',
    },
    formInfoContainer: {
        margin: '20px 0',
    },
    tierInfoContainer: {
        margin: '20px 0',
    },
    policyCheckedContainer: {
        margin: '20px 0',
    },
    reviewElement: {
        margin: '12px 0',
        textTransform: 'capitalize',
    },
    reviewElementValue: {
        color: theme.palette.text.primary
    },
    changeButton: {
        borderRadius: '27px',
        minHeight: '40px',
        fontSize: '14px',

    },
    bottomButtons: {
        marginTop: '36px',
        marginBottom: '36px',
    },
    prevButton: {
        minHeight: '46px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px',
        },
    },
    submitButton: {
        float: 'right',
        minHeight: '46px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '14px',
        },
    },
}));

const useIncompleteStyles = makeStyles(theme => ({
    root: {
        display: 'inline-block',
        color: theme.palette.error.main,
    }
}));

function Incomplete() {
    const classes = useIncompleteStyles();
    return <span className={classes.root} variant="body1">INCOMPLETE</span>
}

function DisplayError(props) {
    return (
        <Alert className={props.styles} variant="outlined" severity="error">{props.msg}</Alert>
    )
}

export default function ReviewForm({ businessInfo, selectedTier, creditCardInfo, formSections, setCurrentSection, setPolicyChecked }) {
    // States
    const [serverErrMsg, setServerErrMsg] = useState(null);

    // Redux Store
    const storeError = useSelector((store) => store.error);

    // Material UI
    const classes = useStyles();

    // Setting error message when error received
    useEffect(() => {
        if (storeError.id === REGISTER_BUSINESS_FAIL) {
            setServerErrMsg(storeError.msg.msg);
        } else {
            setServerErrMsg(null);
        }
    }, [storeError])

    const onClickChangeTier = (e) => {
        setCurrentSection(formSections.TierSelector);
    }
    const onClickChangeInfo = (e) => {
        setCurrentSection(formSections.BusinessInfoForm);
    }
    const onClickPrev = (e) => {
        setCurrentSection(formSections.CreditCardForm);
    }

    const {
        businessName,
        streetAddress,
        city,
        country,
        subdivision,
        phoneNumber,
        serviceType,
        wageType,
        wage,
        businessDescription,
    } = businessInfo;
    const searchTerms = businessInfo.searchTerms.join(", ");

    const {
        number: cardNumber,
        name: cardName,
        expiry: cardExpiry,
        cvc,
    } = creditCardInfo;



    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={3} >
                <Box className={classes.formInfoContainer}>
                    <Typography variant="h4" className={classes.title}>Review Business Information</Typography>
                    <Typography variant="body1" color="primary" className={classes.reviewElement}>
                        Name of business: <span className={classes.reviewElementValue}>{businessName || <Incomplete />}</span>
                    </Typography>
                    <Typography variant="body1" color="primary" className={classes.reviewElement}>
                        Business address: <span className={classes.reviewElementValue}>{streetAddress || <Incomplete />},  {city || <Incomplete />}, {subdivision.code || <Incomplete />}, {country || <Incomplete />}</span>
                    </Typography>
                    <Typography variant="body1" color="primary" className={classes.reviewElement}>
                        Phone number: <span className={classes.reviewElementValue}>{phoneNumber || <Incomplete />}</span>
                    </Typography>
                    <Typography variant="body1" color="primary" className={classes.reviewElement}>
                        Business service type: <span className={classes.reviewElementValue}>{serviceType || <Incomplete />}</span>
                    </Typography>
                    <Typography variant="body1" color="primary" className={classes.reviewElement}>
                        Search terms: <span className={classes.reviewElementValue}>{searchTerms || "(No search terms enterred)"}</span>
                    </Typography>
                    <Typography variant="body1" color="primary" className={`${classes.reviewElement} ${classes.capitalize}`}>
                        Wage type: <span className={classes.reviewElementValue}>{wageType || <Incomplete />}</span>
                    </Typography>
                    {
                        wageType === 'hourly' &&
                        <Typography variant="body1" color="primary" className={classes.reviewElement}>
                            Hourly wage: <span className={classes.reviewElementValue}>{wage || <Incomplete />}</span>
                        </Typography>
                    }
                    <Typography variant="body1" color="primary" className={classes.reviewElement}>
                        Business description: <span className={classes.reviewElementValue}>{businessDescription || <Incomplete />}</span>
                    </Typography>
                    <Controls.Button className={classes.changeButton}
                        color='secondary'
                        text="Modify"
                        onClick={onClickChangeInfo}
                    />
                </Box>
                <Divider />
                <Box className={classes.tierInfoContainer}>
                    <Typography variant="body1" color="primary" className={classes.reviewElement} >
                        Subscription Tier: <span className={classes.reviewElementValue}>{selectedTier || <Incomplete />}</span>
                    </Typography>
                    <Controls.Button className={classes.changeButton}
                        color='secondary'
                        text="Modify"
                        onClick={onClickChangeTier}
                    />
                </Box>
                <Divider light={false} />
                <Box className={classes.policyCheckedContainer} >
                    <Controls.Checkbox className={classes.checkbox}
                        checked={businessInfo.policyChecked}
                        onChange={setPolicyChecked}
                        name="policyChecked"
                        color="secondary"
                        label="I agree to the Terms of Service"
                    />
                </Box>



                <div className={classes.bottomButtons}>
                    <Controls.Button className={classes.prevButton}
                        color='secondary'
                        text="Back"
                        onClick={onClickPrev}
                    />
                    <Controls.Button className={classes.submitButton}
                        color='primary'
                        type="submit"
                        text="Register My Business!"
                    />
                </div>
                <Box>
                    {serverErrMsg ? <DisplayError msg={serverErrMsg} /> : null}
                </Box>
            </Paper>
        </div>
    )
}
