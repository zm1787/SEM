import User from '../models/user.js';
import Notification from '../models/notification.js';


var onlineUsers = [];

export const onConnect = async (socket) => {

    //****************************************************************************************************
    // Initial connection. Add client to list of online users.
    //****************************************************************************************************
    socket.on('connection', (data) => {
        const { user_id } = data;

        // Add user to list of connected users
        onlineUsers[user_id] = socket.id;
        console.log("\nNew user connected to notifications:", user_id);
    });

    //****************************************************************************************************
    // Disconnect socket. Remove client from list of online users.
    //****************************************************************************************************
    socket.on('disconnect', () => {
        const user_id = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);

        // Remove user from list of connected users
        delete onlineUsers[user_id];
    });

    //****************************************************************************************************
    // New friend request 
    //****************************************************************************************************
    socket.on('send-friend-request', async (data) => {
        const { sender_id, receiver_id, type, senderName } = data;
        console.log("\nSending friend request: ", data);

        // Create notification
        const newNotification = new Notification({
            type,
            senderName,
            sender_id,
            receiver_id,
        });

        // Save notification in receiving user if this isn't an existing request
        const receiverUser = await User.findById(receiver_id);
        var result = receiverUser.notifications.find(obj => {
            return obj.type === type && obj.receiver_id == receiver_id && obj.sender_id == sender_id
        })
        if(result !== undefined) {
            console.log("\nNotification already exists in receiver's notifications. Not adding notification.")
            // TODO: send popup message that this friend request exists already
            return;
        }
        
        // TODO: send popup message that this friend request was sent

        console.log("\nSaving new notification.\n")
        receiverUser.notifications.push(newNotification);
        receiverUser.save();

        socket.to(onlineUsers[receiver_id]).emit('new-friend-request-added', data)
    });

    socket.on('accept-friend-request', async (data) => {
        const { sender_id, receiver_id, type, senderName } = data;

    });

    socket.on('join-chat', ({ name, chat_id }, callback) => {
        console.log(name, chat_id);
    });

    socket.on('send-message', (data) => {
        //const message
        console.log(data);
    });

    socket.on('disconnect-chat', (data) => {
        const { user_id } = data;
        console.log('\nUser has left: ');
        console.log('user id:', user_id);
        console.log('user socket:', onlineUsers[user_id]);

        // Remove from list of online users
        onlineUsers[user_id] = undefined;
    });
}