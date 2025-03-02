import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    },
}, { timestamps: true });

ConversationSchema.virtual("messages", {
    ref: "message",
    localField: "_id",
    foreignField: "conversationId",
    justOne: false,
});


ConversationSchema.set("toObject", { virtuals: true });
ConversationSchema.set("toJSON", { virtuals: true });


const Conversation = new mongoose.model('conversation', ConversationSchema);
export { Conversation };

