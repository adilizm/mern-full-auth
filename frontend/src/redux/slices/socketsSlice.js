import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { io } from "socket.io-client";

export const connectSocket = createAsyncThunk(
  'sockets/connect',
  async (_, { rejectWithValue }) => {
    try {
      const socket = io('http://localhost:3000')
      return socket;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



const initialState = {
  socket: null,
  online_users: []
};

const socketsSlice = createSlice({
  name: 'sockets',
  initialState,
  reducers: {
    update_online_users: (state, action) => {
      state.online_users = action.payload
    },
    sendMessage : (state,action) => {
      state.socket.emit('dm',action.payload)
    }

  }, extraReducers: (builder) => {
    builder
      .addCase(connectSocket.fulfilled, (state, action) => {
        state.socket = action.payload;

      })
      .addCase(connectSocket.rejected, (state, action) => {
        console.error('state soket error= ', action.error.message)
      })
  }
});

export const { update_online_users } = socketsSlice.actions;
export default socketsSlice.reducer;
