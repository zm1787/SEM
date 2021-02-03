import { Person } from '@material-ui/icons';
import { InputAdornment } from '@material-ui/core';



// ENDORMENTS (text fields, maybe more?)

// Person
export function PersonIcon() {
    return (
        <InputAdornment position="start">
            <Person color="primary" />
        </InputAdornment>
    )
}