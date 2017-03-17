import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MapView from './component/MapView'
import ListView from './component/ListView'
import Login from './component/Login'

const App = () => (
  <Router>
    <div>
      <Route exact path='/map' component={MapView} />
      <Route exact path='/list' component={ListView} />
      <Route exact path='/' component={Login} />
    </div>
  </Router>
)

export default App;
