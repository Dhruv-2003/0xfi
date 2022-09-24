import Image from "next/image";
import styles from "../styles/Home.module.css";
import image from "../src/assets/img-bg.png";
import bg from "../src/assets/bg-grid.png";
import bg2 from "../src/assets/grid-png.png";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <div>
            <h1 className={styles.censtereda}>CreatorFi</h1>
            <h3 className={styles.censtereda}>
              A DeSo platform with DeFi tools for creators
            </h3>
          </div>
          <div className={styles.image}>
            <Image className={styles.image} src={image} />
          </div>
        </div>
      </main>
    </div>
  );
}
