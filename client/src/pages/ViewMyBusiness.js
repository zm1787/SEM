import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBusiness } from '../actions/businessActions';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import Controls from '../components/controls';



const useStyles = makeStyles({
    root: {

    },
    title: {
        marginTop: '50px',
        textAlign: 'center',
    },
    info: {
        textAlign: 'center',
    },
    capitalize: {
        textTransform: 'capitalize',
    },
})

export default function ViewMyBusiness(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const auth = useSelector((store) => store.auth);
    const business = useSelector((store) => store.business.businessDetails);
    const { businessID } = props.location.state;

    // If user not logged in, go to home page
    useEffect(() => {
        if (!auth.isAuthenticated) {
            history.push("/");
        }
    }, [auth.isAuthenticated, history])

    useEffect(() => {
        dispatch(fetchBusiness(businessID));
    }, [dispatch, businessID]);

    return (
        <div>
            {business ?
                <div>
                    <h2 className={classes.title}>{business.name}</h2>
                    <div>
                        <h5 className={classes.info}>{business.address.full}</h5>
                        <h5 className={classes.info}>Type of service provided: {business.serviceType}</h5>
                        <h5 className={classes.info}>Contact by phone: {business.phoneNumber}</h5>
                        {business.wageType === 'hourly' ?
                            <h5 className={classes.info}>Wage: ${business.hourlyWage}<sub>/h</sub></h5>
                            :
                            <h5 className={classes.info}>Wage Type: Contract</h5>
                        }
                        <h5 className={classes.info}>
                            Key Search Terms: {business.keySearchTerms.map((term, index) => {
                            if (index + 1 !== business.keySearchTerms.length)
                                return (
                                    <span className={classes.capitalize} key={index}>{term + ", "} </span>
                                );
                            else
                                return (
                                    <span className={classes.capitalize} key={index}>{term} </span>
                                );
                        })}
                        </h5>
                        <h5 className={classes.info}>{business.description}</h5>
                        <h5 className={`${classes.info} ${classes.capitalize}`}>Tier: {business.selectedTier}</h5>
                    </div>
                </div>
                :
                <h2>Somethign went wrong! No business selected.</h2>
            }
            <Controls.Button
                text="Upgrade Business Tier"
            />
        </div>
    )
}
