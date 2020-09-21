import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { TelInput } from "./TelInput";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import styles from "../../telBook.module.css";
import { useDispatch } from "react-redux";
import { telBookReducers } from "../../../../redux/telBookReducers";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "400px",
      display: "flex",
    },
  },
}));

function ContactForm({ contacts }) {
  const [allertShow, setAllertShow] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    actions: { addContacts },
  } = telBookReducers;

  function handleChange({ target }) {
    const { name, value } = target;

    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const lookingFor = contacts.find((el) => el.name === name);
    if (lookingFor) {
      setAllertShow(true);
      setTimeout(() => {
        setAllertShow(false);
      }, 3000);
      setName("");
      setNumber("");
    } else {
      dispatch(
        addContacts({
          id: uuidv4(),
          name: name,
          number: number,
        })
      );
      setName("");
      setNumber("");
    }
  }
  return (
    <>
      <CSSTransition timeout={5000} classNames={styles} in={allertShow}>
        <div className={styles.alert}>
          <p>This contact already in phonebook</p>
        </div>
      </CSSTransition>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.root}
      >
        <TelInput name={"name"} onChange={handleChange} value={name} />
        <TelInput name={"number"} onChange={handleChange} value={number} />
        <Button variant="contained" color="primary" type="input">
          Add contact
        </Button>
      </form>
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

export default connect(mapStateToProps)(ContactForm);
