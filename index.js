const { Web3 } = require("web3");
const dotenvenc = require("@chainlink/env-enc");
dotenvenc.config();
const abi = require("./ABI.json");

// converting private key to hex
const privateKey = "0x" + process.env.PRIVATE_KEY;

const sepoliaRpcURL = process.env.SEPOLIA_RPC_URL;
const provider = sepoliaRpcURL;
const web3 = new Web3(provider);

const contractAddress = "0xb2402A7Ce7552177653232F321920ba037426AE3";
const recipient = "0x612Bc7Eef8ef5E4fc3092d11CB7e9DC6ae3aa4d7";
const contract = new web3.eth.Contract(abi, contractAddress);

const balance = async () => {
  const weiBalance = await web3.eth.getBalance(
    "0xFEd771790A85B27B54abe745a1405888Af102dC0"
  );
  const balanceInEther = await web3.utils.fromWei(weiBalance, "ether");

  console.log("Account Balance: " + weiBalance + " wei");
  console.log("Account Balance in ether: " + balanceInEther + "eth");
};

balance();

const readSmartContract = async () => {
  try {
    // symbol() method: returns the symbol of the token -> MM
    const symbol = await contract.methods.symbol().call();
    // totalSupply() method:  returns the total supply of the token -> 1000
    const totalSupply = await contract.methods.totalSupply().call();
    // name() method:  returns the name of the token -> MiniMenu
    const name = await contract.methods.name().call();
    // balanceOf() method: returns the balance of the provided address.
    const balanceOf = await contract.methods.balanceOf(recipient).call();

    console.log(symbol + "  " + totalSupply + " " + name);
    console.log("balance of " + recipient + " : " + balanceOf);
  } catch (err) {
    console.error(err);
  }
};

readSmartContract();

const initateTransaction = async () => {
  // fetching account details
  try {
    const accounts = web3.eth.accounts.wallet.add(privateKey).get(0);

    const recipient = "0x612Bc7Eef8ef5E4fc3092d11CB7e9DC6ae3aa4d7";
    const amount = "10";

    const transaction = {
      from: accounts.address,
      to: contractAddress,
      data: contract.methods.transfer(recipient, amount).encodeABI(),
      gas: "300000",
    };

    await web3.eth.sendTransaction(transaction);
  } catch (err) {
    console.error(err);
  }
};

initateTransaction();
