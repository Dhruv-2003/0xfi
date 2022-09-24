import React, { useState, useEffect } from "react";
import { useContract, userSigner, useProvider, useAccount } from "wagmi";
import { StoreRequests } from "./StoreRequests";
import { Requests_Contract_address } from "../constants";

export default function payLink() {
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState(0);
  const [detailsURI, setDetailsURI] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();

  const Request_contract = useContract({
    addressOrName: Requests_Contract_address,
    contractInterface: DAOMember_ABI,
    signerOrProvider: signer || provider,
  });

  const handleCreate = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
}
