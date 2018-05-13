import React, { Component } from 'react'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      txnHash: null,
      contractAddress: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  deployContract() {
    let contractJson = SimpleStorageContract;

    // get ABI
    let abi = contractJson.abi;
    let bytecode = contractJson.bytecode;
    let Contract  = this.state.web3.eth.contract(abi);

    this.state.web3.eth.getAccounts((error, accounts) => {
      if (error) {
        alert("Problem getting account info");
        console.log(error);
      } else {
        console.log(accounts);
        console.log(Contract)

        let contract = Contract.new({from: accounts[0], gas: 1000000, data: bytecode}, (err, result) => {
          if (err) {
            alert("Problem deployig contract");
            console.log(err);
          } else {
            alert("Contract deployed");
            console.log(result);
            this.setState({
              txnHash: result.transactionHash,
              contractAddress: result.address
            });
          }
        });
      }
    });

  }

  getDeploymentSuccessView() {
    return (
      <div className="pure-u-1-1">
        <br />
        <br />
        <h2>Contract Deployed</h2>
        <br />
          <div className="pure-u-1-1">
            <label>Contract Address: </label>
            <p>{this.state.contractAddress}</p>
         </div>
         <br />
         <div className="pure-u-1-1">
           <label>Transaction Hash: </label>
           <p>{this.state.contractAddress}</p>
         </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Deploy Simple Storage Contract</h2>
            </div>
            <br />
            <div className="pure-u-1-1">
              <p>Click the button below to deploy contract</p>
              <form className="form-inline">
                <button className="btn btn-primary my-2 my-sm-0" type="button" onClick={() => {
                    this.deployContract();
                  }}
                >
                Deploy
               </button>
             </form>
            </div>
            <br />
            {this.state.contractAddress && this.state.txnHash ? this.getDeploymentSuccessView() : null}
          </div>
        </main>
      </div>
    );
  }
}

export default App
