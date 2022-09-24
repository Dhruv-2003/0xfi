import React, { useState, useEffect } from "react";
import { useContract, userSigner, useProvider, useAccount } from "wagmi";
import { StoreRequests } from "./StoreRequests";
import { Requests_Contract_address, Request_ABI } from "../constants";
import { ethers } from "ethers";
export default function payLink() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [detailsURI, setDetailsURI] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();

  const Request_contract = useContract({
    addressOrName: Requests_Contract_address,
    contractInterface: Request_ABI,
    signerOrProvider: signer || provider,
  });

  const handleCreate = async () => {
    try {
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
      const calculateAmount = ethers.utils.parseEther(amount);
      const tx = await Request_contract.createRequest(
        calculateAmount,
        deadline,
        _detailsURL,
        { value: calculateAmount }
      );
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };
}
