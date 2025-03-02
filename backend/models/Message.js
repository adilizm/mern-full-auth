import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    content: {
        type: String,
        required: false,
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
    has_file: {
        type: Boolean,
        default: false
    },
    files_info: [{ type: String }],
    createdAt: { type: Date, default: () => new Date() },
    updatedAt: { type: Date, default: () => new Date() },
}, { timestamps: true })
const Message = new mongoose.model('message', MessageSchema)

export { Message };