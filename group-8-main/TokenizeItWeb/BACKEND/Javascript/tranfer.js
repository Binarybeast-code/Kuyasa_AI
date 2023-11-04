const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');



// Create a contract instance using the ABI retrieved from getABI
const abi = JSON.parse('{"title": "Ticket12", "description": "Ticket #12"}'); // Replace with your actual ABI
const ticketsContract = new web3.eth.Contract(abi, contractAddress);
const contractABI = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
        }
    ],
    "name": "buyTicket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
},
{
    "inputs": [],
    "name": "owner",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "tickets",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}];
const contractAddress = '0xf4dE3cD020F2F5Af99923023Af2d0E1E37cD9CA1';
const contract = new web3.eth.Contract(contractABI, contractAddress);

const senderAddress = '0xf4dE3cD020F2F5Af99923023Af2d0E1E37cD9CA1'; // Replace with the sender's Ethereum address
const recipientAddress = '0x5229F4f15Cd52B57096a7EBe914bB72D57e0Fa56'; // Replace with the recipient's Ethereum address

const privateKey = '0xa75cc6b2889878f099e029917bf4cd7d492b8e5b85743b36b4d68b2e341d9d34'; // Replace with the sender's private key
web3.eth.accounts.wallet.add(privateKey);

const transferAmount = web3.utils.toWei('1', 'ether'); // 1 ETH as an example; adjust as needed

async function transferPoints() {
  try {
    const nonce = await web3.eth.getTransactionCount(senderAddress);

    const txObject = {
      from: senderAddress,
      to: contractAddress,
      nonce: nonce,
      gasLimit: web3.utils.toHex(21000), // Adjust gas limit as needed
      gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // Adjust gas price as needed
      data: contract.methods.transfer(recipientAddress, transferAmount).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction hash: ${txReceipt.transactionHash}`);
    console.log(`Points transferred successfully.`);
  } catch (error) {
    console.error('Error transferring points:', error);
  }
}

transferPoints();



///tfk