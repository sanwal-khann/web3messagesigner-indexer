document.getElementById("connectWallet").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      document.getElementById(
        "walletAddress"
      ).innerText = `Wallet Address: ${account}`;
      document.getElementById("signMessage").style.display = "block"; // Show sign message button
      document.getElementById("disconnectWallet").style.display = "block"; // Show disconnect button
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  } else {
    alert("MetaMask is not installed!");
  }
});

document.getElementById("signMessage").addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const message = "Hello, world!";
      const signature = await signer.signMessage(message);
      document.getElementById(
        "signedMessage"
      ).innerText = `Signed Message: ${signature}`;

      // Optionally, verify the signature
      const address = await signer.getAddress();
      const verified = ethers.utils.verifyMessage(message, signature);
      console.log(
        `Verified address: ${verified === address ? "Success" : "Failed"}`
      );
    } catch (error) {
      console.error("Error signing message:", error);
    }
  } else {
    alert("MetaMask is not installed!");
  }
});

document
  .getElementById("disconnectWallet")
  .addEventListener("click", async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        document.getElementById("walletAddress").innerText = ""; // Clear wallet address
        document.getElementById("signedMessage").innerText = ""; // Clear signed message
        document.getElementById("signMessage").style.display = "none"; // Hide sign message button
        document.getElementById("disconnectWallet").style.display = "none"; // Hide disconnect button
      } catch (error) {
        console.error("Error disconnecting from MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  });
