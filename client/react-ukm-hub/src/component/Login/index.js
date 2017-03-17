import React, { Component } from 'react'
import logo from '../../../public/assets/logo/ukmhub.png'
import '../../../public/assets/js/login'
import $ from 'jquery'

export default class Login extends Component {
  constructor(){
    super()
    this.state = {
      formTitle: 'Login Form'
    }
  }

  componentDidMount(){
    $('.message a').click(function(){
       $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
  }

  render () {
    return (
      <div>
        <div className="container">
          <div className="info">
            <h1>{this.state.formTitle}</h1>
          </div>
        </div>
        <div className="form">
          <div className="thumbnail" style={{background: 'white'}}><img src={logo} alt='ukmhub logo' /></div>

          <form className="register-form">
            <input type="email" name="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <button>Register</button>
            <p className="message">Already registered? <a href="#" onClick={() => {this.setState({formTitle: 'Login Form'})}}>Sign In</a></p>
          </form>
          <form className="login-form">
            <input type="email" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <button>Login</button>
            <p className="message">Not registered?
              <a href="#"
                onClick={() => {this.setState({formTitle: 'Register Form'})}}>Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
