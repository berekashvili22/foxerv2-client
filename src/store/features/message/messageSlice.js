import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    type: ''
};

const messageSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMessage: (state, { payload }) => {
            state.message = payload.message;
            state.type = payload.type;
        }
    }
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
