import Button from "../../src/components/Button";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import banner from "../../src/assets/banner.png";
import { useRouter } from "next/dist/client/router";
import React, { useState, useEffect } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { Requests_Contract_address, Request_ABI } from "../../src/constants";
import { ethers } from "ethers";
import { MintBill } from "../../src/functionality/mintBill";
import { StoreMetadata } from "../../src/functionality/StoreInvoices";
import paymentNFT from "../../src/assets/0xfiPaymentNFT.png";
import { fetchIPFS } from "../../src/functionality/fetchIPFS";
// import {
//   createNewFlow,
//   deleteFlow,
//   daiApprove,
//   daiUpgrade,
// } from "../../src/functionality/superfluid";

export default function PayRequest() {
  const [userAddress, setUserAddress] = useState("");
  const [details, setdetails] = useState({});
  const [requestId, setRequestId] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [valueInWei, setValueInWei] = useState(0);
  const [invoiceURI, setInvoiceURI] = useState("");

  const router = useRouter();
  const _address = router.query.address;
  const _id = router.query.id;

  const { address } = useAccount();
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
    fetchRequest(_id, _address);
  }, [_id]);

  const fetchRequest = async (_requestId, _userAddress) => {
    try {
      console.log("fetching the request");
      const response = await Request_contract.fetchRequest(
        _userAddress,
        _requestId
      );
      console.log(response);
      const data = await fetchIPFS(response[2]);
      setInvoiceURI(response[2]);
      // console.log(parseInt(response[1]))
      const date = new Date(parseInt(response[1])).toString();
      setValueInWei(parseInt(response[0]));
      console.log(data, date);
      const request = {
        Name: data.Reciever,
        Amount: data.Amount,
        Deadline: date,
        Note: data.Info,
      };
      setdetails(request);
      console.log(request);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayFull = async () => {
    try {
      console.log("Paying the user ...");
      const tx = await Request_contract.PayinFull(userAddress, requestId, {
        value: valueInWei,
      });
      await tx.wait();

      console.log("paid in full");
      setIsPaid(true);
    } catch (err) {
      console.log(err);
    }
  };

  const generateBill = async () => {
    try {
      /// create new description of the bill with the help of the data
      const name = `Request No.${requestId}`;
      const ipfsURI = await StoreMetadata(paymentNFT, name, invoiceURI);
      /// generate the NFT metadata link and store on IPFS
      console.log(ipfsURI, address);
      /// mint the NFT with the help of NFT port
      const tx = await MintBill(ipfsURI, address);
      console.log(tx);
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
          <h2>{details.Name}</h2>
          <h4>
            <u>Amount Requested:</u>
          </h4>
          <h3>{details.Amount} Matic</h3>
          <h4>
            <u>Note:</u>
          </h4>
          <h3>{details.Note}</h3>
          <h4>
            <u>Link Expires On:</u>
          </h4>
          <h3>{details.Deadline}</h3>
          {!isPaid ? (
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button title={"Pay Now"} click={handlePayFull} />
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
          ) : (
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button
                  title={"Generate Bill and Mint NFT"}
                  click={generateBill}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
