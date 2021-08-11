import React from 'react'
import { Link } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    makeStyles,
    Divider,
    Typography
} from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import ContactInfoIcon from '@material-ui/icons/ContactSupportOutlined';
import EmailIcon from '@material-ui/icons/EmailOutlined';
import PhoneIcon from '@material-ui/icons/PhoneOutlined';
import { useSelector } from 'react-redux'
import { FRIEND_REQUEST, MESSAGE } from '../../constants/AppConstants';
import io from 'socket.io-client';
import testProfilePic from '../../images/testImages/WeldingBusinessProfilePic.jpg';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        margin: '0 15px 30px 15px',
        width: '400px',
        backgroundColor: theme.palette.background.dark,
    },
    cardInfo: {
        justifyContent: 'center',
    },
    cardText: {
        //color: '#e4e6eb',
        color: theme.palette.text.main,
    },
    media: {
        height: 170,
    },
    divider: {
        margin: '7px 0',
    },
    messageButtonContainer: {
        justifyContent: 'right',
    },
}))


export default function BusinessCard({ business }) {

    const auth = useSelector((store) => store.auth)
    const socket = useSelector((store) => store.socket);

    const onSendFriendRequest = () => {
        const user = auth.user;

        const newRequest = {
            type: FRIEND_REQUEST,
            senderName: `${user.firstName} ${user.lastName}`,
            receiver_id: business.owner._id,
            businessName: business.name,
            sender_id: user._id,
        };
        console.log(newRequest)

        socket.emit('send-friend-request', newRequest);
    }

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root} variant="outlined">
                <CardMedia
                    className={classes.media}
                    image={testProfilePic}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography variant="h5" component="h2" color="primary">
                        {business.name}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                        <BuildIcon fontSize="small" /> {business.serviceType}
                    </Typography>
                </CardContent>
                <Divider className={classes.divider} />
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        {business.description}
                    </Typography>
                </CardContent>
                <Divider className={classes.divider} />
                <CardContent>
                    <div className={classes.contactContainer}>
                        {business.email && <Typography gutterBottom color="textSecondary" variant="body1"><EmailIcon /> {business.email}</Typography>}
                        {business.phoneNumber && <Typography color="textSecondary" variant="body1"><PhoneIcon /> {business.phoneNumber}</Typography>}
                    </div>
                </CardContent>
                {business.hasScheduleApp ?
                    <div>
                        <CardActions className={classes.messageButtonContainer} >
                            <Link  to={{ pathname: business.linkToSchedule }} target="_blank" rel="noopener noreferrer" >
                                <Button variant="outlined" size="small" color="primary" >
                                    Schedule appointment
                                </Button>
                            </Link>
                        </CardActions>
                    </div>
                    :
                    null
                }
            </Card>
        </div >
    )
}
