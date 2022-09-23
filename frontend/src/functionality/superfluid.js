import React, { useState } from "react";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { useSigner, useProvider } from "wagmi";

const provider = useProvider();
const { data: signer } = useSigner();

const sf = await Framework.create({
  chainId: 80001,
  provider: provider,
});

/// create flow component
async function createNewFlow(recipient, flowRate) {
  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const createFlowOperation = sf.cfaV1.createFlow({
      flowRate: flowRate,
      receiver: recipient,
      superToken: DAIx,
      // userData?: string
    });

    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Goerli
    Super Token: DAIx
    Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

async function updateExistingFlow(recipient, flowRate) {
  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const updateFlowOperation = sf.cfaV1.updateFlow({
      flowRate: flowRate,
      receiver: recipient,
      superToken: DAIx,
      // userData?: string
    });

    console.log("Updating your stream...");

    const result = await updateFlowOperation.exec(signer);
    console.log(result);

    console.log(
      `Congrats - you've just updated a money stream!
      View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
      Network: Goerli
      Super Token: DAIx
      Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
      Receiver: ${recipient},
      New FlowRate: ${flowRate}
      `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}

async function deleteFlow(recipient) {
  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const deleteFlowOperation = sf.cfaV1.deleteFlow({
      sender: "0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721",
      receiver: recipient,
      superToken: DAIx,
      // userData?: string
    });

    console.log("Deleting your stream...");

    await deleteFlowOperation.exec(signer);

    console.log(
      `Congrats - you've just deleted your money stream!
         Network: Kovan
         Super Token: DAIx
         Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
         Receiver: ${recipient}
      `
    );
  } catch (error) {
    console.error(error);
  }
}

export const CreateFlow = () => {
  const [recipient, setRecipient] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [flowRate, setFlowRate] = useState("");
  const [flowRateDisplay, setFlowRateDisplay] = useState("");

  function calculateFlowRate(amount) {
    if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
      alert("You can only calculate a flowRate based on a number");
      return;
    } else if (typeof Number(amount) === "number") {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
  }

  return (
    <div>
      <h2>Create a Flow</h2>
      <Form>
        <FormGroup className="mb-3">
          <FormControl
            name="recipient"
            value={recipient}
            onChange={handleRecipientChange}
            placeholder="Enter your Ethereum address"
          ></FormControl>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormControl
            name="flowRate"
            value={flowRate}
            onChange={handleFlowRateChange}
            placeholder="Enter a flowRate in wei/second"
          ></FormControl>
        </FormGroup>
        <CreateButton
          onClick={() => {
            setIsButtonLoading(true);
            createNewFlow(recipient, flowRate);
            setTimeout(() => {
              setIsButtonLoading(false);
            }, 1000);
          }}
        >
          Click to Create Your Stream
        </CreateButton>
      </Form>

      <div className="description">
        <p>
          Go to the CreateFlow.js component and look at the <b>CreateFlow() </b>
          function to see under the hood
        </p>
        <div className="calculation">
          <p>Your flow will be equal to:</p>
          <p>
            <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> DAIx/month
          </p>
        </div>
      </div>
    </div>
  );
};
