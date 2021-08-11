import React from 'react'
import { makeStyles, Button, Icon } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import BlockIcon from '@material-ui/icons/Block';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.error.main,
        "&:hover": {
            backgroundColor: theme.palette.error.dark,
        }
    },
}));

const CancelButton = ({ toggleMode }) => {
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            variant="contained"
            size="medium"
            onClick={toggleMode}
            startIcon={<CloseIcon />}
        >
            Cancel
        </Button>
    )
}

export default CancelButton
