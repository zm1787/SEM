import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { connectSocket, disconnectSocket } from './actions/socketActions';
import { loadUserProfile } from './actions/authActions';
import { loadNotification } from './actions/notificationActions';
import { Switch, Route } from 'react-router-dom';
import './app.css';

// sass styles
import './styles/app.css';

// Pages
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import RegisterBusinessPage from './pages/RegisterBusiness';
import MyBusinessList from './pages/MyBusinessList';
import ViewMyBusinessPage from './pages/ViewMyBusiness';
import FindSpecialist from './pages/FindSpecialist';
import ChatDashBoard from './components/chat/ChatDashBoard';

// Components
import NavBar from './components/navbar';
import * as Themes from './themes/costomThemes';
import ThemeSelector from './components/ThemeSelector';

// TEST DELETE THIS
import logoLight from './images/logo/FullLogoLight.svg';
import logoDark from './images/logo/FullLogoDark.svg';
import logoColor from './images/logo/ColorNoBG.svg';
import noSloganDark from './images/logo/NoSloganDark.svg'
import noSloganLight from './images/logo/NoSloganLight.svg'

// Material UI
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';



const useStyles = makeStyles(theme => ({
    appMain: {

    },
    logoImg: {
        height: '200px',
        width: 'auto',
        margin: '50px auto',
        display: 'block',
    },
    logoDiv: {
        width: '100%',
    },
    navBG: {
        backgroundColor: '#233243',
    },
}));

const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector((store) => store.auth);

    const classes = useStyles();

    const [selectedTheme, setSelectedTheme] = React.useState(Themes.darkBlue);
    const theme = createMuiTheme(selectedTheme)

    useEffect(() => {
        dispatch(loadUserProfile());
    }, [dispatch]);


    // Connect socket and load notifications
    useEffect(() => {
        if (auth.user) {
            const user_id = auth.user._id
            dispatch(loadNotification(auth.user.notifications));
            dispatch(connectSocket(user_id));
        }
        else {
            dispatch(disconnectSocket());
        }
    }, [auth.user, dispatch])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className={classes.appMain}>
                <NavBar />
                <h3>{auth.isLoading ? "Loading..." : auth.isAuthenticated ? "Authenticated" : "Not Authenticated"}</h3>
                <Switch>
                    <Route exact path="/viewLogos" >
                        <div className={classes.logoDiv}>
                            <img src={logoLight} alt="" className={classes.logoImg}></img>
                        </div>
                        <div className={classes.logoDiv}>
                            <img src={logoDark} alt="" className={classes.logoImg}></img>
                        </div>
                        <div className={classes.logoDiv}>
                            <img src={logoColor} alt="" className={classes.logoImg}></img>
                        </div>
                        <div className={classes.logoDiv}>
                            <img src={noSloganDark} alt="" className={classes.logoImg}></img>
                        </div>
                        <div className={classes.logoDiv}>
                            <img src={noSloganLight} alt="" className={classes.logoImg}></img>
                        </div>
                        <div className={classes.navBG}>
                            <div className={classes.logoDiv}>
                                <img src={logoLight} alt="" className={classes.logoImg}></img>
                            </div>
                            <div className={classes.logoDiv}>
                                <img src={logoDark} alt="" className={classes.logoImg}></img>
                            </div>
                            <div className={classes.logoDiv}>
                                <img src={logoColor} alt="" className={classes.logoImg}></img>
                            </div>
                            <div className={classes.logoDiv}>
                                <img src={noSloganDark} alt="" className={classes.logoImg}></img>
                            </div>
                            <div className={classes.logoDiv}>
                                <img src={noSloganLight} alt="" className={classes.logoImg}></img>
                            </div>
                        </div>
                    </Route>
                    <Route exact path="/" >
                        <HomePage />
                    </Route>
                    <Route exact path="/profile" >
                        <ProfilePage />
                    </Route>
                    <Route exact path="/register" >
                        <RegisterPage />
                    </Route>
                    <Route exact path="/login" >
                        <LoginPage />
                    </Route>
                    <Route exact path="/register-business" >
                        <RegisterBusinessPage />
                    </Route>
                    <Route exact path="/my-business-list" >
                        <MyBusinessList />
                    </Route>

                    <Route exact path="/view-my-business" component={ViewMyBusinessPage} />

                    <Route exact path="/find-specialist" component={FindSpecialist} />

                    <Route exact path="/chat" component={ChatDashBoard} />

                </Switch>
                <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} Themes={Themes} />
            </div>
        </ThemeProvider>
    )
}

export default App;