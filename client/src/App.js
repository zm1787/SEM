import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions/userActions';
import { loadUserProfile } from './actions/authActions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

// Pages
import RegisterPage from './pages/Register';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import RegisterBusinessPage from './pages/RegisterBusiness';

// Components
import BusinessCardsList from './components/business/BusinessCardsList';
import NavBar from './components/Navbar';
import * as Themes from './themes/costomThemes';
import ThemeSelector from './components/ThemeSelector';
import StripeContainer from './components/business/registerForm/stripePayment/StripeContainer';

// Material UI
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles({
    appMain: {

    }
})

const App = () => {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users); // Select required part of the store
    const auth = useSelector((store) => store.auth);

    const classes = useStyles();

    const [selectedTheme, setSelectedTheme] = React.useState(Themes.dark);
    const theme = createMuiTheme(selectedTheme)

    // test stripe state
    const [showItem, setShowItem] = React.useState(false);


    useEffect(() => {
        dispatch(loadUserProfile());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <div className={classes.appMain}>
                    <NavBar />
                    <h3>{auth.isLoading ? "Loading..." : auth.isAuthenticated ? "Authenticated" : "Not Authenticated"}</h3>
                    <Switch>
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
                        <Route exact path="/listusers" >
                            <BusinessCardsList users={users} />
                        </Route>
                        <Route exact path="/registerBusiness" >
                            <RegisterBusinessPage />
                        </Route>
                        <Route exact path="/testStripePay" >
                            <div className="spatula">
                                <h1>The Spatula Store</h1>
                                {showItem ? <StripeContainer /> : <> <h3>$10.00</h3> <button className="testBtn" onClick={() => setShowItem(true)}>Purchase Spatula</button></>}
                            </div>
                        </Route>
                    </Switch>
                    <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} Themes={Themes} />
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App;