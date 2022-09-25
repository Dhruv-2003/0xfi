import React, { useRef, useState } from "react";
import styles from "../css/Component.module.css";
import Button from "./Button";
import copy_img from "../assets/copy.png";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { StoreRequests } from "../functionality/StoreRequests";
import { Requests_Contract_address, Request_ABI } from "../constants";
import { ethers } from "ethers";

import Image from "next/image";

export default function Generate() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [expiry, setExpiry] = useState("");
  const [detailsURI, setDetailsURI] = useState("");
  const [requestId, setRequestId] = useState(0);
  const [generatedLink, setGeneratedLink] = useState("");

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();
  const Request_contract = useContract({
    addressOrName: Requests_Contract_address,
    contractInterface: Request_ABI,
    signerOrProvider: signer || provider,
  });

  const handleCreate = async () => {
    try {
      // const deadline = Date.parse(expiry);
      // const calculateAmount = ethers.utils.parseEther(amount);
      // console.log(deadline, calculateAmount);
      await storeDetails();
    } catch (err) {
      console.log(err);
    }
  };

  const storeDetails = async () => {
    try {
      console.log("Storing the info");
      const cid = await StoreRequests(name, note, amount);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      setDetailsURI(URL);
      createRequest(URL);
    } catch (err) {
      console.log(err);
    }
  };

  const createRequest = async (_detailsURL) => {
    try {
      const deadline = Date.parse(expiry);
      console.log(deadline);
      const calculateAmount = ethers.utils.parseEther(amount);
      const tx = await Request_contract.createRequest(
        calculateAmount,
        deadline,
        _detailsURL
      );
      await tx.wait();
      const id = parseInt(tx.value._hex);
      setRequestId(id);
      console.log(parseInt(tx.value._hex));
      console.log("request created");

      setGeneratedLink(`https://0xfi.vercel.app/${address}/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const inputHandler = (event) => {
    setGeneratedLink(event.target.value);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(generatedLink);
    // alert("Text copied");
  };

  return (
    <div className={styles.generate}>
      <h2>Create a payment link</h2>
      <hr className={styles.hr} />
      <div className={styles.section}>
        <h3>Request Receiver Name</h3>
        <input
          className={styles.input}
          type="text"
          placeholder="Name of person to receive funds from"
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.section}>
        <h3>
          Amount <small> &#40; in MATIC &#41; </small>
        </h3>
        <input
          className={styles.input}
          type="text"
          placeholder="0"
          required
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        />
      </div>
      <div className={styles.section}>
        <h3>Note</h3>
        <input
          className={styles.input}
          type="text"
          placeholder="A short description"
          required
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
      </div>
      <div className={styles.section}>
        <h3>Link Expiry</h3>
        <input
          className={styles.input}
          type="datetime-local"
          required
          onChange={(e) => {
            setExpiry(e.target.value);
          }}
        />
      </div>
      {/* <div className={styles.section}>
        <h4>
          <u className={styles.generated_link}>https://generated.link.here</u>
          { generated_link_here }

          <input
            className={`${styles.input} ${styles.generated_link}`}
            type="text"
            value={generatedLink}
            onChange={inputHandler}
          />
          <button
            className={styles.copy}
            onClick={copy}
            disabled={!generatedLink}
          >
            <Image src={copy_img} />
          </button>
        </h4>
      </div> */}
      <div className={styles.button}>
        <Button click={handleCreate} title={"Generate Link"} />
      </div>
      <div>
        <a>The generated link is</a>
      </div>
    </div>
  );
}
