import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import image from "../src/assets/art.svg";
import bg from "../src/assets/bg-grid.png";
import bg2 from "../src/assets/grid-png.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CreatorFi</title>
        <meta
          name="description"
          content="A DeFi plus DeSo platform for creators"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <div>
            <h1 className={styles.censtereda}>CreatorFi</h1>
            <h3 className={styles.censtereda}>
              A DeSo platform with DeFi tools for creators
            </h3>
          </div>
        </div>
        <div className={styles.right}>
          <div>
            {/* <Image src={image} /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
