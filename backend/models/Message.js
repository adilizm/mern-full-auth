const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    is_delivred: {
        type: Boolean,
        default: false,
    },
    delivred_at: {
        type: Date,
        default: null,
    },
    is_seen: {
        type: Boolean,
        default: false,
    },
    seen_at: {
        type: Date,
        default: null,
    },
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
}, { timestamps: true })
const Message = new mongoose.model('message', MessageSchema)

module.exports = Message;