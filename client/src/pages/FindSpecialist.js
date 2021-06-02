import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getNearbyBusinesses } from '../actions/businessActions';
import BusinessCardsList from '../components/business/BusinessCardsList';

const useStyles = makeStyles(theme => ({
    root: {
        border: `2px solid ${theme.palette.components.borders.main}`,
    },
    titleText: {

    },
}))

export default function FindSpecialist() {
    const classes = useStyles();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNearbyBusinesses());
    }, [dispatch]);

    return (
        <div className={`${classes.root} find-specialist-root`}>
            <div className={`${classes.titleContainer} title-container`}>
                <h2 className={`${classes.titleText} title-text`}>Specialists Near Me</h2>
            </div>
            <BusinessCardsList />

        </div>
    )
}
