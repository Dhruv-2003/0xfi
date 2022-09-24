import React from "react";
import styles from "../css/Component.module.css";

export default function Button(props) {
  return (
      <button className={styles.btn} onClick={props.click} role="button">
        {props.title}
      </button>

  );
}
