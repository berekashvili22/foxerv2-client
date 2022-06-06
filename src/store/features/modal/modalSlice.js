import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authModalIsOpen: false
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        toggleModal: (state, { payload }) => {
            console.log('🚀 ~ file: modalSlice.js ~ line 12 ~ payload', payload);
            state[payload.name] = payload.value || !state[payload.name];
        }
    }
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;
