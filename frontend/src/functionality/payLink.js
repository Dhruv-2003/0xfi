import React, { useState, useEffect } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { StoreRequests } from "../StoreRequests";
import {
  Requests_Contract_address,
  Request_ABI,
  Profile_ABI,
  Profile_Contract_address,
} from "../constants";
import { ethers } from "ethers";

/// personalized page
export default function payLink() {
  const [amount, setAmount] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [details, setdetails] = useState({});

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
      setdetails(response);
    } catch (err) {
      console.log(err);
    }
  };

  const pay = async () => {
    try {
      /// sending the money in to the user
      const calculateAmount = ethers.utils.parseEther(amount);
      const tx = await Request_contract.createRequest(calculateAmount, {
        value: calculateAmount,
      });
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };
}
