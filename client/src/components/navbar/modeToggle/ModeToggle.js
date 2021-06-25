import React from 'react'
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles} from "@material-ui/core"
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab"
import { fade } from '@material-ui/core/styles/colorManipulator';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMode } from '../../../actions/modeActions';


const useStyles = makeStyles(theme => ({
    verticalFlexContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        overflow: 'hidden',
    },
    toggleLabelContainer: {
        //textAlign: 'center',
        paddingLeft: '5px',
        color: theme.palette.text.secondary,
    },
    modeToggle: {
        margin: 'auto 0',
        "& .MuiToggleButton-root": {
            height: '30px',
            border: 'none',
            borderTop: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 0,
        },
        "& .MuiToggleButton-root.Mui-selected": {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            "&:hover": {
                //backgroundColor: fade(theme.palette.primary.main, 0.6)
            }
        },
        "& .MuiToggleButton-root:not(.MuiToggleButton-root.Mui-selected)": {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
            borderColor: theme.palette.primary.main,
            "&:hover": {
                backgroundColor: fade(theme.palette.primary.main, 0.12),
            }
        },
    },
}));

const ModeToggle = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const mode = useSelector((store) => store.mode);
    const history = useHistory();

    const onToggleMode = (event, newMode) => {
        if (newMode !== null) {
            dispatch(toggleMode());
            if(newMode === "seeker") {
                history.push("/find-specialist")
            }
            if(newMode === "business") {
                history.push("/my-business-list")
            }
        }
    };

    return (
        <div className={classes.verticalFlexContainer}>
            <div className={classes.toggleLabelContainer}>
                <Typography>Mode</Typography>
            </div>
            <div className={classes.modeToggle}>
                <ToggleButtonGroup
                    value={mode}
                    exclusive
                    onChange={onToggleMode}
                    aria-label="mode"
                >
                    <ToggleButton disableRipple value="seeker" aria-label="seeker">
                        Seeker
                    </ToggleButton>
                    <ToggleButton disableRipple value="business" aria-label="seeker">
                        Business
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )
}

export default ModeToggle
