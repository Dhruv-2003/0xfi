// import { Client } from "@xmtp/xmtp-js";
// import { Wallet } from "ethers";
// import { useSigner, useProvider } from "wagmi";

// const provider = useProvider();
// const { data: signer } = useSigner();

// // Create the client with your wallet. This will connect to the XMTP development network by default
// const xmtp = await Client.create(signer);
// // Start a conversation with XMTP
// const conversation = await xmtp.conversations.newConversation(addressReciever);
// // Load all messages in the conversation
// const messages = await conversation.messages();
// // Send a message
// await conversation.send("gm");
// // Listen for new messages in the conversation
// for await (const message of await conversation.streamMessages()) {
//   console.log(`[${message.senderAddress}]: ${message.content}`);
// }
