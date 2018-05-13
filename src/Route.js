import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './views/Home'
import SimpleStorage from './views/SimpleStorage'
import DeployStorageContract from './views/DeployStorageContract'
import WebDeployContractInteract from './views/WebDeployContractInteract'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/simpleStorage' component={SimpleStorage}/>
      <Route path='/deployStorageContract' component={DeployStorageContract}/>
      <Route path='/contract' component={WebDeployContractInteract}/>
    </Switch>
  </main>
)

export default Main
