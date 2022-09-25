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
export async function createNewFlow(recipient, flowRate) {
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

export async function updateExistingFlow(recipient, flowRate) {
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

export async function deleteFlow(recipient) {
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

export async function daiApprove(amt) {
  //fDAI on goerli: you can find network addresses here: https://docs.superfluid.finance/superfluid/developers/networks
  //note that this abi is the one found here: https://goerli.etherscan.io/address/0x88271d333C72e51516B67f5567c728E702b3eeE8
  const DAI = new ethers.Contract(
    "0x88271d333C72e51516B67f5567c728E702b3eeE8",
    daiABI,
    signer
  );
  try {
    console.log("approving DAI spend");
    await DAI.approve(
      "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
      ethers.utils.parseEther(amt.toString())
    ).then(function (tx) {
      console.log(
        `Congrats, you just approved your DAI spend. You can see this tx at https://kovan.etherscan.io/tx/${tx.hash}`
      );
    });
  } catch (error) {
    console.error(error);
  }
}

//where the Superfluid logic takes place
export async function daiUpgrade(amt) {
  const DAIx = await sf.loadSuperToken("fDAIx");

  try {
    console.log(`upgrading $${amt} DAI to DAIx`);
    const amtToUpgrade = ethers.utils.parseEther(amt.toString());
    const upgradeOperation = DAIx.upgrade({
      amount: amtToUpgrade.toString(),
    });
    const upgradeTxn = await upgradeOperation.exec(signer);
    await upgradeTxn.wait().then(function (tx) {
      console.log(
        `
        Congrats - you've just upgraded DAI to DAIx!
      `
      );
    });
  } catch (error) {
    console.error(error);
  }
}

export async function daiDowngrade(amt) {
  const DAIx = await sf.loadSuperToken(
    "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00"
  );

  console.log(DAIx.address);

  try {
    console.log(`Downgrading $${amt} fDAIx...`);
    const amtToDowngrade = ethers.utils.parseEther(amt.toString());
    const downgradeOperation = DAIx.downgrade({
      amount: amtToDowngrade.toString(),
    });
    const downgradeTxn = await downgradeOperation.exec(signer);
    await downgradeTxn.wait().then(function (tx) {
      console.log(
        `
        Congrats - you've just downgraded DAIx to DAI!
        You can see this tx at https://goerli.etherscan.io/tx/${tx.transactionHash}
        Network: Goerli
        NOTE: you downgraded the dai of 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721.
        You can use this code to allow your users to do it in your project.
        Or you can downgrade tokens at app.superfluid.finance/dashboard.
      `
      );
    });
  } catch (error) {
    console.error(error);
  }
}
