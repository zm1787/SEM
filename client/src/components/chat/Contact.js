import React, {useEffect} from 'react'
import profilePic from '../../images/Profile Pic1.png';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    secondaryText: {
        color: theme.palette.text.secondary,
    },
}))


// Eventually gonna be pulled from DB
const TEST_LIST_OF_CHATS = {

    "Alex": [
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee.", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee.", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee.", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee.", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "Alex" },
        { message: "Y", dateSent: "", sender: "Alex" },
    ],

    "Zacharie Melanson": [
        { message: "Hey Zach, I would like to schedule an appointment but I don't know how this works. Can you help me?", dateSent: "", sender: "You" },
        { message: "Sure thing! Just look at my schedule in the 'calender' tab and select an available slot!", dateSent: "", sender: "Zacharie Melanson" },
        { message: "Sounds good, Thanks! See you soon!", dateSent: "", sender: "You" },
        { message: "Yoyo how you doin???", dateSent: "", sender: "You" },
        { message: "Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee. Long ass messageee.", dateSent: "", sender: "Zacharie Melanson" },
        { message: "Y", dateSent: "", sender: "Zacharie Melanson" },
    ],
}

const Contact = ({ contact, setSelectedContactInfo, selectedContactInfo }) => {
    const classes = useStyles();

    // useEffect(() => {
    //    contact.m
    // }, [contact])

    const onChatSelected = () => { 
        setSelectedContactInfo({
            ...selectedContactInfo,
            activeChat: TEST_LIST_OF_CHATS[contact.name],
            name: contact.name,
            lastMessage: contact.lastMessage,
        })
    }

    return (
        <div className="contact-root" onClick={onChatSelected}>
            <div className="img-container">
                <img className="img" src={profilePic} alt="" />
            </div>
            <div className="contact-info">
                <Typography>{contact.name}</Typography>
                <Typography /*className="last-message-preview"*/ className={`${classes.secondaryText} last-message-preview`} >{contact.lastMessage}</Typography>
            </div>
        </div>
    )
}

export default Contact
