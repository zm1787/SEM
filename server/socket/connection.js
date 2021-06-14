import User from '../models/user.js';
import Notification from '../models/notification.js';
import mongoose from 'mongoose';
import { saveNotification, addNewFriendPair, saveMessage, createChat } from './DBFunctions.js';
import * as socketio from 'socket.io';




var onlineUsers = [];

export const startSocketServer = (server) => {

    const io = new socketio.Server(server, { cors: { origin: "*" } });
    io.on("connection", (socket) => {

        //****************************************************************************************************
        // Initial connection. Add client to list of online users.
        //****************************************************************************************************
        socket.on('connection', (data) => {
            const { user_id } = data;

            // Add user to list of connected users
            onlineUsers[user_id] = socket.id;

            console.log("\nNew user connected to socket:", user_id);
            console.log("\nOnline users:")
            console.log(onlineUsers)

        });

        //****************************************************************************************************
        // Disconnect socket. Remove client from list of online users.
        //****************************************************************************************************
        socket.on('disconnect', () => {
            const user_id = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);

            console.log("\nUser left:", user_id)
            console.log("\nOnline users:")
            console.log(onlineUsers)

            // Remove user from list of connected users
            delete onlineUsers[user_id];
        });

        //****************************************************************************************************
        // New friend request 
        //****************************************************************************************************
        socket.on('send-friend-request', async (data) => {
            // Make sure these arn't already friends
            const { sender_id, receiver_id } = data
            const existingFriend = await User.findOne(
                { "_id": sender_id, "friends.friend_id": receiver_id },
            )
            if (existingFriend) {
                io.to(onlineUsers[data.sender_id]).emit('message-from-server', { message: "You're already friends with this user." })
                return;
            }

            // Create new notification if not already exists
            var newNotification = await saveNotification(data);
            if (!newNotification || newNotification === -1) {
                io.to(onlineUsers[data.sender_id]).emit('message-from-server', { message: "You've already sent a request to this user." })
                console.log("ERROR: New notification was not created.")
                return;
            }

            // console.log("newNotification:")
            // console.log(newNotification)

            io.to(onlineUsers[data.receiver_id]).emit('new-friend-request-added', newNotification)
        });

        //****************************************************************************************************
        // Accept friend request 
        //****************************************************************************************************
        socket.on('accept-friend-request', async (request) => {
            try {
                // Request accepted, adding contact to friend list on both sides and delete friend request notification
                const newFriends = await addNewFriendPair(request);

                io.to(onlineUsers[request.receiver_id]).emit('delete-notification', { request_id: request._id })
                io.to(onlineUsers[request.receiver_id]).emit('friend-added', newFriends.receiversNewFriend)
                io.to(onlineUsers[request.receiver_id]).emit('message-from-server', { message: `You are now friends with ${request.senderName}.` })

                if (onlineUsers[request.sender_id]) {
                    io.to(onlineUsers[request.sender_id]).emit('friend-added', newFriends.sendersNewFriend)
                }
            } catch (error) {
                console.log(error);
                io.to(onlineUsers[request.sender_id]).emit('message-from-server', { message: "Something went wrong. Check server console for error message." })
            }
        });


        //****************************************************************************************************
        // Send Message
        //****************************************************************************************************
        socket.on('send-message', async (data) => {
            try {
                const {
                    message,
                    createNewChat,
                    senderName,
                    sender_id,
                    receiver_id,
                } = data;

                console.log(data);

                // Find chat id from user.friends.chat_id
                const sender = await User.findById(sender_id).select("friends")
                const senderFriends = sender.friends;
                const friend = senderFriends.find(friend => {
                    return friend.friend_id == receiver_id;
                })
                var chatId = friend.chat_id;

                // Append message to chat <chatId>
                const newMessage = await saveMessage({ ...data, chatId });
                console.log(newMessage)

                // Send new message to sockets
                io.to(onlineUsers[receiver_id]).emit('new-message', { ...newMessage._doc, chat_id: chatId })
                io.to(onlineUsers[sender_id]).emit('new-message', { ...newMessage._doc, chat_id: chatId })
            } catch (error) {
                console.log(error);
            }

        });
    });
}