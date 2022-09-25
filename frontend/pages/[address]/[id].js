import Button from "../../src/components/Button";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import banner from "../../src/assets/banner.png";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { Requests_Contract_address, Request_ABI } from "../../src/constants";
import { ethers } from "ethers";

export default function PayRequest(props) {
  const [userAddress, setUserAddress] = useState("");
  const [details, setdetails] = useState({});
  const [requestId, setRequestId] = useState(0);

  const router = useRouter();
  const _address = router.query.address;
  const _id = router.query.id;

  const provider = useProvider();
  const { data: signer } = useSigner();

  const Request_contract = useContract({
    addressOrName: Requests_Contract_address,
    contractInterface: Request_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    setUserAddress(_address);
    setRequestId(_id);
    console.log(_id, _address);
  }, [_id]);

  const fetchRequest = async () => {
    try {
      console.log("fetching the request");
      const response = await Request_contract.fetchRequest(
        userAddress,
        requestId
      );
      console.log(response);
      setdetails(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayFull = async () => {
    try {
      console.log("Paying the user ...");

      const amount = details.amount;
      const tx = await Request_contract.PayinFull(userAddress, requestId, {
        value: amount,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayinStream = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayLater = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const generateBill = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome to Payment Page!!!</h1>
      <div className={styles.pay}>
        <div className={styles.banner}>
          <Image className={styles.banner} src={banner} />
        </div>

        <div className={styles.pay_content}>
          <h4>
            <u>Request to:</u>
          </h4>
          <h2>
            Kushagra Sarathe
            {props.name}
          </h2>
          <h4>
            <u>Amount Requested:</u>
          </h4>
          <h3>
            10 MATIC
            {props.amount}
          </h3>
          <h4>
            <u>Note:</u>
          </h4>
          <h3>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
            eaque veritatis
            {props.note}
          </h3>
          <h4>
            <u>Link Expires On:</u>
          </h4>
          <h3>
            12/12/2025
            {props.expiry}
          </h3>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                title={"Pay Now"}
                //   click={function here}
              />
            </div>
            <div className={styles.button}>
              <Button
                title={"Pay Later"}
                //   click={function here}
              />
            </div>
            <div className={styles.button}>
              <Button
                title={"Pay in Stream"}
                //   click={function here}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
