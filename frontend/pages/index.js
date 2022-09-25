import Image from "next/image";
import styles from "../styles/Home.module.css";
import styles2 from "../src/css/Component.module.css";
import image from "../src/assets/banner.png";
import bg from "../src/assets/bg-grid.png";
import bg2 from "../src/assets/grid-png.png";
import Button from "../src/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.about}>
            {/* <h1 className={styles.heading_}>OxFi</h1> */}
            <p className={styles.text}>
              Receive payments in MATIC using either of the three ways, Pay Now, Pay Later and Pay in stream all this by generating a payment link. You also get an option to invest the money received
            </p>
            <Link href={'/dashboard'}>
              <button className={styles.btn} >Explore</button>

            </Link>
          </div>
          <div className={styles.image}>
            <Image className={styles.image} src={image} />
          </div>
        </div>
        <h1>
          Features
        </h1>
        <div className={styles.features}>
          <div>
            <p>
              Create a payment link to request a pay for specific amount and deadline.
            </p>
          </div>
          <div>
            <p>Get a NFT minted right after transcation as an invoice              </p>
          </div>
          <div>
            <p>
              Pay in Stream with SuperFluid               </p>
          </div>
          <div>
            <p>
              Manage all your payments from dashboard              </p>
          </div>
          <div>
            <p>
              Invest directly from the platform into different investment methods and earn interest</p>
          </div>
        </div>
      </main>

    </div>
  );
}
