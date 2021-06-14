import mongoose from 'mongoose';

export const messageSchema = mongoose.Schema({
    message: {
        type : String,
        required: true
    },

    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    senderName: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const Message = mongoose.model('Message', messageSchema);

export default Message;


