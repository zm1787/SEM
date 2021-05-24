import Chat from '../models/chat.js';

const users = [];

export const addUser = ({ id, name, chat_id }) => {

}
export const removeUser = () => {

}

export const getUser = () => {

}

export const getUsersInChat = () => {

}

export const createNewChat = async (req, res) => {
    try {
        // A participants is an array of objects of shape {id, name}
        const { participants } = req.body;

        // Validation
        if (!participants) {
            return res.status(400).json({ msg: "Could not create new chat. A list of participants was not received." });
        }

        participants.forEach((participant) => {
            if(!participant.name || !participant.id){
                return res.status(400).json({ msg: "Could not create new chat. A participant's information is missing." });
            }
        })

        const existingChat = await Chat.findOne({ participants: participants });
        if (existingChat) {
            return res.status(400).json({ msg: "A chat with this group of users already exists!" });
        }

        const newChat = new Chat({
            participants
        })

        res.json(newChat);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
}

export const fetchListOfChats = async (req, res) => {
    try {
        // Find all chats of the user
        const chats = await User.findById(req.user).select('chats');

        // Remove self from list of participants of all chats
        chats.forEach((chat) => {
            chat.participants.filter((participant) => {
                participant.id !== req.user
            });
        });

        // Return status 200 (Ok), and .json array of found chats in database
        res.status(200).json(chats);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

