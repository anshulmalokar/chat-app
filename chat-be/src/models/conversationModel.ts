import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    reciever: {
        type: String,
        required: true
    }
});

const conversationSchema = new mongoose.Schema({
    users: [{
        type: String,
        required: true
    }],
    messages: [msgSchema]
})

export const conversation_model = mongoose.model('Conversation',conversationSchema);