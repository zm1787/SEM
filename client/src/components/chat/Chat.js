import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

export default function Chat({ location }) {
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
        <div>
            <div>
                <input type="text" />
                <button>Send</button>
            </div>
            <div>
                
            </div>
        </div>
    )
}
