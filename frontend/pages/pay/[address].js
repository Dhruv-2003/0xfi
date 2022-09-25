import React, { useState, useEffect } from "react";
import Button from "../../src/components/Button";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import banner from "../../src/assets/eth.jpg";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { StoreRequests } from "../../src/functionality/StoreRequests";
import {
  Requests_Contract_address,
  Request_ABI,
  Profile_ABI,
  Profile_Contract_address,
} from "../../src/constants";
import { ethers } from "ethers";
import { useRouter } from "next/dist/client/router";

export default function Pay() {
  const [amount, setAmount] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [details, setDetails] = useState([]);

  const router = useRouter();
  const _address = router.query.address;

  const provider = useProvider();
  const { data: signer } = useSigner();

  const Request_contract = useContract({
    addressOrName: Requests_Contract_address,
    contractInterface: Request_ABI,
    signerOrProvider: signer || provider,
  });

  const Profile_contract = useContract({
    addressOrName: Profile_Contract_address,
    contractInterface: Profile_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    setUserAddress(_address);
    fetchDetails(_address);
  }, [_address]);

  const fetchDetails = async (_userAddress) => {
    try {
      const response = await Profile_contract.getUser(_userAddress);
      console.log(response);
      setDetails(response);
    } catch (err) {
      console.log(err);
    }
  };

  const pay = async () => {
    try {
      /// sending the money in to the user
      console.log(userAddress);
      const calculateAmount = ethers.utils.parseEther(amount);
      const tx = await Request_contract.pay(userAddress, {
        value: calculateAmount,
      });
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome!!!</h1>
      <div className={styles.single_pay}>
        <div className={styles.banner}>
          <Image className={styles.banner} src={banner} />
        </div>

        <div className={styles.class1}>
          {/* <label>
            <u>Send to:</u>

          </label>
          <input onChange={e => {
            setName(e.target.value)
          }} type={'text'} placeholder='Enter Name' className={styles.input} /> */}
          <h4>
            <u>Paying to : {details[1]}</u>
          </h4>
          <h4>
            <u>Enter Amount:</u>
          </h4>
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type="text"
            value={amount}
            placeholder="Enter Amount"
            className={styles.input}
          />
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button title={"Pay"} click={pay} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
