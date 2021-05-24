import mongoose from 'mongoose';
import { messageSchema as Message } from './message.js';

const chatSchema = mongoose.Schema({
    // List of massages in the chat
    messages: [Message],

    // List of participants as user ids
    participants: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
            }
        }
    ],

    receiverHasRead: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const Chat = mongoose.model('Chat', chatSchema);

export default Chat;


