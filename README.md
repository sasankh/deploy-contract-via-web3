# deploy-contract-via-web3

## Deploy Simple storage contract using web3 via metamask to any network

### This is a simple example to show the code to deploy contract using web3 and metamask.
### The deployment contract presumes that the given contract JSON interface is in th build/contracts
-  'npm install'  
-  The JSON interfaces is already compiled but to compile 'truffle compile'  
-  (optional) Migrate the contract to the network 'truffle migrate'. This is for the Simple contract view in the browser. Not required if only deploying using browser.
-  'npm run start' . Will open the website in http://localhost:3000   
-  Choose the network in metamask. Also the account to use  
-  Click on  'Deploy Contract' in the menu  
-  To deploy a simple storage contract with out any constructor click "Deploy Simple Contract"  
-  To deploy simple storage contract with constructor value. Enter a value in the field (+ve number) and click "Deploy Contract with Constructor"  
-  Wait while the contract deploys. Contract address will appear once the contract is deployed.  
-  Click on the Contract address to interact with the deployed contract  
