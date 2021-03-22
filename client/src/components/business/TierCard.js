import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '300px',
        minHeight: '390px',
        borderRadius: '8px',
        paddingTop: '15px',
    },
    title: {
        marginTop: theme.spacing(1),
        textAlign: 'center',
        textTransform: 'capitalize',
        color: theme.palette.text.primary,
    },
    superscript: {
        fontSize: '14px',
    },
    subscript: {
        fontSize: '14px',
    },
    descriptionDiv: {
        width: '90%',
        borderRadius: '12px',
        margin: '32px auto 12px',
        padding: '8px',
    },
}))

function selectTierInfo(tier) {
    if (tier === 'gold') {
        return {
            name: "gold",
            color: '#000000',
            BGImage: 'linear-gradient(-45deg, rgba(255,221,26,1) 0%,rgba(204,173,0,1) 25%,rgba(255,221,26,1) 50%,rgba(204,173,0,1) 75%,rgba(255,221,26,1) 100%)',
            price: "11.99",
            description: `Perks of upgrading to gold:\n
            - 3 review deleted per year\n
            - Boost your profile to the top of your search category twice a month\n
            - Earn a gold profile background\n
            * MUST BE BONDED TO QUALIFY`,
        }
    }
    if (tier === 'silver') {
        return {
            name: "silver",
            color: '#000000',
            BGImage: 'linear-gradient(-45deg, rgba(242,242,242,1) 0%,rgba(166,166,166,1) 27%,rgba(217,217,217,1) 51%,rgba(166,166,166,1) 76%,rgba(242,242,242,1) 100%)',
            price: "7.99",
            description: `Perks of upgrading to silver:\n
            - 1 review deleted per year\n
            - Boost your profile to the top of your search category once a month\n
            - Earn a silver profile background`,
        }
    }
    if (tier === 'bronze') {
        return {
            name: "bronze",
            color: '#000000',
            BGImage: 'radial-gradient(circle farthest-corner at center, rgba(176, 141, 87,1) 15%, rgba(176, 134, 69,1) 35%, rgba(176, 127, 52,1) 50%, rgba(176, 120, 34,1) 65%, rgba(176, 113, 17,1) 85%, rgba(176, 107, 0,1) 100%)',
            price: "4.99",
            description: `Start your journey today as a SEM specialist. Make your own scheduale and charge your rate.`,
        }
    }
    return {
        color: '#CD7F32',
        price: "4.99",
    };
}

function NewlineText(props) {
    const text = props.text;
    const newText = text.split('\n').map((str, index) => <Typography variant="body1" key={index} style={props.styles}>{str}</Typography>);
    return newText;
}

export default function TierCard(props) {
    const classes = useStyles();
    const tier = selectTierInfo(props.tier);


    const styles = {
        root: {
            border: `2px solid ${tier.color}`,
            background: tier.BGImage,
        },
        description: {
            border: `2px solid ${tier.color}`,
            //backgroundColor: '#c0c0c0',
        },
        tierColor: {
            color: tier.color,
        },
    }

    return (
        <>
            <div className={classes.root} style={styles.root}>
                <Typography
                    variant="h4"
                    className={classes.title}
                    style={styles.tierColor}
                >
                    {props.tier}
                </Typography>
                <Typography
                    variant="h5"
                    className={classes.title}
                    style={styles.tierColor}
                >
                    ${tier.price}<sub className={classes.subscript}>/ month</sub>
                </Typography>
                <div className={classes.descriptionDiv} style={styles.description}>
                    <NewlineText text={tier.description} styles={styles.tierColor} />
                </div>
            </div> 
        </>
    )
}
