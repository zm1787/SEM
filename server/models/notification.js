import mongoose from 'mongoose';

export const notificationSchema = mongoose.Schema({
    type: {
        type : String,
        required: true
    },

    senderName: {
        type: String,
        required: true
    },

    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    createdAt: {
        type: Date,
        default: new Date()
    }
});


const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;


