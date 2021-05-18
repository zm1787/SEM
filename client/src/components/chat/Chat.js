import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

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

    const ENDPOINT = 'localhost:5000';

    const [selectedContactInfo, setSelectedContactInfo] = useState({
        name: "",
        lastMessage: "",
        activeChat: TEST_LIST_OF_CHATS["Alex"],
    });



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


    return (
        <div className="chat-parent-grid">
            <div className="contact-list-child-grid">
                <div className="contact-list-header">
                    <Typography variant="h4">Contacts</Typography>
                </div>
                <div className="contact-list">
                    {TEST_CONTACTS.map((contact, index) => {
                        return (
                            <Contact key={index} contact={contact} setSelectedContactInfo={setSelectedContactInfo} selectedContactInfo={selectedContactInfo} />
                        )
                    })}
                </div>
            </div>
            <div className="current-chat-grid">
                <div className="current-chat-header">
                    <Typography variant="h5">Chatting with {selectedContactInfo.name}</Typography>
                </div>
                <div className="current-chat-display">
                    {!arrayIsEmpty(selectedContactInfo.activeChat) ?
                        <DisplayChat chat={selectedContactInfo.activeChat} />
                        :
                        <h4>This chat is empty!</h4>
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
