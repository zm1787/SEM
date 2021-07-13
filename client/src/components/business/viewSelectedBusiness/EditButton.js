import React from 'react'
import { makeStyles, Button, Icon } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    button: {

    },
}));

const EditButton = ({ toggleMode }) => {
    const classes = useStyles();

    return (
        <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            size="small"
            onClick={toggleMode}
            startIcon={<EditIcon />}
        >
            Edit
        </Button>
    )
}

export default EditButton
