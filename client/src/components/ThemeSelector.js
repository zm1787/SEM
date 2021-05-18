import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../actions/themeActions';




const useStyles = makeStyles(theme => ({
    root: {
        [theme.breakpoints.down('md')]: {
            marginTop: theme.spacing(3),
            width: '150px',
            float: 'right',
        },
        [theme.breakpoints.up('lg')]: {
            position: 'fixed',
            bottom: '0px',
            right: '0px',
        },
    },
}))

export default function ThemeSelector({ selectedTheme, setSelectedTheme, Themes }) {
    const classes = useStyles();
    const [value, setValue] = React.useState('darkBlue');
    const dispatch = useDispatch();



    useEffect(() => {
        if (value === 'dark') {
            setSelectedTheme(Themes.dark);
        }
        else if (value === 'darkBlue') {
            setSelectedTheme(Themes.darkBlue);
        }
        else {
            setSelectedTheme(Themes.light);
        }
        dispatch(selectTheme(value));
    }, [value, setSelectedTheme, Themes, dispatch]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Theme</FormLabel>
                <RadioGroup aria-label="theme" name="theme" value={value} onChange={handleChange}>
                    <FormControlLabel value="light" control={<Radio />} label="Light" />
                    <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                    <FormControlLabel value="darkBlue" control={<Radio />} label="Dark Blue" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}
