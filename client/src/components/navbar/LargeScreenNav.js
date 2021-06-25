import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import NotificationMenuButton from './notifications/NotificationMenuButton';
import ModeToggle from './modeToggle/ModeToggle';

// logo imports
import noSloganDark from '../../images/logo/NoSloganDark.svg'
import noSloganLight from '../../images/logo/NoSloganLight.svg'

// MUI
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        height: '64px',
        backgroundColor: theme.palette.background.nav,
    },
    OuterFlexContainer: {
        margin: '0 30px',
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
    notificationMenuButton: {
        marginRight: '30px',
    },

}))

const buttonList = [
    { btnText: "Profile", pageName: "profile", type: "any" },
    { btnText: "Find Specialist", pageName: "find-specialist", type: "seeker" },
    { btnText: "Register a Business", pageName: "register-business", type: "business" },
    { btnText: "My Businesses", pageName: "my-business-list", type: "business" },
    { btnText: "Messages", pageName: "chat", type: "any" },
]



export default function LargeScreenNav({ currentTheme }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((store) => store.auth);
    const mode = useSelector((store) => store.mode);


    const onMenuItemClick = (pageName) => {
        if (pageName === "logout") {
            dispatch(logoutUser());
        }
        else {
            history.push(`/${pageName}`);
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
                                btn.type === mode || btn.type === "any" ?
                                    <Button className={classes.btn}
                                        key={index}
                                        size="large"
                                        color="primary"
                                        onClick={() => onMenuItemClick(btn.pageName)}
                                    >
                                        {btn.btnText}
                                    </Button>
                                    :
                                    null
                            ))}
                        </div>
                        :
                        <div >

                        </div>
                    }
                    {/* Right Nav */}
                    {auth.isAuthenticated ?
                        <div className={classes.buttonsFlexContainer}>
                            <ModeToggle />
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
