import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Controls from '../controls';

// logo imports
import noSloganDark from '../../images/logo/NoSloganDark.svg'
import noSloganLight from '../../images/logo/NoSloganLight.svg'

// MUI
import { AppBar, Toolbar, Typography, IconButton, Menu, Button } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import {
    Menu as MenuIcon,
    PersonOutline as PersonIcon,
    PersonAdd as RegisterIcon,
    AccountCircle,
    Lock as LockIcon,
    Business as BusinessIcon,
    Chat as ChatIcon,
} from '@material-ui/icons/';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';




const useStyles = makeStyles(theme => ({
    root: {
        height: '64px',
        backgroundColor: theme.palette.background.nav,
    },
    OuterFlexContainer: {
        margin: '0 20px',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    logoImg: {
        marginTop: '2px',
        height: '80%',
        width: 'auto',
    },
    MenuIcon: {
        color: theme.palette.text.primary,
        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
    },
    icon: {
        marginRight: '15px',
        color: theme.palette.text.secondary,
    },
    btn: {
        fontSize: '16px',
        textTransform: 'none',
        margin: '0 4px',
        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
    },
}))





export default function LargeScreenNav({ currentTheme }) {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((store) => store.auth);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onMenuItemClick = (item) => {
        if (item === "logout") {
            dispatch(logoutUser());
        }
        if (item === "login") {
            history.push("/login");
        }
        if (item === "register") {
            history.push("/register");
        }
        if (item === "profile") {
            history.push("/profile");
        }
        if (item === "registerBusiness") {
            history.push("/registerBusiness");
        }
        if (item === "myBusinessList") {
            history.push("/myBusinessList");
        }
        if (item === "chat") {
            history.push("/chat");
        }

        handleClose();
    }

    return (
        <div>
            <AppBar className={classes.root} position="fixed" >
                <Toolbar className={classes.OuterFlexContainer} disableGutters>
                    <div>

                    </div>
                    {currentTheme === 'dark' || currentTheme === 'darkBlue' ?
                        <Link to="/" className={classes.logoImg}>
                            <img src={noSloganLight} alt="" className={classes.logoImg}></img>
                        </Link>
                        :
                        <Link to="/" className={classes.logoImg}>
                            <img src={noSloganDark} alt="" className={classes.logoImg}></img>
                        </Link>
                    }
                    <div>
                        <IconButton className={classes.MenuIcon}
                            aria-label="account of current user"
                            aria-controls="menu-profile"
                            aria-haspopup="true"
                            onClick={handleMenu}
                        >
                            <MenuIcon fontSize="large" />
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
                            {auth.isAuthenticated ?
                                <div >
                                    <MenuItem onClick={() => onMenuItemClick("profile")}>
                                        <AccountCircle className={classes.icon} fontSize="large" /> My Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => onMenuItemClick("myBusinessList")}>
                                        <BusinessIcon className={classes.icon} fontSize="large" /> My Businesses
                                    </MenuItem>
                                    <MenuItem onClick={() => onMenuItemClick("registerBusiness")}>
                                        <BusinessIcon className={classes.icon} fontSize="large" /> Register a Business
                                    </MenuItem>
                                    <MenuItem onClick={() => onMenuItemClick("chat")}>
                                        <ChatIcon className={classes.icon} fontSize="large" /> Messages
                                    </MenuItem>
                                    <MenuItem onClick={() => onMenuItemClick("logout")}>
                                        <LockIcon className={classes.icon} fontSize="large" /> Sign Out
                                    </MenuItem>
                                </div>
                                :
                                <div >
                                    <MenuItem onClick={() => onMenuItemClick("login")}>
                                        <PersonIcon className={classes.icon} fontSize="large" /> Sign In
                                    </MenuItem>
                                    <MenuItem onClick={() => onMenuItemClick("register")}>
                                        <RegisterIcon className={classes.icon} fontSize="large" /> Register
                                    </MenuItem>
                                </div>
                            }
                        </Menu>
                    </div>

                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}
