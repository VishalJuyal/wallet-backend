const { ethers } = require("ethers");
const ethWallet = require("ethereumjs-wallet");

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/0f831e01ee5047bf938e41c110caf283"
);

const createWallet = () => {
  const wallet = ethWallet.default.generate();
  const privateKey = wallet.getPrivateKeyString();
  const address = wallet.getAddressString();

  console.log("Wallet Address:", address);
  console.log("Private Key:", privateKey);

  return { address, privateKey };
};

const checkBalance = async (address) => {
  try {
    const balance = await provider.getBalance(address);
    console.log("Balance (ETH):", ethers.formatEther(balance));
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};

const sendTransaction = async (privateKey, toAddress, amountInEther) => {
  try {
    const wallet = new ethers.Wallet(privateKey, provider);

    const transaction = {
      to: toAddress,
      value: ethers.parseEther(amountInEther),
      gasLimit: 21000,
    };

    const txResponse = await wallet.sendTransaction(transaction);
    console.log("Transaction sent:", txResponse.hash);

    const receipt = await txResponse.wait();
    console.log("Transaction confirmed:", receipt);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
};

(async () => {
  const wallet = createWallet();

  await checkBalance(wallet.address);
  // await sendTransaction(wallet.privateKey, wallet.address, "0.01");
})();
