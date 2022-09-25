import React from "react";
import Button from "../src/components/Button";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import banner from "../src/assets/banner.png";
import {
  useContract,
  useSigner,
  useProvider,
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useEnsAddress,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UnstoppableDomain } from "../src/functionality/unstoppableDomains";

export default function Pay(props) {
  const [enteredAddress, setEnteredAddress] = useState(false);
  const [amount, setAmount] = useState("");
  const [resolvedAddress, setResolvedAddress] = useState("");
  const [paid, setPaid] = useState(false);

  const { address } = useAccount();

  const provider = useProvider();
  const { data: signer } = useSigner();
  // const _amount = ethers.utils.parseEther(amount);
  const { config } = usePrepareSendTransaction({
    request: {
      to: DAOFunds_Contract_Address,
      value: amount ? ethers.utils.parseEther(amount) : undefined,
    },
  });

  const { data, sendTransaction } = useSendTransaction(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Transaction Completed");
      setPaid(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    lensResolver(enteredAddress);
    ensResolver(enteredAddress);
    domainResolver(enteredAddress);
  }, [enteredAddress]);

  const pay = async () => {
    try {
      console.log("Paying ");
      const tx = sendTransaction();
    } catch (err) {
      console.log(err);
    }
  };

  const lensResolver = (_address) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const ensResolver = (_address) => {
    try {
      const { data } = useEnsAddress(_address);
      console.log(data);
      setResolvedAddress(data);
    } catch (err) {
      console.log(err);
    }
  };

  const domainResolver = (_address) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Welcome!!!</h1>
      <h2>Enter any of ENS , Lens and UnstoppableDomain handle below to pay</h2>
      <div className={styles.single_pay}>
        {/* <div className={styles.banner}>
          <Image className={styles.banner} src={banner} />
        </div> */}

        <ConnectButton />

        <div className={styles.class1}>
          <label>
            <u>Send to:</u>
          </label>
          <input
            onChange={(e) => {
              setEnteredAddress(e.target.value);
            }}
            type={"text"}
            placeholder="Enter Address"
            className={styles.input}
          />
          <h3>{resolvedAddress}</h3>
          <h4>
            <u>Enter Amount:</u>
          </h4>
          <input
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type={"number"}
            placeholder="Enter Amount"
            className={styles.input}
          />
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                title={"Pay"}
                //   click={function here}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
