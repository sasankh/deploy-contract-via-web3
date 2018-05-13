import React, { Component } from 'react'
import * as queryString from 'query-string'
import SimpleStorageContract from '../../build/contracts/SimpleStorage.json'
import getWeb3 from '../utils/getWeb3'

import '../css/oswald.css'
import '../css/open-sans.css'
import '../css/pure-min.css'
//import '../App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      network: null,
      txnHash: null,
      contractAddress: null,
      contractNetwork: null,
      storageValue: 0,
      inputValue: 0
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    let queries = queryString.parse(location.search);
    console.log(queries)

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3,
        network: results.web3.currentProvider.publicConfigStore._state.networkVersion,
        contractAddress: queries.contractAddress,
        txnHash: queries.txnHash,
        contractNetwork: queries.contractNetwork,
      }, () => {

      });
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract(value) {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        console.log("new value", value)
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(value, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        console.log("result", result)
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  getCurrentValue(value) {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {

      simpleStorage.deployed().then((instance) => {

        simpleStorageInstance = instance

        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Smart Contract Interaction</h2>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
            <br />
            <div className="pure-u-1-1">
              <p>Enter new value below</p>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="number" onChange={(e) => {
                    this.setState({
                      inputValue: e.target.value
                    });
                  }}
                />
                <br />
                <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => {
                    this.instantiateContract(this.state.inputValue);
                  }}
                >
                Set Value
               </button>
             </form>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h2>Contract And Network Information</h2>
            </div>
            <br />
            <div className="pure-u-1-1">
              <p>Contract Address --> {this.state.contractAddress}</p>
              <p>Contract TxnHash --> {this.state.txnHash}</p>
              <p>Contract Network --> {this.state.contractNetwork}</p>
              <p><b>Current Network --> </b> {this.state.network}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
