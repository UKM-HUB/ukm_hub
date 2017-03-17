import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Import all CSS files from public assets
import '../public/assets/css/login.css'
import '../public/assets/css/animate.min.css'
import '../public/assets/css/light-bootstrap-dashboard.css'
import '../public/assets/css/font-awesome.min.css'
import '../public/assets/css/fonts.css'
import '../public/assets/css/pe-icon-7-stroke.css'

// Import all JS files from public assets
import '../public/assets/js/bootstrap.min.js'

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
