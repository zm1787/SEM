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

    var businessList
    if (businessStore.nearbyBusinesses.length !== 0) {
        businessList = businessStore.nearbyBusinesses
    }

    return (
        <div className={classes.root}>
            {businessList && businessList.map((business) => {
                return (
                    <BusinessCard key={business._id} business={business} />
                )
            })}
        </div>
    )
}



