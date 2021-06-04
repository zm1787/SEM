import React from 'react'
import { Card, makeStyles, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux'
import io from 'socket.io-client';


const useStyles = makeStyles( theme => ({
    root: {
        padding: theme.spacing(2),
        margin: '0 auto 30px auto',
        maxWidth: '300px',
        backgroundColor: theme.palette.background.dark,
    },
    cardInfo: {
        justifyContent: 'center',
    },
    cardText: {
        //color: '#e4e6eb',
        color: theme.palette.text.main,
    }
}))


export default function BusinessCard({ business }) {

    const auth = useSelector((store) => store.auth)
    const socket = useSelector((store) => store.socket);

    const onSendFriendRequest = () => {
        const user = auth.user;

        const newRequest = {
            type: "Friend Request",
            senderName: `${user.firstName} ${user.lastName}`,
            receiver_id: business.owner._id,
            sender_id: user._id,
        };
        
        socket.emit('send-friend-request', newRequest);
    }

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <div className={classes.cardInfo}>
                    <Typography className={classes.cardText} variant="h5">{business.name}</Typography>
                    <Typography className={classes.cardText} variant="h5">{business.address.full}</Typography>
                    <Typography className={classes.cardText} variant="h5">{business.phoneNumber}</Typography>
                    <Typography className={classes.cardText} variant="h5">{business.owner.firstName} {business.owner.lastName}</Typography>
                </div>
                <div>
                    <button onClick={onSendFriendRequest}>Message</button>
                </div>
            </Card>
        </div >
    )
}
