import { configureStore } from '@reduxjs/toolkit';

import userReducer from './features/user/userSlice';
import messageReducer from './features/message/messageSlice';
import modalReducer from './features/modal/modalSlice';

export const store = configureStore({
    reducer: { user: userReducer, message: messageReducer, modal: modalReducer }
});
