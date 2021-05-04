import mongoose from 'mongoose';
import Message from './message.js';

const chatSchema = mongoose.Schema({
    // list of massages in the chat
    //messages: [Message],

    // List of participants as user ids
    participants: [mongoose.Schema.Types.ObjectId],

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const Chat = mongoose.model('Chat', chatSchema);

export default Chat;


