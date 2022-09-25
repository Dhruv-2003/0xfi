import { useState } from "react";
import Button from "../src/components/Button";
import Generate from "../src/components/Generate";
import ReceivedPaymets from "../src/components/ReceivedPaymets";
import styles from "../styles/Home.module.css";

export default function dashboard(props) {
  const [name, setName] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome to Dashboard</h1>
      <div className={styles.dashboard}>
        <div className={styles.dashboard_section}>
          <h2>User Stats</h2>
          <div className={styles.balance}>
            <h4>Enter Name: </h4>
            <input onChange={e => {
              setName(e.target.value)
            }} type="text" className={styles.input} placeholder="Enter Name" />
            <h4>Enter Wallet Address: </h4>
            <input onChange={e => {
              setWalletAddress(e.target.value)
            }} type="text" className={styles.input} placeholder="Wallet Address" />

            <Button title="Register" />
            {/* <h1>Kushagra Sarathe</h1>
            <h2>Total Balance: 5 MATIC{props.balance} </h2>
            <Button title="Withdraw" /> */}
          </div>
        </div>
        <div className={styles.dashboard_section}>
          <h2>Received Payments</h2>
          <div className={styles.received}>
            {/* mapping here */}
            <ReceivedPaymets />
          </div>
        </div>
        <div className={styles.dashboard_section}>
          <h2>Generate New Link</h2>
          <Generate />
        </div>
      </div>
    </div>
  );
}
