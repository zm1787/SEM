import React, {useEffect} from 'react'
import profilePic from '../../images/Profile Pic1.png';
import { fetchChat } from '../../actions/activeChatActions';
import { useSelector, useDispatch } from 'react-redux';


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

const Contact = ({ friend, activeChat, setActiveChat, auth }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const onChatSelected = () => { 
        // FETCH chat content 
        dispatch(fetchChat(friend.contact_id));
        console.log(friend.name)
        setActiveChat({
            ...activeChat,
            friendName: friend.name,
            friend_id: friend.contact_id,
            createNewChat: friend.chat_id && friend.chat_id.lenght !== 0 ? false : true,
            lastMessage: friend.chat ? friend.chat.message[0] : "",
            activeChatContent: friend.chat ? friend.chat : "",
        })
    }

    return (
        <div className="contact-root" onClick={onChatSelected}>
            <div className="img-container">
                <img className="img" src={profilePic} alt="" />
            </div>
            <div className="contact-info">
                <Typography>{friend.name}</Typography>
                <Typography /*className="last-message-preview"*/ className={`${classes.secondaryText} last-message-preview`} >{friend.chat ? friend.chat : ""}</Typography>
            </div>
        </div>
    )
}

export default Contact
