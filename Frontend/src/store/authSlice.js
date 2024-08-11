import { createSlice } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');
const initialUser = JSON.parse(localStorage.getItem('user')); // Retrieve user data from local storage

const initialState = {
    token: initialToken,
    isAuthenticated: !!initialToken,
    user: initialUser || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user)); // Store user data
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user'); // Remove user data from local storage
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
