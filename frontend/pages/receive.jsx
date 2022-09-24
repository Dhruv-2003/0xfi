import React from 'react'
import Generate from '../src/components/Generate'
import styles from '../styles/Home.module.css'

export default function receive() {
  return (
    <div className={styles.main}>
        <Generate />
    </div>
  )
}
