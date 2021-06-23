import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Contact from './Contact';
import ActiveChat from './ActiveChat';

import { makeStyles, Typography, Input, IconButton  } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

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
    const [activeChat, setActiveChat] = useState({
        activeChatName: "",
        friendName: "",
        friend_id: "",
        createNewChat: false,
        activeChatContent: TEST_LIST_OF_CHATS["Alex"],
    });


    // send message setup
    const [message, setMessage] = useState("")
    const auth = useSelector((store) => store.auth)
    const socket = useSelector((store) => store.socket)
    const storeActiveChat = useSelector((store) => store.activeChat)


    const sendMessage = (e) => {
        e.preventDefault();
        const user = auth.user;

        const data = {
            message: message,
            createNewChat: activeChat.createNewChat,
            senderName: `${user.firstName} ${user.lastName}`,
            sender_id: user._id,
            receiver_id: activeChat.friend_id,
        };

        socket.emit('send-message', data);
        setMessage("");
    }

    const handleKeyDown = event => {
        if (event.which === 13) { // Enter key was hit to send message
          sendMessage(event);
        }
      };

    return (
        <div className="chat-parent-grid">
            <div className="contact-list-child-grid">
                <div className="contact-list-header">
                    <Typography variant="h4">Contacts</Typography>
                </div>
                <div className="contact-list">
                    {auth.user ?
                        auth.user.friends.map((friend, index) => {
                            return (
                                <Contact key={index} friend={friend} activeChat={activeChat} setActiveChat={setActiveChat} auth={auth} />
                            )
                        })
                        :
                        <div>
                            <h5>Oops! Looks like you do not yet have any contacts.</h5>
                            <Link to="/find-specialist" className={classes.logoImg}>
                                <p>Find a specialist</p>
                            </Link>
                        </div>
                    }
                </div>
            </div>
            <div className="current-chat-grid">
                <div className="current-chat-header">
                    <Typography variant="h5">Chatting with {activeChat.friendName}</Typography>
                </div>
                <div className="current-chat-display">
                    {!arrayIsEmpty(storeActiveChat.messages) ?
                        <ActiveChat messages={storeActiveChat.messages} />
                        :
                        <h4>This chat is empty. Send a Message to start chatting!</h4>
                    }
                </div>
                <form className="current-chat-form" onSubmit={e => sendMessage(e)}>
                    <Input
                        className="message-input"
                        type="text"
                        placeholder="Type your message here..."
                        multiline={true}
                        disableUnderline={true}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton className="send-btn" type="submit" ><SendIcon style={{ fontSize: 25 }}/></IconButton>
                </form>
            </div>
        </div>
    )
}
