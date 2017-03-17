import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MapView from './component/MapView'
import ListView from './component/ListView'

const App = () => (
  <Router>
    <div>
      <Route exact path='/map' component={MapView} />
      <Route exact path='/list' component={ListView} />
    </div>
  </Router>
)

export default App;
