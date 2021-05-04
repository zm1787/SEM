import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Controls from '../controls';

// logo imports
import fullLogoColor from '../../images/logo/ColorNoBG.svg'
import fullLogoWhite from '../../images/logo/WhiteNoBG.svg'
import fullLogoBlack from '../../images/logo/BlackNoBG.svg'
import fullLogoColorWithBG from '../../images/logo/ColorWithBG.svg'
import fullLogoLight from '../../images/logo/FullLogoLight.svg'
import logo from '../../images/logo/logo.png'
import noSlogan1 from '../../images/logo/NoSloganTest1.svg'
import noSlogan2 from '../../images/logo/NoSloganTest2.svg'
import noSloganDark from '../../images/logo/NoSloganDark.svg'
import noSloganLight from '../../images/logo/NoSloganLight.svg'

// MUI
import { AppBar, Toolbar, Typography, IconButton, Menu } from '@material-ui/core';
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
        '& .MuiToolbar-gutters': {
            //padding: 0,
        },
        height: '64px',
        backgroundColor: theme.palette.background.nav,
    },
    gridContainer: {
        height: '100%',
        margin: 0,
    },
    logoImg: {
        marginTop: '2px',
        height: '85%',
        width: 'auto',
    },
    logoText: {
        color: theme.palette.primary.main,
        textAlign: 'center',
    },
    logoTextLink: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
    logoCell: {
        height: '100%',
        display: 'flex',
        paddingLeft: theme.spacing(2),
        //justifyContent: 'center',
        alignItems: 'center',
        //borderRight: `2px solid ${theme.palette.background.default}`,
    },
    loginButton: {
        borderRadius: '27px',
        textTransform: 'none',
        fontSize: '1rem',
        borderWidth: '2px',
        transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
        },
        margin: `0 ${theme.spacing(0.5)}px`,
    },
    logoutButton: {
        borderRadius: '27px',
        textTransform: 'none',
        fontSize: '1rem',
        borderWidth: '2px',
        transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
        },
        margin: `0 ${theme.spacing(0.5)}px`,
    },
    RegisterButton: {
        borderRadius: '27px',
        textTransform: 'none',
        fontSize: '1rem',
        margin: `0 ${theme.spacing(0.5)}px`,
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
            borderColor: theme.palette.primary.light,
        },
    },
    buttonSpan: {
        float: 'right',
    },
    MenuIconSpan: {
        float: 'right',
        paddingRight: theme.spacing(2),
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
    }
}))

export default function NavBar(props) {
    const theme = useTheme();
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector((store) => store.auth);
    const currentTheme = useSelector((store) => store.theme.selectedTheme);

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItemClick = (itemName) => {
        if (itemName === "logout") {
            dispatch(logoutUser());
        }
        if (itemName === "profile") {
            history.push("/profile");
        }
        // if (itemName === "myaccount") {
        //     history.push("/myaccount");
        // }
        if (itemName === "registerBusiness") {
            history.push("/registerBusiness");
        }
        if (itemName === "myBusinessList") {
            history.push("/myBusinessList");
        }
        if (itemName === "chat") {
            history.push("/chat");
        }

        handleClose();
    }

    return (
        <div>
            <AppBar className={classes.root} position="fixed" >
                <Toolbar className={classes.gridContainer} disableGutters>
                    <Grid container className={classes.gridContainer} alignItems="center">
                        <Grid className={classes.logoCell} item xs={2} >
                            {/* <Link to="/" className={classes.logoTextLink}>
                                <Typography className={classes.logoText} variant="h4">S.E.M</Typography>
                            </Link> */}
                            {currentTheme === 'dark' || currentTheme === 'darkBlue' ?
                                <Link to="/" className={classes.logoImg}>
                                    <img src={noSloganLight} alt="" className={classes.logoImg}></img>
                                </Link>
                                :
                                <Link to="/" className={classes.logoImg}>
                                    <img src={noSloganDark} alt="" className={classes.logoImg}></img>
                                </Link>
                            }
                        </Grid>
                        <Grid className={classes.logoCell} item xs={2} >
                            {isSmallScreen && <Typography>Small!</Typography>}
                        </Grid>
                        <Grid item xs={8} className={classes.buttons} >
                            {!auth.isAuthenticated ?
                                <span className={classes.buttonSpan}>
                                    <Controls.Button className={classes.loginButton}
                                        component={Link}
                                        to="/login"
                                        variant="outlined"
                                        text="Sign In"
                                    />
                                    <Controls.Button className={classes.RegisterButton}
                                        component={Link}
                                        to="/register"
                                        variant="filled"
                                        text="Register"
                                    />
                                </span>
                                :
                                <span className={classes.MenuIconSpan}>
                                    
                                    {auth.isAuthenticated && (
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
                                                <MenuItem onClick={() => menuItemClick("profile")}>
                                                    <AccountCircle className={classes.icon} fontSize="large" /> My Profile
                                                </MenuItem>
                                                <MenuItem onClick={() => menuItemClick("myBusinessList")}>
                                                    <BusinessIcon className={classes.icon} fontSize="large" /> My Businesses
                                                </MenuItem>
                                                <MenuItem onClick={() => menuItemClick("registerBusiness")}>
                                                    <BusinessIcon className={classes.icon} fontSize="large" /> Register a Business
                                                </MenuItem>
                                                <MenuItem onClick={() => menuItemClick("chat")}>
                                                    <ChatIcon className={classes.icon} fontSize="large" /> Messages
                                                </MenuItem>
                                                <MenuItem onClick={() => menuItemClick("logout")}>
                                                    <LockIcon className={classes.icon} fontSize="large" /> Sign Out
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    )}
                                </span>
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}
