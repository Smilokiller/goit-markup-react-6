import React, { useEffect, useRef } from "react";
import ContactList from "./telInput/ContactList";
import { FindInput } from "./telInput/FindInput";
import { CSSTransition } from "react-transition-group";
import styles from "./telBook.module.css";
import ContactForm from "./telInput/contactForm/ContactForm";
import { connect } from "react-redux";
import {
  filterContacts,
  localContacts,
} from "../../redux/actions/telBookActions";

function TelBook({ filterContacts, localContacts, contacts }) {
  const prevCount = usePrevious(contacts);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("contacts");
    const contacts = JSON.parse(dataFromStorage);
    if (contacts) {
      localContacts({
        contacts,
      });
    }
  }, []);

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  useEffect(() => {
    if (contacts !== prevCount) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  });

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
        onChange={(event) => filterContacts(event.target.value)}
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
const mapDispatchToProps = (dispatch) => ({
  localContacts: (contact) => dispatch(localContacts(contact)),
  filterContacts: (value) => dispatch(filterContacts(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TelBook);
