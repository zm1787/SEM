import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Controls from '../controls';
import NotificationMenuButton from './notifications/NotificationMenuButton';

// logo imports
import noSloganDark from '../../images/logo/NoSloganDark.svg'
import noSloganLight from '../../images/logo/NoSloganLight.svg'

// MUI
import { AppBar, Toolbar, Typography, IconButton, Menu, Button } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import {
    Menu as MenuIcon,
    Person as PersonIcon,
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
        margin: '0 60px',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttonsFlexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    btn: {
        fontSize: '16px',
        textTransform: 'none',
        margin: 'auto 4px',
        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
    },
    rightNavBtns: {
        textTransform: 'none',

        '&:focus': {
            boxShadow: 'none',
            outline: 'none',
        },
    },
    logoImg: {
        marginTop: '2px',
        height: '85%',
        width: 'auto',
    },
}))

const buttonList = [
    { btnText: "Find Specialist", pageName: "find-specialist" },
    { btnText: "Profile", pageName: "profile" },
    { btnText: "Register a Business", pageName: "register-business" },
    { btnText: "My Businesses", pageName: "my-business-list" },
    { btnText: "Messages", pageName: "chat" },
]



export default function LargeScreenNav({ currentTheme }) {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((store) => store.auth);

    const onMenuItemClick = (item) => {
        if (item === "logout") {
            dispatch(logoutUser());
            return;
        }
        if (item === "login") {
            history.push("/login");
            return;
        }
        if (item === "register") {
            history.push("/register");
            return;
        }
        if (item === "profile") {
            history.push("/profile");
            return;
        }
        if (item === "register-business") {
            history.push("/register-business");
            return;
        }
        if (item === "my-business-list") {
            history.push("/my-business-list");
            return;
        }
        if (item === "chat") {
            history.push("/chat");
            return;
        }
        if (item === "find-specialist") {
            history.push("/find-specialist");
            return;
        }
    }

    return (
        <div>
            <AppBar className={classes.root} position="fixed" >
                <Toolbar className={classes.OuterFlexContainer} disableGutters>
                    {currentTheme === 'dark' || currentTheme === 'darkBlue' ?
                        <Link to="/" className={classes.logoImg}>
                            <img src={noSloganLight} alt="" className={classes.logoImg}></img>
                        </Link>
                        :
                        <Link to="/" className={classes.logoImg}>
                            <img src={noSloganDark} alt="" className={classes.logoImg}></img>
                        </Link>
                    }
                    {/* Middle Nav */}
                    {auth.isAuthenticated ?
                        <div className={classes.buttonsFlexContainer}>
                            {buttonList.map((btn, index) => (
                                <Button className={classes.btn} key={index} size="large" color="primary" onClick={() => onMenuItemClick(btn.pageName)}>{btn.btnText}</Button>
                            ))}
                        </div>
                        :
                        <div >

                        </div>
                    }
                    {/* Right Nav */}
                    {auth.isAuthenticated ?
                        <div className={classes.buttonsFlexContainer}>
                            <div className={classes.notificationMenuButton}>
                                <NotificationMenuButton />
                            </div>
                            <Button className={classes.btn} variant="outlined" color="primary" onClick={() => onMenuItemClick("logout")}>Log Out</Button>
                        </div>
                        :
                        <div className={classes.buttonsFlexContainer}>
                            <Button className={classes.btn} variant="outlined" color="primary" onClick={() => onMenuItemClick("login")}>Sign In</Button>
                            <Button className={classes.btn} variant="outlined" color="primary" onClick={() => onMenuItemClick("register")}>Register</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}
