import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

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
import RequestList from './component/RequestList'
import CreateRequest from './component/CreateRequest'
import Message from './component/Message'
import Login from './component/Login'
import Profile from './component/Profile'

const profile= ()=>{
  var key = localStorage.getItem('token')
  console.log('masuk');
  // if(key !== null){
  //   alert('sukses')
  // }
  // else{
  //   alert('gagal')
  // }
}
var key = localStorage.getItem('token')
function authen(){
  if(key!==null){
    return true
  }
  else{
    return false
  }
}

const auth = {
  isAuthenticated: authen(),
  authenticate(cb) {
    if(key !== null){
      this.isAuthenticated = true
    }

    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/',

      }}/>
    )
  )}/>
)

const AuthRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    !auth.isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/map',

      }}/>
    )
  )}/>
)

const App = () => (
  <Router>
    <div>
      <PrivateRoute exact path='/map' component={MapView} />
      <PrivateRoute exact path='/list' component={ListView} />
      <PrivateRoute exact path='/create-request' component={CreateRequest} />
      <PrivateRoute exact path='/request-list' component={RequestList} />
      <PrivateRoute exact path='/message' component={Message} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <AuthRoute exact path='/' component={Login}  />
    </div>
  </Router>
)

export default App;
