import Web3 from "web3";

import './App.css';

// contract imports
import { contractAddress, abi } from "./ContractArtifacts";
import { useEffect, useState } from 'react';

function App() {

  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [number, setNumber] = useState(null);
  const [inputNumber, setInputNumber] = useState(0);

  useEffect(() => {

    async function getAddress() {

      // check for ethereum provider
      if (window.ethereum) {

        // create a new web3 instance
        var web3Instance = new Web3(window.ethereum);
        window.ethereum.enable();   // enable metamask (or other wallet)
        window.web3 = web3Instance;

        setWeb3(web3Instance);

        // fetch accounts
        var account = (await web3Instance.eth.getAccounts())[0];
        console.log("Account: ", account);

        setAccount(account);

        // create contract instance
        var contract = new web3Instance.eth.Contract(
          abi,
          contractAddress,
          {
            gasPrice: '20000000000', // default gas price in wei
            from: account // the account address
          }
        );

        setContract(contract);

        try {

          // call the get number contract method
          const response = await contract.methods.getNumber().call();
          console.log("Number Received: ", response);
          setNumber(response);

        } catch (error) {
          console.log("Error in calling contract");
        }

      }

    }

    getAddress();

  }, []);

  async function saveNumber() {
    try {
      // call the save number contract method
      await contract.methods.saveNumber(inputNumber).send();
    } catch (error) {
      console.log("Error in calling contract.", error);
    }
  }

  const handleInputChange = (e) => {
    setInputNumber(e.target.value);
  }

  if (web3 === null || web3 === undefined) {
    return (
      <div className="App">
        <h2>
          Please install a wallet such as metamask to proceed.
        </h2>
      </div>
    );

  } else if (account === null || account === undefined) {
    return (
      <div className="App">
        <h2>
          Please link your metamask account to proceed.

        </h2>
      </div>
    );

  } else {
    return (
      <div className="App">
        <h2>
          Address: {account}
          <br></br>
          Number: {number}
        </h2>

        <form onSubmit={saveNumber}>
          <label>
            Number:
          <input type="number" value={inputNumber} onChange={handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );

  }



}

export default App;
