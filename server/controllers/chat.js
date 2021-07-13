import User from '../models/user.js';
import Chat from '../models/chat.js';
import { createChat } from '../socket/DBFunctions.js';


export const fetchChat = async (req, res) => {
    try {
        const { friendId } = req.query;

        // Find requestor's friends
        const sender = await User.findById(req.user).select("friends")
        const senderFriends = sender.friends;
        
        // console.log("senderFriends")
        // console.log(senderFriends)
        const friend = senderFriends.find(friend => {
            return friend.friend_id == friendId;
        })
        // console.log("friend")
        // console.log(friend)
        const chatId = friend.chat_id;

        var chat = await Chat.findById(chatId)

        // console.log("Chat found:")
        // console.log(chat)

        if (chat) {
            res.status(200).json(chat);
        }
        else {
            res.status(500).json({ msg: `Chat id ${chatId} not found in friend ${friendId}.` });
        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}