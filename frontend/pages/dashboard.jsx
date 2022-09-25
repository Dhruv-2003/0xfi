import Button from "../src/components/Button";
import Generate from "../src/components/Generate";
import ReceivedPaymets from "../src/components/ReceivedPaymets";
import styles from "../styles/Home.module.css";

export default function dashboard(props) {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome to Dashboard</h1>
      <div className={styles.dashboard}>
        <div className={styles.dashboard_section}>
          <div className={styles.balance}>
            <h1>Kushagra Sarathe</h1>
            <h2>Total Balance: 5 MATIC{props.balance} </h2>
            <Button title="Withdraw" />
          </div>
        </div>
        <div className={styles.dashboard_section}>
          <ReceivedPaymets />
        </div>
        <div className={styles.dashboard_section}>
          <Generate />
        </div>
      </div>
    </div>
  );
}
