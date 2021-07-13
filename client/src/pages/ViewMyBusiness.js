import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBusiness } from '../actions/businessActions';
import { useHistory } from "react-router-dom";
import SelectedBusiness from '../components/business/viewSelectedBusiness/SelectedBusiness';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        margin: '50px auto',
        width: '100%',
        maxWidth: '900px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '15px',
    },

}))

export default function ViewMyBusiness(props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);
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
        <div className={classes.root}>
            <SelectedBusiness />
        </div>
    )
}
