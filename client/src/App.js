import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions/userActions';
import { loadUser } from './actions/authActions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

// Components
import Register from './pages/Register';
import Home from './pages/Home';
import LoginForm from './components/auth/LoginForm';
import SpecialistCardsList from './components/SpecialistCardsList';
import NavBar from './components/Navbar';
import * as Themes from './themes/costomThemes';
import ThemeSelector from './components/ThemeSelector';

// Material UI
import { Grid, makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles({
    appMain: {

    }
})

const App = () => {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users); // Select required part of the store
    const auth = useSelector((store) => store.auth);

    const classes = useStyles();

    const [selectedTheme, setSelectedTheme] = React.useState(Themes.light);
    const theme = createMuiTheme(selectedTheme)


    useEffect(() => {
        dispatch(loadUser());
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
                            <Home />
                        </Route>
                        <Route exact path="/register" >
                            <Register />
                        </Route>
                        <Route exact path="/login" >
                            <LoginForm />
                        </Route>
                        <Route exact path="/listusers" >
                            <SpecialistCardsList users={users} />
                        </Route>
                    </Switch>
                    <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} Themes={Themes} />
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App;