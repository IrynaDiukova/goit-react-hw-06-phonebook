import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contact: [] },
  reducers: {
    addContacts(state, action) {
      state.contact.push(action.payload);
    },
    deleteContacts(state, action) {
      state.contact = state.contact.filter(el => el.id !== action.payload);
    },
  },
});

export const { addContacts, deleteContacts } = contactsSlice.actions;

// Selectors
export const getContacts = (state) => state.contacts.contact;