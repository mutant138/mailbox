import { createSlice } from '@reduxjs/toolkit';

const initialEmails = JSON.parse(localStorage.getItem('emails')) || []; // Retrieve emails from local storage

const initialState = {
    emails: initialEmails,
    unreadCount: initialEmails.filter(email => !email.read).length,
};

const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setEmails(state, action) {
            state.emails = action.payload;
            state.unreadCount = action.payload.filter(email => !email.read).length;
            localStorage.setItem('emails', JSON.stringify(action.payload)); // Store emails in local storage
        },
        markAsRead(state, action) {
            const updatedEmails = state.emails.map(email =>
                email.id === action.payload ? { ...email, read: true } : email
            );
            state.emails = updatedEmails;
            state.unreadCount = updatedEmails.filter(email => !email.read).length;
            localStorage.setItem('emails', JSON.stringify(updatedEmails)); // Update local storage
        },
    },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
