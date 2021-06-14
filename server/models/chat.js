import mongoose from 'mongoose';
import { messageSchema as Message } from './message.js';

const chatSchema = mongoose.Schema({
    // List of massages in the chat
    messages: [Message],

    receiverHasRead: {
        type: Boolean,
        default: true,
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const Chat = mongoose.model('Chat', chatSchema);

export default Chat;


