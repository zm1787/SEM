import React from 'react'
import BusinessCard from './BusinessCard';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    }
}))

export default function BusinessCardsList() {
    const classes = useStyles();
    const businessStore = useSelector((store) => store.business);
    const auth = useSelector((store) => store.auth);

    return (
        <div className={classes.root}>
            { businessStore.nearbyBusinesses &&
                businessStore.nearbyBusinesses.map((business) => {
                    return (
                        business.owner._id !== auth.user._id ?
                            <BusinessCard key={business._id} business={business} />
                            :
                            null
                    )
                })
            }
        </div>
    )
}



