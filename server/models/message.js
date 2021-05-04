import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    message: {
        type : String,
        required: true
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const Message = mongoose.model('Message', messageSchema);

export default Message;


