import React from "react";
import ContactList from "./telInput/ContactList";
import { FindInput } from "./telInput/FindInput";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import styles from "./telBook.module.css";
import ContactForm from "./telInput/contactForm/ContactForm";
import { connect } from "react-redux";
import { telBookReducers } from "../../redux/telBookReducers";

function TelBook({ contacts }) {
  const dispatch = useDispatch();
  const {
    actions: { filterContacts },
  } = telBookReducers;

  return (
    <div className={styles.body}>
      <CSSTransition timeout={500} classNames={styles} appear unmountOnExit in>
        <div>
          <h2 className={styles.title}>Phonebook</h2>
        </div>
      </CSSTransition>
      <ContactForm />
      <h2 className={styles.title}>Contacts</h2>
      <FindInput
        onChange={(event) => dispatch(filterContacts(event.target.value))}
        contacts={contacts}
      />
      <ContactList />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.filter
      ? state.contacts.items.filter((el) =>
          el.name.toLowerCase().includes(state.contacts.filter.toLowerCase())
        )
      : state.contacts.items,
    filter: state.contacts.filter,
  };
};

export default connect(mapStateToProps)(TelBook);
