import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
    const buttonTextStyle = {
      fontSize: 18
    }
    return (
      <div style={{overflow:'hidden'}}>
        <div className="container">
          <div className="info">
            <h1>{this.state.formTitle}</h1>
            <span>Connecting and integrate corporate with small & medium companies to incorporate Indonesia. <br /><i className="fa fa-heart"></i><a href="https://github.com/UKM-HUB/ukm_hub">UKMHUB team</a></span>
          </div>
        </div>
        <div className="form">
          <div className="thumbnail" style={{background: 'white'}}><img src={logo} alt='ukmhub logo' /></div>

          <form className="register-form">
            <p>Register your company to get started in connecting with other companies</p>
            <br />
            <input type="email" placeholder="Register your company email"/>
            <input type="password" placeholder="Password"/>
              <Link to='/map'>
                <button style={buttonTextStyle}>Register</button>
              </Link>
            <p className="message">Already registered? <a href="#" onClick={() => {this.setState({formTitle: 'Login Form'})}}>Sign In</a></p>
          </form>
          <form className="login-form">
            <input type="email" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
              <Link to='/map'>
                <button style={buttonTextStyle}>Login</button>
              </Link>
            <p className="message">Not registered?
              <a href="#"
                onClick={() => {this.setState({formTitle: 'Register Form'})}}> Create an account
              </a>
            </p>
          </form>
        </div>
      </div>
    )
  }
}
