import User from '../models/user.js';
import Notification from '../models/notification.js';
import Chat from '../models/chat.js';
import Message from '../models/message.js';
import mongoose from 'mongoose';

export const saveNotification = async (data) => {
    const { sender_id, receiver_id, type, senderName, businessName } = data;

    // Request validation
    if(!sender_id) {
        console.log("No sender_id was found in passed data object." )
        return;
    }
    if(!receiver_id) {
        console.log("No receiver_id was found in passed data object." )
        return;
    }
    if(!type) {
        console.log("No type was found in passed data object." )
        return;
    }
    if(!senderName) {
        console.log("No senderName was found in passed data object." )
        return;
    }

    // Create notification
    const newNotification = new Notification({
        type,
        senderName,
        sender_id,
        businessName,
        receiver_id,
    });

    // Save notification in receiving user if this isn't an existing request
    const receiverUser = await User.findById(receiver_id);

    console.log("receiverUser:", receiverUser)
    console.log("data:", data)

    var result = receiverUser.notifications.find(obj => {
        return obj.type === type && obj.receiver_id == receiver_id && obj.sender_id == sender_id
    })
    if (result !== undefined) {
        console.log("\nNotification already exists in receiver's notifications. Not adding notification.")
        // TODO: send popup message that this friend request exists already
        return -1;
    }

    // TODO: send popup message that this friend request was sent

    console.log("\nSaving new notification.\n")
    receiverUser.notifications.push(newNotification);
    receiverUser.save();

    return newNotification;
}

// This 
export const addNewFriendPair = async (request) => {
    // Return values
    let friends = {}

    // Add friend to sender's (client's) list of friends
    var conditions = {
        _id: request.sender_id,
        //'friends.friend_id': { $ne: request.receiver_id },
        'contacts.businesses.contact_id': { $ne: request.receiver_id },
    };
    var provider = {
        //friend_id: request.receiver_id,
        contact_id: request.receiver_id,
        businessName: request.businessName,
        name: request.receiverName,
    }
    console.log(provider)
    var update = {
        //$addToSet: { friends: provider },
        $addToSet: { 'contacts.businesses': provider },
    };

    const user1 = await User.findOneAndUpdate(conditions, update, { new: true });
    
    // Add friend to receiver's (busniness provider's) list of friends
    conditions = {
        _id: request.receiver_id,
        //'friends.friend_id': { $ne: request.sender_id },
        'contacts.clients.contact_id': { $ne: request.sender_id },
    };
    var client = {
        //friend_id: request.sender_id,
        contact_id: request.sender_id,
        name: request.senderName,
    }
    
    update = {
        //$addToSet: { friends: client },
        $addToSet: { 'contacts.clients': client },
        $pull: { notifications: { _id: new mongoose.Types.ObjectId(request._id) } } // Remove notification from list.
    };
    
    const user2 = await User.findOneAndUpdate(conditions, update, { new: true } );
    
    friends.sendersNewFriend = provider
    friends.receiversNewFriend = client
    
    const chat = await createChat(request.sender_id, request.receiver_id);

    return friends;
}

export const createChat = async (client_id, provider_id) => {
    const newChat = new Chat();
    newChat.save();

    // Save new chat id in both users
    await User.findOneAndUpdate(
        { "_id": client_id, "contacts.businesses.contact_id": provider_id },
        { 
            "$set": {
                "contacts.businesses.$.chat_id": newChat._id
            }
        },
        {
            new: true
        },
        function(err,doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Updated sender friends:")
                console.log(doc.friends)
            }
        }
    );

    await User.findOneAndUpdate(
        { "_id": provider_id, "contacts.clients.contact_id": client_id },
        { 
            "$set": {
                "contacts.clients.$.chat_id": newChat._id
            }
        },
        {
            new: true
        },
        function(err,doc) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Updated receiver friends:")
                console.log(doc.friends)
            }
        }
    );


    return newChat
}

export const saveMessage = async (data) => {
    const { chatId, message, senderName, sender_id } = data;

    const newMessage = new Message({
        sender_id,
        senderName,
        message,
    });

    const chat = await Chat.findOneAndUpdate(
        { _id: chatId },
        { $push: { messages: newMessage } },
        { new: true },
    );
    
    return newMessage;
}