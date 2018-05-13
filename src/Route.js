import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './views/Home'
import SimpleStorage from './views/SimpleStorage'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/simpleStorage' component={SimpleStorage}/>
    </Switch>
  </main>
)

export default Main
