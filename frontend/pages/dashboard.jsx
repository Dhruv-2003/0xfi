import { useState, useEffect } from "react";
import Button from "../src/components/Button";
import Generate from "../src/components/Generate";
import ReceivedPaymets from "../src/components/ReceivedPaymets";
import styles from "../styles/Home.module.css";
import {
  Profile_ABI,
  Profile_Contract_address,
  Funds_ABI,
  Funds_Contract_address,
} from "../src/constants";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
export default function dashboard(props) {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [verifyStart, setVerifyStart] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState([]);
  const [balance, setBalance] = useState(0);

  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Profile_contract = useContract({
    addressOrName: Profile_Contract_address,
    contractInterface: Profile_ABI,
    signerOrProvider: signer || provider,
  });

  const Funds_contract = useContract({
    addressOrName: Funds_Contract_address,
    contractInterface: Funds_ABI,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    checkUser();
    // if (isUser) {
    //   fetchUser();
    // }
    fetchUser();
  }, [address]);

  const register = async () => {
    try {
      console.log("Registering the user ..");
      const tx = await Profile_contract.register(walletAddress, name);
      await tx.wait();
      console.log("User Registered");
    } catch (err) {
      console.log(err);
    }
  };

  const verify = async () => {
    try {
      const tx = await Profile_contract.verify(walletAddress);
      await tx.wait();
      console.log("waiting for the approval....");
      setVerifyStart(true);
    } catch (err) {
      console.log(err);
    }
  };

  const completeVerification = async () => {
    try {
      const tx = await Profile_contract.confirm(address, true);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  const checkUser = async () => {
    try {
      const data = await Profile_contract.checkUser(address);
      console.log(data);
      setIsUser(data);
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const data = await Profile_contract.getUser(address);
      console.log(data);
      setUserData(data);
      setIsVerified(data[2]);

      const response = await Funds_contract.getBalance(address);
      console.log(parseInt(response));
      setBalance(parseInt(response));
    } catch (err) {
      console.log(err);
    }
  };

  const withdraw = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome to Dashboard</h1>
      <div className={styles.dashboard}>
        <div className={styles.dashboard_section}>
          <h2>User Stats</h2>
          {!isUser ? (
            <div className={styles.balance}>
              <h4>Enter Name: </h4>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className={styles.input}
                placeholder="Enter Name"
              />
              <h4>Enter Wallet Address: </h4>
              <input
                onChange={(e) => {
                  setWalletAddress(e.target.value);
                }}
                type="text"
                className={styles.input}
                placeholder="Wallet Address"
              />
              <Button click={register} title="Register" />
            </div>
          ) : (
            <div className={styles.balance}>
              <h1>{userData[1]}</h1>
              <h2>Total Balance: {balance} </h2>
              <Button title="Withdraw" />
              {!isVerified ? (
                <div>
                  <Button title="verify" click={verify} />
                  {verifyStart ? (
                    <>
                      <Button
                        title="complete verification"
                        click={completeVerification}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <div>
                  <h2>Verified Receive address</h2>
                  <h2>{userData[0]}</h2>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.dashboard_section}>
          <h2>Received Payments</h2>
          <div className={styles.received}>
            {/* mapping here */}
            <ReceivedPaymets />
          </div>
        </div>
        <div className={styles.dashboard_section}>
          <h2>Generate New Link</h2>
          <Generate />
        </div>
      </div>
    </div>
  );
}
