import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import io from 'socket.io-client';
import { addNotification, removeNotification } from '../../actions/notificationActions';


import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles, Typography, Badge, IconButton, Menu, MenuItem, } from '@material-ui/core';
import { Palette } from '@material-ui/icons';


const useStyles = makeStyles(theme => ({
    notificationMenuButton: {
        marginRight: '30px',
        '& .MuiIconButton-root': {
            width: '50px',
            height: '50px',
            backgroundColor: theme.palette.components.iconButton.background,
            '&:hover': {
                backgroundColor: theme.palette.components.iconButton.backgroundHover,
            },
        },
        '& .notification-icon': {
            '& .MuiBadge-badge': {
                backgroundColor: 'red',
            }
        }
    },
}))

const NotificationMenuButton = () => {
    // Notification menu setup
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const ENDPOINT = 'localhost:5000';

    const auth = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const notifications = useSelector((store) => store.notifications);

    const classes = useStyles();

    const onAcceptFriendRequest = () => {
        console.log("Friend request accepted")
    }

    const onDeclineFriendRequest = () => {
        console.log("Friend request declined")
    }

    return (
        <div className={classes.notificationMenuButton}>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-profile"
                aria-haspopup="true"
                onClick={handleMenu}
            >
                {notifications ?
                    <Badge className="notification-icon"
                        badgeContent={notifications.length}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}>
                        <NotificationsIcon />
                    </Badge>
                    :
                    <NotificationsIcon />
                }
            </IconButton>
            <Menu
                id="menu-profile"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <div >
                    {notifications.length !== 0 ? notifications.map((item, index) => {
                        switch (item.type) {
                            case "Friend Request":
                                return (
                                    <div key={index}>
                                        <p>{item.type} from {item.senderName}</p>
                                        <button onClick={onAcceptFriendRequest}>Accept</button>
                                        <button onClick={onDeclineFriendRequest}>Decline</button>
                                    </div>
                                )
                            default:
                                return <p>Unknown notification!</p>;
                        }


                    })
                        :
                        <p>No new notifications!</p>
                    }

                </div>
            </Menu>
        </div>
    )
}

export default NotificationMenuButton
