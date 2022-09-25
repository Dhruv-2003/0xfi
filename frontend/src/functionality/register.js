import React, { useState, useEffect } from "react";
import { useContract, userSigner, useProvider, useAccount } from "wagmi";
import { Profile_Contract_address, Profile_ABI } from "../constants";

export default function Register() {
  const [name, setName] = useState("");
  const [recieveAddress, setRecieveAddress] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();

  const Profile_contract = useContract({
    addressOrName: Profile_Contract_address,
    contractInterface: Profile_ABI,
    signerOrProvider: signer || provider,
  });

  const handleRegister = async () => {
    try {
      console.log("Registering the profile");
      const tx = await Profile_contract.register(recieveAddress, name);
      await tx.wait();
      console.log("User added");
    } catch (err) {
      console.log(err);
    }
  };
}
