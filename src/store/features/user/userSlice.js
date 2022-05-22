import { createSlice } from '@reduxjs/toolkit';

let user = null;

const ISSERVER = typeof window === 'undefined';

if (!ISSERVER) {
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        console.log('🚀 ~ file: userSlice.js ~ line 11 ~ e', e);
    }
}

const initialState = {
    user: user,
    isLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.isLoading = true;
            state.user = { ...payload };
            state.isLoading = false;
        },
        removeUser: (state) => {
            state.isLoading = true;
            state.user = null;
            state.isLoading = false;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
