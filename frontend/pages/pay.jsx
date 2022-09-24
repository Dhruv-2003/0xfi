import React from "react";
import Button from "../src/components/Button";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import banner from "../src/assets/banner.png";

export default function Pay(props) {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome to Payment Page!!!</h1>
      <div className={styles.pay}>
        <div className={styles.banner}>
          <Image className={styles.banner} src={banner} />
        </div>

        <div className={styles.pay_content}>
          <h4>
            <u>Request to:</u>
          </h4>
          <h2>
            Kushagra Sarathe
            {props.name}
          </h2>
          <h4>
            <u>Amount Requested:</u>
          </h4>
          <h3>
            10 MATIC
            {props.amount}
          </h3>
          <h4>
            <u>Note:</u>
          </h4>
          <h3>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
            eaque veritatis
            {props.note}
          </h3>
          <h4>
            <u>Link Expires On:</u>
          </h4>
          <h3>
            12/12/2025
            {props.expiry}
          </h3>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                title={"Pay Now"}
                //   click={function here}
              />
            </div>
            <div className={styles.button}>
              <Button
                title={"Pay Later"}
                //   click={function here}
              />
            </div>
            <div className={styles.button}>
              <Button
                title={"Pay in Stream"}
                //   click={function here}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
