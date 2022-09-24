import React, { useRef, useState } from "react";
import styles from "../css/Component.module.css";
import Button from "./Button";
import copy_img from "../assets/copy.png";
import Image from "next/image";

export default function Generate() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [expiry, setExpiry] = useState("");

  const [generatedLink, setGeneratedLink] = useState("");

  const inputHandler = (event) => {
    setGeneratedLink(event.target.value);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(generatedLink);
    // alert("Text copied");
  };

  return (
    <div className={styles.generate}>
      <h2>Create a payment link</h2>
      <hr className={styles.hr} />
      <div className={styles.section}>
        <h3>Request Receiver Name</h3>
        <input
          className={styles.input}
          type="text"
          placeholder="Name of person to receive funds from"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.section}>
        <h3>
          Amount <small> &#40; in MATIC &#41; </small>
        </h3>
        <input
          className={styles.input}
          type="number"
          placeholder="0.00"
          required
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <div className={styles.section}>
        <h3>Note</h3>
        <input
          className={styles.input}
          type="text"
          placeholder="A short description"
          required
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
      </div>
      <div className={styles.section}>
        <h3>Link Expiry</h3>
        <input
          className={styles.input}
          type="date"
          required
          onChange={(e) => {
            setExpiry(e.target.value);
          }}
        />
      </div>
      {/* <div className={styles.section}>
        <h4>
          <u className={styles.generated_link}>https://generated.link.here</u>
          { generated_link_here }

          <input
            className={`${styles.input} ${styles.generated_link}`}
            type="text"
            value={generatedLink}
            onChange={inputHandler}
          />
          <button
            className={styles.copy}
            onClick={copy}
            disabled={!generatedLink}
          >
            <Image src={copy_img} />
          </button>
        </h4>
      </div> */}
      <div className={styles.button}>
        <Button title={"Generate Link"} />
      </div>
    </div>
  );
}
