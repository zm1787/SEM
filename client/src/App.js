import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from './actions/userActions';
import { loadUser } from './actions/authActions';
import './app.css';

// Components
import RegisterModal from './components/auth/RegisterModal';
import RegisterSeekerForm from './components/auth/RegisterSeekerForm';
import SpecialistCardsList from './components/SpecialistCardsList';
import NavBar from './components/Navbar';
import { light, dark } from './themes/colorPalettes';

// Material UI
import { Grid, makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';

const selectedTheme = dark;

const theme = createMuiTheme({
    palette: selectedTheme,
    typography: {
        root: {
            color: '#dee5ed',
        },
        h4: {
            fontWeight: 500,
        }
    },
    paper:
    {
        backgroundColor: '#3d5876',
    }

})

const useStyles = makeStyles({
    appMain: {

    }
})

const App = () => {
    const dispatch = useDispatch();
    const users = useSelector((store) => store.users); // Select required part of the store

    const classes = useStyles();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            {/* TODO: Turn this grid component into a seperate file as the register page */}
            <div className="mainApp">
                <NavBar />
                <Grid container>
                    <Grid item sm={12} md={6}>
                        <RegisterModal />
                        <RegisterSeekerForm />
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <SpecialistCardsList users={users} />
                    </Grid>
                </Grid>
                <CssBaseline />
            </div>
        </ThemeProvider>
    )
}

export default App;