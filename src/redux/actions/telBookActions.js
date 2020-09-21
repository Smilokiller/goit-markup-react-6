import {
  ADD_CONTACTS,
  DELETE_CONTACTS,
  FILTER_CONTACTS,
  LOCAL_CONTACTS,
} from "../types/telBookTypes";

const addContacts = (contact) => {
  return {
    type: ADD_CONTACTS,
    payload: contact,
  };
};

const localContacts = (contact) => {
  return {
    type: LOCAL_CONTACTS,
    payload: contact,
  };
};

const deleteContacts = (id) => {
  console.log("id", id);
  return {
    type: DELETE_CONTACTS,
    payload: id,
  };
};

const filterContacts = (value) => {
  return {
    type: FILTER_CONTACTS,
    payload: value,
  };
};

export { addContacts, deleteContacts, filterContacts, localContacts };
