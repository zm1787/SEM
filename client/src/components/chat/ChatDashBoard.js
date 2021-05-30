import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';


import { sendContactRequest } from '../../actions/contactActions';
import { addNotification, removeNotification } from '../../actions/notificationActions';

import Contact from './Contact';
import ActiveChat from './ActiveChat';
import NotificationMenuButton from './NotificationMenuButton';

import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles, Typography, Badge, } from '@material-ui/core';

const TEST_CONTACTS = [
    {
        name: "Zacharie Michel Joseph Melanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Zacharie Melanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Zacharie Melanson",
        lastMessage: "That sounds great! Lets Longwording game",
    },
    {
        name: "Zacharie Melanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Alex",
        lastMessage: "Sup!",
    },
    {
        name: "Zacharie Michel Joseph Melanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Zacharie Melanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Zacharie Melanson",
        lastMessage: "That sounds great! Lets Longwording game",
    },
    {
        name: "Zacharie Melanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Alex",
        lastMessage: "Sup!",
    },
]

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

let TEST_LOADED_CHAT = []


let socket;

const useStyles = makeStyles(theme => ({

}))

const arrayIsEmpty = (array) => {
    if (!array) {
        return true;
    }
    if (array.length === 0) {
        return true;
    }
    return false;
}


export default function ChatDashBoard({ location }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const ENDPOINT = 'localhost:5000';

    // State
    const [state, setState] = useState({
        listOfContacts: [],

        activeChatName: "",
        activeChatContent: TEST_LIST_OF_CHATS["Alex"],
    });

    // Functions
    // const onCreateChat = () => {
    //     const newRequest = {
    //         recipient_id: "60ad382d447e294a7c207ece",
    //     };
    //     console.log("Sending request to:", newRequest.recipient_id)
    //     dispatch(sendContactRequest(newRequest));
    // }



    // ###############################################################################
    // TESTING NOTIFICATIONS REMOVE LATER
    const sockets = useSelector((store) => store.sockets);
    const auth = useSelector((store) => store.auth);

    const onSendFriendRequest = () => {
        const user = auth.user;
        const newRequest = {
            _id: "1111",
            type: "Friend Requestasdf",
            senderName: `${user.firstName} ${user.lastName}`,
            receiver_id: "60ad382d447e294a7c207ece",
            sender_id: user._id,
        };
        
        sockets.notifications.socket.emit('send-friend-request', newRequest);
    }
    const onRemoveNotificaion = () => {
        const newRequest = {
            _id: "1236",
            type: "Friend Request",
            recipient_id: "60ad382d447e294a7c207ece",
            sender_id: "60ad384e447e294a7c207ecf",
        };
        dispatch(removeNotification(newRequest._id));
    }
    // ###############################################################################



    return (
        <div className="chat-parent-grid">
            <div className="contact-list-child-grid">
                <div className="contact-list-header">
                    <Typography variant="h4">Contacts</Typography>
                    <NotificationMenuButton />
                </div>
                <div className="contact-list">
                    {!arrayIsEmpty(state.listOfContacts) ?
                        state.listOfContacts.map((contact, index) => {
                            return (
                                <Contact key={index} contact={contact} setSelectedContactInfo={setState} selectedContactInfo={state} />
                            )
                        })
                        :
                        <div>
                            <h5>You do not yet have any contacts.</h5>
                            <button onClick={onSendFriendRequest}>Add Friend!</button>
                            <button onClick={onRemoveNotificaion}>Remove Friend!</button>
                        </div>
                    }
                </div>
            </div>
            <div className="current-chat-grid">
                <div className="current-chat-header">
                    <Typography variant="h5">Chatting with {state.selectedChatName}</Typography>
                </div>
                <div className="current-chat-display">
                    {!arrayIsEmpty(state.activeChatContent) ?
                        <ActiveChat chat={state.activeChatContent} />
                        :
                        <h4>This chat is empty. Send a Message to start chatting!</h4>
                    }
                </div>
                <form className="current-chat-form">
                    <input className="message-input" type="text" />
                    <button className="send-btn">Send</button>
                </form>
            </div>
        </div>
    )
}
