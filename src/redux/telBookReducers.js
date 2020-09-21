import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: {
    items: [],
    filter: "",
  },
};

export const telBookReducers = createSlice({
  name: "@contacts",
  initialState: initialState,
  reducers: {
    addContacts: (state, { type, payload }) => ({
      contacts: {
        ...state.contacts,
        items: [...state.contacts.items, payload],
      },
    }),
    localContacts: (state, { type, payload }) => ({
      contacts: {
        ...state.contacts,
        items: [...state.contacts.items, ...payload.contacts],
      },
    }),
    deleteContacts: (state, { type, payload }) => ({
      contacts: {
        ...state.contacts,
        items: state.contacts.items.filter((el) => el.id !== payload),
      },
    }),
    filterContacts: (state, { type, payload }) => ({
      contacts: {
        ...state.contacts,
        filter: payload,
      },
    }),
  },
});
