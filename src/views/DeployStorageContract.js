import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as queryString from 'query-string'

import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import SimpleStorageInitContract from '../../build/contracts/SimpleStorageInit.json'
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
      contractAddress: null,
      deployedContract: null,
      contractNetwork: null,
      network: null,
      constructorValue: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        network: results.web3.currentProvider.publicConfigStore._state.networkVersion
      })
    })
    .catch((e) => {
      console.log(e)
      console.log('Error finding web3.')
    })
  }

  deploySimpleContract() {

    this.setState({
      txnHash: null,
      contractAddress: null,
      deployedContract: null,
      contractNetwork: null,
      constructorValue: null
    }, () => {
      let contractJson = SimpleStorageContract;

      // get ABI
      let abi = contractJson.abi;
      let bytecode = contractJson.bytecode;
      let Contract  = this.state.web3.eth.contract(abi);

      this.state.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error);
          alert("Problem getting account info");
        } else {
          console.log(Contract)

          Contract.new({from: accounts[0], data: bytecode}, (err, result) => {
            if (err) {
              console.log(err.message);
              alert("Problem deployig contract");
            } else {
              console.log(result);
              this.setState({
                txnHash: result.transactionHash,
                contractAddress: result.address,
                deployedContract: result,
                contractNetwork: this.state.network
              });
            }
          });

        }
      });

    });

  }


  deployContractWithConstructor() {

    this.setState({
      txnHash: null,
      contractAddress: null,
      deployedContract: null,
      contractNetwork: null
    }, () => {
      let contractJson = SimpleStorageInitContract;

      // get ABI
      let abi = contractJson.abi;
      let bytecode = contractJson.bytecode;
      let Contract  = this.state.web3.eth.contract(abi);

      this.state.web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.log(error);
          alert("Problem getting account info");
        } else {
          console.log(Contract)

          Contract.new(this.state.constructorValue, {from: accounts[0], data: bytecode}, (err, result) => {
            if (err) {
              console.log(err.message);
              alert("Problem deployig contract");
            } else {
              console.log(result);
              this.setState({
                txnHash: result.transactionHash,
                contractAddress: result.address,
                deployedContract: result,
                contractNetwork: this.state.network
              });
            }
          });

        }
      });

    });

  }

  getDeploymentSuccessView() {
    return (
      <div className="pure-u-1-1">
        <br />
        <br />
        {this.state.contractAddress && this.state.txnHash ? (<h2>Contract Deployed</h2>) : null}
        {!this.state.contractAddress && this.state.txnHash ? (<h2>Deploying Contract ......</h2>) : null}
        <br />
        {this.state.txnHash ? (
          <div className="pure-u-1-1">
            <b>Transaction Hash: </b>
            <p>{this.state.txnHash}</p>
          </div>
        ) : null}
        <br />
        {this.state.contractAddress ? (
          <div className="pure-u-1-1">
            <b>Contract Address: </b>
            <p><Link to={`/contract?${queryString.stringify({
                contractAddress: this.state.contractAddress,
                txnHash: this.state.txnHash,
                contractNetwork: this.state.contractNetwork
              })}`}>{this.state.contractAddress}</Link></p>
          </div>
        ) : null}
        <br />
        {this.state.contractNetwork && this.state.contractAddress ? (
          <div className="pure-u-1-1">
            <b>Contract Network: </b>
            <p>{this.state.contractNetwork}</p>
          </div>
        ) : null}
        <br />
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
              <p>Click the buttons below to deploy contract. Refresh page if you changed network or no current network displayed</p>
              <p><b>Current Network:</b> {this.state.network}</p>
              <br />
              <p><b>Contract without inital value</b></p>
              <form className="form-inline">

                <br />
                <button className="btn btn-primary my-2 my-sm-0" type="button" onClick={() => {
                    this.deploySimpleContract();
                  }}
                >
                Deploy Simple Contract
               </button>
             </form>
             <br />
             <br />
            </div>
            <div className="pure-u-1-1">
              <p><b>Contract with inital value</b></p>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="number" onChange={(e) => {
                    this.setState({
                      constructorValue: e.target.value
                    });
                  }}
                />
                <br />
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => {
                    if (this.state.constructorValue && this.state.constructorValue >= 0) {
                      this.deployContractWithConstructor();
                    } else {
                      alert("Enter a positive number")
                    }
                  }}
                >
                Deploy Contract with Constructor
                </button>
               </form>
              </div>
            <br />
            {this.state.contractAddress || this.state.txnHash ? this.getDeploymentSuccessView() : null}
          </div>
          <br />
          <br />
          <br />
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Networks ID Index</h2>
            </div>
            <br />
            <div className="pure-u-1-1">
              <p>Main Ethereum Network --> 1</p>
              <p>Ropsten Ethereum Network --> 3</p>
              <p>Kovan Ethereum Network --> 42</p>
              <p>Rinkeby Ethereum Network --> 4</p>
              <p>Private Network --> 5777</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
