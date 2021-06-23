import React from 'react'
import { useSelector } from 'react-redux';
import { FRIEND_REQUEST, MESSAGE } from '../../../constants/AppConstants';

import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles, Badge, IconButton, Menu } from '@material-ui/core';

import FriendRequest from './FriendRequest';


const useStyles = makeStyles(theme => ({
    notificationMenuButton: {
        //marginRight: '30px',
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
    const classes = useStyles();

    // Notification menu setup
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const notifications = useSelector((store) => store.notifications);

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
                            case FRIEND_REQUEST:
                                return (
                                    <div key={index}>
                                        <FriendRequest item={item} />
                                    </div>
                                )

                                case MESSAGE:
                                    return (
                                        <div key={index}>
                                            <p>{item.message}</p>
                                        </div>
                                    )

                            default:
                                return <div key={index}><p>Unknown notification type!</p></div>;
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
