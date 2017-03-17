import React, { Component } from 'react'
import logo from '../../../public/assets/logo/ukmhub.png'

export default class Login extends Component {
  render () {
    return (
      <div>
        <div className="container">
          <div className="info">
            <h1>Login Form</h1>
          </div>
        </div>
        <div className="form">
          <div className="thumbnail" style={{background: 'white'}}><img src={logo} alt='ukmhub logo' /></div>

          <form className="register-form">
            <input type="text" placeholder="name"/>
            <input type="password" placeholder="password"/>
            <input type="text" placeholder="email address"/>
            <button>create</button>
            <p className="message">Already registered? <a href="#">Sign In</a></p>
          </form>
          <form className="login-form">
            <input type="text" placeholder="username"/>
            <input type="password" placeholder="password"/>
            <button>login</button>
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
    )
  }
}
