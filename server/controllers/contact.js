import User from '../models/user.js';

export const sendContactRequest = async (req, res) => {
    try {
        // Get id of user to send request
        const {
            recipient_id
        } = req.body;

        // Create new request in SENDER's list
        const sender = {
            contact_id: recipient_id,
            status: "pending",
        }

        // Append request in requestor's "contactRequestsSent"
        const senderUser = await User.findOneAndUpdate(
            { _id: req.user },
            { $addToSet: { contactRequestsSent: sender } },
            { new: true },
        );

        // Create new request RECEIVER's list
        const recipient = {
            contact_id: req.user,
            status: "pending",
        }

        // Append request in requestor's "contactRequestsSent"
        const recipientUser = await User.findOneAndUpdate(
            { _id: recipient_id },
            { $addToSet: {contactRequestsReceived: {contact_id: req.user, status: String("pending")} } },
            { new: true },
        );

        res.status(200).json({ msg: "sendContactRequest success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}