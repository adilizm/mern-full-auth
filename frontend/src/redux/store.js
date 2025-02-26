import { combineReducers, configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import postsReducer from './slices/postsSlice';
import socketsSlice from './slices/socketsSlice';
import conversationSlice from './slices/conversationSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({ 
  users: usersReducer,
  posts: postsReducer,
  sockets: socketsSlice,
  conversations: conversationSlice,
 });

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['sockets']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);


