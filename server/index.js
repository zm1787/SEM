import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import * as socketio from 'socket.io';
import { createServer } from 'http';

import userRoutes from './routes/users.js';
import businessRoutes from './routes/business.js';
import chatsRoutes from './routes/chats.js';

import Chat from './models/chat.js';


const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());

app.use('/users', userRoutes); // Every route inside of userRoutes will start with '/users'
app.use('/business', businessRoutes); // Every route inside of businessRoutes will start with '/business'
app.use('/chats', chatsRoutes); // Every route inside of chatsRoutes will start with '/chats'

const server = createServer(app);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => server.listen(process.env.PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); // Makes sure we dont get any error messages in the console


// Chat io connections
const io = new socketio.Server(server, {cors: { origin: "*" }});
io.on('connection', (socket) => {
    console.log('We have a new connection!!! Connected to: ', socket.id);

    socket.on('join-chat', ({ name, chat_id }, callback) => {
        console.log(name, chat_id);
    });

    socket.on('send-message', (data) => {
        //const message
        console.log(data);
    });

    socket.on('disconnect-chat', () => {
        console.log('User has left!!!');
    });
});