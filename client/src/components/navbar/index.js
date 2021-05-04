import React from 'react';
import LargeScreenNav from './LargeScreenNav';
import SmallScreenNav from './SmallScreenNav';
import { useSelector, useDispatch } from 'react-redux';


import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const Navbar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const currentTheme = useSelector((store) => store.theme.selectedTheme);


    return (
        <>
            {isSmallScreen ? 
                <SmallScreenNav currentTheme={currentTheme}/>
                :
                <LargeScreenNav currentTheme={currentTheme}/>
            }
        </>
    )
}

export default Navbar;
