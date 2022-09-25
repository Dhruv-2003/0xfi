import React, { useState } from "react";
import styles from "../css/Layout.module.css";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import logo from "../assets/logo.png";
import image from "../assets/img-bg.png";

export default function Layout({ children }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }
  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/">
          <span className={styles.brand}>
            <Image className={styles.logo} src={logo} />
          </span>
        </Link>

        <ul
          className={
            isActive === false
              ? styles.navmenu
              : styles.navmenu + " " + styles.active
          }
        >
          <li className={styles.navlink}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {/* <li className={styles.navlink}>
            <Link href="/receive">Receive</Link>
          </li> */}
          <li className={styles.navlink}>
            <Link href="/dashboard">Invest</Link>
          </li>
          <li className={`${styles.navlink} ${styles.connect} ${styles.hide}`}>
            <ConnectButton />
          </li>
        </ul>

        <div className={`${styles.connect} ${styles.show}`}>
          <ConnectButton />
        </div>
        <button
          onClick={handleClick}
          className={
            isActive === false
              ? styles.hamburger
              : styles.hamburger + " " + styles.active
          }
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </nav>
      {children}
      <footer className={styles.footer}>
        <h4>
          Built by{" "}
          <u>
            <a
              href="https://twitter.com/kushagrasarathe"
              target="_blankspace"
              rel="noreferrer"
            >
              Kushagra Sarathe
            </a>
          </u>
          <span> &#38; </span>
          <u>
            <a
              href="https://twitter.com/0xdhruva"
              target="_blankspace"
              rel="noreferrer"
            >
              Dhruv Agarwal
            </a>
          </u>
        </h4>
      </footer>
    </>
  );
}
