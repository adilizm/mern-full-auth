const Conversation = require('../models/Conversation')
const User = require("../models/User")
const Message = require("../models/Message")
const Joi = require('joi');

const getConversation = async (req, res) => {
    try {
        const reqSchema = Joi.object({
            username: Joi.string().min(3).max(15).required(),
        });

        const { error } = reqSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }
        const { username } = req.body

        const contact_user = await User.findOne({ username })

        if (error) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [contact_user._id, req.user_id], $size: 2 }
        }).populate({
            path: "messages",
            options: { sort: { createdAt: -1 }, limit: 30 },
        });

        if (conversation) {
            conversation.messages.reverse(); // Flip the array
        }

        return res.status(201).json({ success: true, conversation, profile: contact_user.profile, username: contact_user.username, id: contact_user._id });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const conversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.user_id,
        })
            .sort({ updatetAt: -1 })
            .limit(10)
            .populate({
                path: "participants",
                select: "username profile",
            })
            .populate({
                path: "messages",
                options: { sort: { createdAt: -1 }, limit: 20 }, // Only get the latest message
            });

        return res.status(201).json({ success: true, conversations });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const conversationDetailes = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });

        const conversation = await Conversation.findOne({
            participants: { $all: [req.user_id, user._id], $size: 2 }
        }).populate({
            path: "messages",
            options: { sort: { createdAt: 1 }, limit: 50 },
        });

        return res.status(201).json({ success: true, conversation });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const saveMessage = async ({ from, to, content, conversation_id }) => {
    try {

        const user_from = await User.findOne({ _id: from }).select('profile username _id');
        const user_to = await User.findOne({ _id: to }).select('profile username _id');

        let conversation = await Conversation.findOne({ _id: conversation_id });

        if (!conversation) {
            conversation = await Conversation.create({ participants: [user_from._id, user_to._id] });
        }

        const message = await Message.create({
            conversationId: conversation._id,
            from: user_from._id,
            content,
        });

        conversation.lastMessage = message._id;
        conv = await conversation.save();
        conv.participants = [user_from, user_to]
        return [conv, message];

    } catch (error) {
        console.error("Error sending message:", error);
    }
}
const MarkMessageDelivred = async (message_id) => {
    try {
        const message = await Message.findOne({ _id: message_id });
        message.is_delivred = true;
        message.delivred_at = new Date();
        const res = await message.save();
        return res;

    } catch (error) {
        console.error("Error marking message as delivred :", error);
    }
}

const MarkMessageSeen = async (message_id) => {
    try {
        const message = await Message.findOne({ _id: message_id });
        message.is_seen = true;
        message.seen_at = new Date();
        const res = await message.save();
        return res;

    } catch (error) {
        console.error("Error marking message as delivred :", error);
    }
}

module.exports = { getConversation, saveMessage, conversations, conversationDetailes, MarkMessageDelivred,MarkMessageSeen }