import React, { useState } from "react";
import Button from "../../src/components/Button";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import banner from "../../src/assets/eth.jpg";

export default function Pay(props) {

  const [name, setName] = useState('')
  const [amount, setAmount] = useState()

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome!!!</h1>
      <div className={styles.single_pay}>
        <div className={styles.banner}>
          <Image className={styles.banner} src={banner} />
        </div>

        <div className={styles.class1}>
          <label>
            <u>Send to:</u>

          </label>
          <input onChange={e => {
            setName(e.target.value)
          }} type={'text'} placeholder='Enter Name' className={styles.input} />
          <h4>
            <u>Enter Amount:</u>
          </h4>
          <input onChange={e => {
            setAmount(e.target.value)
          }} type={'number'} placeholder='Enter Amount' className={styles.input} />
            <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                title={"Pay"}
                //   click={function here}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
