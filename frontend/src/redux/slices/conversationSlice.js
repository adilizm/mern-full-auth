import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getConversationDetailes = createAsyncThunk(
    'conversations/getConversationWithContact',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3000/api/conversation', data, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getConversations = createAsyncThunk(
    'conversations/getConversations',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:3000/api/conversation/conversations', { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const selectConversationThunk = (conversation) => (dispatch, getState) => {
    const receiver_username = conversation.participants.find((p) => p.username !== getState().users.user.username);
    dispatch(selectReceiver({ conversation, username: receiver_username.username }));
};

export const EmitMessage = (data) => (dispatch, getState) => {
    const socket = getState().sockets.socket;
    console.log('senddm data = ', {
        conversation_id: data.conversation_id,
        from: data.from,
        to: data.to,
        content: data.content,
    })
    socket.emit("new_message", {
        conversation_id: data.conversation_id,
        from: data.from,
        to: data.to,
        content: data.content,
    });
};

export const EmitMessageWithFiles = (data) => (dispatch, getState) => {
    const socket = getState().sockets.socket;
    const conversation_id = getState().conversations.current_conversation.id;
    const from = getState().users.user._id;
    const to = getState().conversations.receiver_ID;

    console.log('EmitMessageWithFiles data = ', {
        conversation_id,
        from,
        to,
        files: data.files,
        caption: data.caption,
    })

    socket.emit("messageWithFiles", {
        conversation_id,
        from,
        to,
        files: data.files,
        caption: data.caption,
    });

};

const initialState = {
    conversations: null,
    current_conversation: null,
    receiver_profile: null,
    receiver_username: null,
    receiver_ID: null
};

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        createNewConversation: (state, action) => {
            const temp_conversation = action.payload.conversation;
            temp_conversation.messages = [action.payload.msg];
            state.conversations.push(temp_conversation)
            if (!state.current_conversation) {
                state.current_conversation = temp_conversation;
            }
        },
        PushMessage: (state, action) => {
            state.conversations = state.conversations.map(conversation => {
                if (conversation._id == action.payload.conversation_id) {
                    conversation.updatedAt = action.payload.conversation.updatedAt
                    return { ...conversation, messages: [action.payload.msg, ...conversation.messages] };
                }
                return conversation;
            });

            if (state.current_conversation?._id == action.payload.conversation_id) {
                state.current_conversation.messages = [...state.current_conversation.messages, action.payload.msg]
            }
        },
        selectReceiver: (state, option) => {
            state.receiver_username = option.payload.username;
        },


        MessageDelivered: (state, action) => {
            console.log('act msg del payload = ', action.payload)
            state.conversations = state.conversations.map(conversation => {
                if (conversation._id == action.payload.conversationId) {
                    conversation.messages = conversation.messages.map(message => {
                        if (message._id == action.payload._id) {
                            return action.payload;
                        } else {

                            return message
                        }
                    })

                }
                return conversation;
            });

            if (state.current_conversation.id == action.payload.conversationId) {
                state.current_conversation.messages = state.current_conversation.messages.map(message => {
                    if (message._id == action.payload._id) {
                        return action.payload;
                    } else {
                        return message;
                    }

                })
            }
        },
        MessageSeen: (state, action) => {

            state.conversations = state.conversations.map(conversation => {
                if (conversation._id == action.payload.conversationId) {
                    conversation.messages = conversation.messages.map(message => {
                        if (message._id == action.payload._id) {
                            return action.payload;
                        } else {
                            return message
                        }
                    })
                }
                return conversation;
            });

            if (state.current_conversation.id == action.payload.conversationId) {
                state.current_conversation.messages = state.current_conversation.messages.map(message => {
                    if (message._id == action.payload._id) {
                        return action.payload;
                    } else {
                        return message;
                    }

                })
            }
        },

    }, extraReducers: (builder) => {
        builder
            .addCase(getConversations.fulfilled, (state, action) => {
                state.conversations = action.payload.conversations
            })
            .addCase(getConversationDetailes.fulfilled, (state, action) => {
                state.current_conversation = action.payload.conversation
                state.receiver_profile = action.payload.profile
                state.receiver_username = action.payload.username
                state.receiver_ID = action.payload.id
            })

    }
});

export const { PushMessage, selectReceiver, createNewConversation, MessageDelivered, MessageSeen } = conversationsSlice.actions;
export default conversationsSlice.reducer;
