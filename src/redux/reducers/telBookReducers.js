import {
  ADD_CONTACTS,
  DELETE_CONTACTS,
  FILTER_CONTACTS,
  LOCAL_CONTACTS,
} from "../types/telBookTypes";

const initialState = {
  contacts: {
    items: [],
    filter: "",
  },
};
const telBookReducers = (state = initialState, action) => {
  console.log("payload", action);
  switch (action.type) {
    case LOCAL_CONTACTS:
      return {
        contacts: {
          ...state.contacts,
          items: [...state.contacts.items, ...action.payload.contacts],
        },
      };

    case ADD_CONTACTS:
      return {
        contacts: {
          ...state.contacts,
          items: [...state.contacts.items, action.payload],
        },
      };
    case DELETE_CONTACTS:
      return {
        contacts: {
          ...state.contacts,
          items: state.contacts.items.filter((el) => el.id !== action.payload),
        },
      };
    case FILTER_CONTACTS:
      return {
        contacts: {
          ...state.contacts,
          filter: action.payload,
        },
      };

    default:
      return state;
  }
};

export default telBookReducers;
