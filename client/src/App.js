import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions/userActions';
import { addSocket } from './actions/socketActions';
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

import ChatDashBoard from './components/chat/ChatDashBoard';

// Components
import BusinessCardsList from './components/business/BusinessCardsList';
import NavBar from './components/navbar';
import * as Themes from './themes/costomThemes';
import ThemeSelector from './components/ThemeSelector';
import StripeContainer from './components/business/registerForm/stripePayment/StripeContainer';


// TEST DELETE THIS
import logoLight from './images/logo/FullLogoLight.svg';
import logoDark from './images/logo/FullLogoDark.svg';
import logoColor from './images/logo/ColorNoBG.svg';
import logoTest from './images/logo/Test.svg';



// Material UI
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Block } from '@material-ui/icons';

const useStyles = makeStyles({
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
})




const App = () => {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users); // Select required part of the store
    const auth = useSelector((store) => store.auth);

    const classes = useStyles();

    const [selectedTheme, setSelectedTheme] = React.useState(Themes.darkBlue);
    const theme = createMuiTheme(selectedTheme)

    // test stripe state
    const [showItem, setShowItem] = React.useState(false);


    useEffect(() => {
        dispatch(loadUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if(auth.user) {
            dispatch(loadNotification(auth.user.notifications));
        }
    }, [dispatch, auth.user]);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    // Connect socket
    useEffect(() => {
        if(auth.user) {
            const user_id = auth.user._id
            
            dispatch(addSocket("notifications", user_id));

            return () => {
                // socket.emit('disconnect-chat', { user_id });
                // socket.off();
            };
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
                            <img src={logoTest} alt="" className={classes.logoImg}></img>
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

                    {/* TO BE REMOVED */}
                    {/* ####################################### */}
                    <Route exact path="/listusers" >
                        <BusinessCardsList users={users} />
                    </Route>
                    {/* ####################################### */}

                    <Route exact path="/registerBusiness" >
                        <RegisterBusinessPage />
                    </Route>
                    <Route exact path="/myBusinessList" >
                        <MyBusinessList />
                    </Route>

                    <Route exact path="/view-my-business" component={ViewMyBusinessPage} />

                    <Route exact path="/chat" component={ChatDashBoard} />

                    <Route exact path="/testStripePay" >
                        <div className="spatula">
                            <h1>The Spatula Store</h1>
                            {showItem ? <StripeContainer /> : <> <h3>$10.00</h3> <button className="testBtn" onClick={() => setShowItem(true)}>Purchase Spatula</button></>}
                        </div>
                    </Route>
                </Switch>
                <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} Themes={Themes} />
            </div>
        </ThemeProvider>
    )
}

export default App;