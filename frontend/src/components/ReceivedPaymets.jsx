import React from 'react'
import styles from '../css/Component.module.css'
export default function ReceivedPaymets(props) {
    return (
        <div className={styles.payments}>
            <h2>
                Kushagra Sarathe
                {props.name}
            </h2>

            <h3> Amount: 10 MATIC
                {props.amount}
            </h3>
            <h3>
                <u>Note:</u> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
                eaque veritatis
                {props.note}
            </h3>
        </div>
    )
}
