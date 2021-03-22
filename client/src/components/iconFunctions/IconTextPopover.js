import React from 'react';
import { makeStyles } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import {
    Typography,
    Popover,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        maxWidth: '250px',
        padding: theme.spacing(1),
    },
    Adornment: {
        color: theme.palette.text.secondary,
        fontSize: '30px'
    }
}));

export default function IconTextPopover({msg, icon}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Icon = icon;

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="icon-text-popover">
            <Icon className={classes.Adornment}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            />
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography>{msg ? msg : ""}</Typography>
            </Popover>
        </div>
    );
}