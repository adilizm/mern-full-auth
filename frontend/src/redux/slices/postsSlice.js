import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../api/axiosInstance';

export const getPosts = createAsyncThunk(
  'posts/getposts',
  async ({ }, { rejectWithValue }) => {
    try {
      const response = await API.get('/posts', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  })

export const getMyPosts = createAsyncThunk(
  'posts/getMyPosts',
  async ({ }, { rejectWithValue }) => {
    try {
      const response = await API.get('/posts/getmyposts', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  })

export const createNewPost = createAsyncThunk(
  'posts/new',
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.image) {
        formData.append("image", data.image);
      }

      const response = await API.post('/posts/new', formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async (data, { rejectWithValue }) => {
    try {
      console.log('data = ',data)
      const formData = new FormData();
      formData.append("new_title", data.title);
      formData.append("new_content", data.content);
      if (data.image) {
        formData.append("new_image", data.image);
      }
      const response = await API.put(`/posts/update/${data.slug}?_method=PUT`, formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
    
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
  post: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    getPost: (state, action) => {
      state.post = state.posts.find((post) => post.slug == action.payload)
    },
  }, extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        return { ...state, posts: action.payload.posts }
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        return { ...state, posts: action.payload.posts }
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
      })
     
  }
});

export const { getPost } = postsSlice.actions;
export default postsSlice.reducer;
