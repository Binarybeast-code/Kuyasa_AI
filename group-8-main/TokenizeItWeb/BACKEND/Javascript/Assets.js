import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import TangibleAssetTokenization from './contracts/Ticket12.json'; // Import the contract ABI
import './App.css';

async function listAssetForSale(assetId, price) {
    try {
      await contract.methods.listAssetForSale(assetId, price).send({ from: accounts[0] });
      // Refresh the list of tangible assets after listing
      const updatedAssets = [...tangibleAssets];
      updatedAssets[assetId].isForSale = true;
      updatedAssets[assetId].price = price;
      setTangibleAssets(updatedAssets);
    } catch (error) {
      console.error('Error listing asset:', error);
    }
  }

  async function buyAsset(assetId, sellerAddress, price) {
    try {
      await contract.methods.buyAsset(assetId).send({
        from: accounts[0],
        value: price,
      });
      // Refresh the list of tangible assets after buying
      const updatedAssets = [...tangibleAssets];
      updatedAssets[assetId].isForSale = false;
      updatedAssets[assetId].price = 0; // Reset price
      updatedAssets[assetId].owner = accounts[0]; // Update owner
      setTangibleAssets(updatedAssets);
    } catch (error) {
      console.error('Error buying asset:', error);
    }
  }

  <ul>
  {tangibleAssets.map((asset, index) => (
    <li key={index}>
      ID: {asset.id}, Name: {asset.name}, Value: {asset.value}
      {asset.isForSale ? (
        <button onClick={() => buyAsset(index, asset.owner, asset.price)}>
          Buy for {web3.utils.fromWei(asset.price, 'ether')} ETH
        </button>
      ) : (
        <button onClick={() => listAssetForSale(index, web3.utils.toWei('1', 'ether'))}>
          List for Sale
        </button>
      )}
    </li>
  ))}
</ul>


  useEffect(() => {
    // Listen for events when the component mounts
    if (contract) {
      contract.events.AssetListed()
        .on('data', (event) => {
          console.log('Asset listed event:', event);
          // Handle the event by updating the UI
          // You may want to fetch the updated list of assets here
        })
        .on('error', (error) => {
          console.error('Error listening for asset listed event:', error);
        });
    }
  }, [contract]);

  


function TangibleAssetList() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [tangibleAssets, setTangibleAssets] = useState([]);

  useEffect(() => {
    async function initialize() {
      // Connect to Ethereum
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Get the user's accounts
          const userAccounts = await web3Instance.eth.getAccounts();
          setAccounts(userAccounts);
          // Initialize the contract
          const networkId = await web3Instance.eth.net.getId();
          const contractData = TangibleAssetTokenization.networks[networkId];
          if (contractData) {
            const contractInstance = new web3Instance.eth.Contract(
              TangibleAssetTokenization.abi,
              contractData.address
            );
            setContract(contractInstance);
            // Fetch tangible assets from the contract
            const assetCount = await contractInstance.methods.getAssetCount().call();
            const assets = [];
            for (let i = 0; i < assetCount; i++) {
              const asset = await contractInstance.methods.getAsset(i).call();
              assets.push(asset);
            }
            setTangibleAssets(assets);
          } else {
            console.error('Contract not deployed on this network');
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
    initialize();
  }, []);

  // Implement functions to list and buy tangible assets
  // ...

  return (
    <div className="App">
      <h1>Tangible Asset List</h1>
      <ul>
        {tangibleAssets.map((asset, index) => (
          <li key={index}>
            ID: {asset.id}, Name: {asset.name}, Value: {asset.value}
            {/* Implement UI for listing and buying assets */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TangibleAssetList;
