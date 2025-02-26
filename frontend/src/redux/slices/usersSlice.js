import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// ✅ Async Thunks for Register & Login
export const registerUser = createAsyncThunk(
  'users/register',
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      if (userData.profile) {
        formData.append("profile", userData.profile);
      }

      const response = await axios.post('http://localhost:3000/api/auth/register', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async (userData, { rejectWithValue }) => {
    try {

      const response = await axios.post('http://localhost:3000/api/auth/login', userData, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'users/logout',
  async ({ }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const requestVerification = createAsyncThunk(
  'users/requestVerification',
  async ({}, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/auth/send-email-verification', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const VerifyEmail = createAsyncThunk(
  'users/VerifyEmail',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/verify-account',data, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const SearchUser = createAsyncThunk(
  'users/searchUser',
  async (userdata, { rejectWithValue }) => {
    try {

      const response = await axios.post('http://localhost:3000/api/auth/search', userdata, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  list_searched_users: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user =null;
        state.list_searched_users = []

      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || 'Logout failed';
      })
      .addCase(VerifyEmail.fulfilled, (state, action) => {
        state.user.isVerified = true;
      })
      .addCase(SearchUser.fulfilled, (state, action) => {
        state.list_searched_users = action.payload.users
      });
  }
});

export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
