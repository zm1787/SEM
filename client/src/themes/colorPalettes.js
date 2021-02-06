import { blue, lightBlue, amber, orange, yellow } from '@material-ui/core/colors';

export const light = {
    type: 'light',
    primary: {
        main: blue[200],
        contrastText: '#ffffff',
    },
    secondary: {
        main: blue['A400'],
    },
    background: {
        default: '#f4f5fd', // Off-white ish 

        paper:       '#ffffff',

        field:      '#f0f2f5',
    },
    text: {
        primary: '#050505', 
        secondary: '#a3a5a8', // 8aa4c1, 
        text: '#e4e6eb', // light grey FB text
 
    },
    typography: {
        h4: {
            fontWeight: 500,
        },
    },
}



export const dark = {
    type: 'dark',
    primary: {
        main: '#1dcdfe', // 1dcdfe, 21d0b2, 34f5c5
        contrastText: '#233243',
    },
    secondary: {
        main: '#21d0b2',
        light: '#34f5c5',
    },
    
    background: {
        default:    '#1a2632',
        darkest:    '#1a2632',

        field:      '#354b64',

        //darker
        darker:     '#1a2632',

        // dark
        dark:       '#233243',
        nav:       '#233243',
        paper:       '#233243',
        
        // light
        light:      '#2f455c',

        // lighter
        lighter:    '#3d5876',

        contrastText: yellow['A700'],
    },
    text: {
        primary: '#dee5ed', // light grey card text
        fbSecondary: '#b0b3b8', // FB grayer gray (lower contrast over background)
        secondary: '#9bb1ca', // 8aa4c1, 
        text: '#e4e6eb', // light grey FB text
        white: '#ffffff',

    },
    typography: {
        h4: {
            fontWeight: 500,
        }
    },
}
