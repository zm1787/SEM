import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';


import Contact from './Contact';
import DisplayChat from './DisplayChat';

import { makeStyles, Typography } from '@material-ui/core';

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


export default function Chat({ location }) {
    const classes = useStyles();
    const dispatch = useDispatch();


    const ENDPOINT = 'localhost:5000';

    // State
    const [state, setState] = useState({
        listOfContacts: [],

        activeChatName: "",
        activeChatContent: TEST_LIST_OF_CHATS["Alex"],
    });

    // Effects
    useEffect(() => {
        const name = 'Bob';
        const chat_id = '1234';
        socket = io(ENDPOINT);

        socket.emit('join-chat', { name, chat_id }, (/* {error} */) => {
            // Do something with error
        });

        return () => {
            socket.emit('disconnect-chat');
            socket.off();
        };
    }, [ENDPOINT])

    // Functions
    const onCreateChat = () => {
        const newChat = {
            participants: [
                {
                    id: "6081b02572ce73346402b551",
                    name: "Zacharie Melanson",
                },
                {
                    id: "60a3d4bbcfab2b348c27a307",
                    name: "Chris Doiron",
                },
            ],
        };

        //dispatch(createNewChat(newChat));
    }

    return (
        <div className="chat-parent-grid">
            <div className="contact-list-child-grid">
                <div className="contact-list-header">
                    <Typography variant="h4">Contacts</Typography>
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
                            <button onClick={onCreateChat}>Create a Chat!</button>
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
                        <DisplayChat chat={state.activeChatContent} />
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
