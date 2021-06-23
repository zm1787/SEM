import { blue, lightBlue, green } from '@material-ui/core/colors';

export const light = {
    palette: {
        type: 'light',
        primary: {
            main: blue[300],
            contrastText: '#ffffff',
        },
        secondary: {
            main: green['400'],
        },
        components: {
            iconButton: {
                background: '#f0f2f5',
                backgroundHover: '#a3a5a8',
            },
        },
        background: {
            default: '#f4f5fd', // Off-white ish 

            paper: '#ffffff',

            // light border 
            border: '#a3a5a8',

            // field glow
            fieldGlow: '#ffffff',

            // nav
            nav: '#ffffff',
            navContrast: '#000000',

            field: '#f0f2f5',
        },
        text: {
            primary: '#050505' /*'#050505'*/,
            secondary: '#a3a5a8', // 8aa4c1, 
            text: '#e4e6eb', // light grey FB text

        },
    },

    typography: {
        h4: {
            fontWeight: 500,
        },
    },
}



export const darkBlue = {
    palette: {
        type: 'dark',
        primary: {
            main: '#1dcdfe', // 1dcdfe, 21d0b2, 34f5c5
            contrastText: '#233243',
        },

        secondary: {
            main: '#21d0b2',
            light: '#34f5c5',
        },

        components: {
            iconButton: {
                background: '#2f455c',
                backgroundHover: '#3d5876',
            },
            borders: {
                main: '#2f455c',
            }
        },

        background: {
            default: '#1a2632',
            darkest: '#1a2632',

            field: '#354b64',

            // light border 
            border: '#5a6169',

            //darker
            darker: '#1a2632',

            // dark
            dark: '#233243',
            paper: '#233243',

            // field glow
            fieldGlow: '#ffffff',

            // nav
            nav: '#233243',
            navContrast: '#ffffff',

            // light
            light: '#2f455c',

            // lighter
            lighter: '#3d5876',

            contrastText: '#000000',
        },
        text: {
            primary: '#dee5ed', // light grey card text
            fbSecondary: '#b0b3b8', // FB grayer gray (lower contrast over background)
            secondary: '#9bb1ca', // 8aa4c1, 
            text: '#e4e6eb', // light grey FB text
            white: '#ffffff',

        },
    },
    typography: {
        h4: {
            fontWeight: 500,
        }
    },
}


export const dark = {
    palette: {
        type: 'dark',

        primary: {
            main: '#f99f22', // 1dcdfe, 21d0b2, 34f5c5
            contrastText: '#ffffff',
        },

        secondary: {
            main: lightBlue['600'],
        },
        components: {
            iconButton: {
                background: '#2f455c',
                backgroundHover: '#3d5876',
            },
        },
        background: {
            default: '#212832',
            darkest: '#212832',

            field: '#373f49',

            //darker
            darker: '#1a2632',

            // dark
            dark: '#29323d',
            paper: '#29323d',

            // nav
            nav: '#212731',
            navContrast: '#ffffff',

            // field glow
            fieldGlow: '#ffffff',

            // light border 
            border: '#5a6169',

            // light
            light: '#2f455c',

            // lighter
            lighter: '#3d5876',

            contrastText: '#000000',
        },
        text: {
            primary: '#ffffff', // light grey card text
            secondary: '#818b97', // 8aa4c1, 
            text: '#e4e6eb', // light grey FB text
            white: '#ffffff',

        },
    },
    typography: {
        h4: {
            fontWeight: 500,
        }
    },
}