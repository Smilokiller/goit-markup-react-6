import React from "react";
import Button from "@material-ui/core/Button";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "./contactList.module.css";
import { connect } from "react-redux";
import { telBookReducers } from "../../../redux/telBookReducers";
import { useDispatch } from "react-redux";

function ContactList({ contacts }) {
  const dispatch = useDispatch();
  const {
    actions: { deleteContacts },
  } = telBookReducers;
  return (
    <>
      <TransitionGroup component="ul">
        {contacts.map((el) => (
          <CSSTransition classNames={styles} key={el.id} timeout={250}>
            <li key={el.id} className={styles.listItems}>
              <p className={styles.text}>{el.name}</p>
              <p className={styles.text}>{el.number}</p>

              <Button
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => dispatch(deleteContacts(el.id))}
              >
                DELETE
              </Button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
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

export default connect(mapStateToProps)(ContactList);
