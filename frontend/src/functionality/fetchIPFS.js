const fetchIPFS = async (metadataURI) => {
  try {
    console.log("Fetching from IPFS ...");
    const URL = `https://ipfs.io/ipfs/${metadataURI}/research.json`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
