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
        name: "Zacharie Malanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Zacharie Malanson",
        lastMessage: "That sounds great! Lets Longwording game",
    },
    {
        name: "Zacharie Malanson",
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
        name: "Zacharie Malanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Zacharie Malanson",
        lastMessage: "That sounds great! Lets Longwording game",
    },
    {
        name: "Zacharie Malanson",
        lastMessage: "That sounds great!",
    },
    {
        name: "Alex",
        lastMessage: "Sup!",
    },
]

const TEST_LOADED_CHAT = [
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
]


let socket;

const useStyles = makeStyles(theme => ({

}))

export default function Chat({ location }) {
    const classes = useStyles();

    const ENDPOINT = 'localhost:5000';

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
                            <Contact key={index} contact={contact} />
                        )
                    })}
                </div>
            </div>
            <div className="current-chat-grid">
                <div className="current-chat-header">
                    <p>Current Chat Header</p>
                </div>
                <div className="current-chat-display">
                    <DisplayChat chat={TEST_LOADED_CHAT}/> 
                </div>
                <form className="current-chat-form">
                    <input className="message-input" type="text" />
                    <button className="send-btn">Send</button>
                </form>
            </div>
        </div>
    )
}
