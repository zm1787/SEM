import React from 'react'
import { red } from '@material-ui/core/colors';
import { Card, CardContent, Typography, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'; // basic x button
import CancelIcon from '@material-ui/icons/Cancel'; // filled look x button
import HighlightOffIcon from '@material-ui/icons/HighlightOff'; // outlined look x button

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-block',
        borderRadius: '15px',
        textAlign: 'center',
        margin: '8px',
        backgroundColor: theme.palette.background.field,
        '& .MuiCardContent-root': {
            padding: "7px 18px",
            paddingRight: '4px',
        },
    },
    term: {
        fontSize: 14,
        color: theme.palette.text.primary,
    },
    closeIcon: {
        marginLeft: '12px',
        color: theme.palette.text.secondary,
        padding: 0,
        '&:hover': {
            color: '#dc3545',
        },
        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
    },
}));

// Props description:
// stateFieldName: name of the state field containing the array of deletable items
// state: The state needs to be an object
// setState: The setState function of the state object

export default function DeletableListItem({ stateFieldName, item, index, state, setState }) {
    const classes = useStyles();

    const removeItem = () => {
        const { [stateFieldName]: array } = state; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            setState({
                ...state,
                [stateFieldName]: array,
            });
        }
    }

    return (
        <Card className={classes.root}>
            <CardContent>

                <Typography className={classes.term} >
                    {item}
                    <IconButton className={classes.closeIcon} aria-label="delete" onClick={removeItem}>
                        <CancelIcon />
                    </IconButton>
                </Typography>


            </CardContent>
        </Card>
    )
}
