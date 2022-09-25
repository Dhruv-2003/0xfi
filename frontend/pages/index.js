import Image from "next/image";
import styles from "../styles/Home.module.css";
import image from "../src/assets/4.jpg";
import bg from "../src/assets/bg-grid.png";
import bg2 from "../src/assets/grid-png.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div  className={styles.about}>
            {/* <h1 className={styles.heading_}>OxFi</h1> */}
            <h2>
              Receive payments in MATIC in three ways Pay Now, Pay Later and Pay in stream all this by generating a payment link. You also get an option to invest the money received
            </h2>
          </div>
          <div className={styles.image}>
            <Image className={styles.image} src={image} />
          </div>
        </div>
      </main>
    </div>
  );
}
