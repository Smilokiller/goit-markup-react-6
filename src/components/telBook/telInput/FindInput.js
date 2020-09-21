import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { CSSTransition } from "react-transition-group";
import styles from "./contactListFind.module.css";
import store from "../../../redux/store";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "400px",
      display: "flex",
    },
  },
}));
export function FindInput(prop) {
  const classes = useStyles();
  return (
    <>
      <CSSTransition
        classNames={styles}
        timeout={500}
        unmountOnExit
        in={store.getState().contacts.items.length > 1}
      >
        <TextField
          className={classes.root}
          id="outlined-basic"
          label="Find contacts by name"
          variant="outlined"
          name="filter"
          onChange={prop.onChange}
        />
      </CSSTransition>
    </>
  );
}
