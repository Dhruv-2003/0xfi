import React from "react";
import styles from "../css/Layout.module.css";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import logo from "../assets/logo.svg";

export default function Layout({ children }) {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
        <Link href="/">
          <Image className={styles.logo} src={logo} />
          
        </Link>
        </div>
        <ul className={styles.navmenu}>
          <li className={styles.navlink}>
            <Link href="/dashboard">Home</Link>
          </li>
          <li className={styles.navlink}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <span>
          <ConnectButton />
        </span>
      </nav>
      {children}
      <footer className={styles.footer}></footer>
    </>
  );
}
