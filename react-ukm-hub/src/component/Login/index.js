import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import logo from '../../../public/assets/logo/ukmhub.png'
import '../../../public/assets/js/login'
import '../../../public/assets/js/bootstrap-notify.js'
import { dispatchRegisterCompany, loginCompanyFetch } from '../../actions/index.js'
import $ from 'jquery'
import loginInfo from '../../../public/assets/js/loginMessageBox.js'

const emailRegex = /\S+@\S+\.\S+/

class Login extends Component {
  constructor(){
    super()
    this.state = {
      formTitle: 'Login Form',
      emailRegister: '',
      passwordRegister: '',
      emailLogin: '',
      passwordLogin: '',
      forgetPassword: ''
    }
  }

  registerClick = () => {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    $('#form_id').attr( "style", "max-width: 700px;" );
    this.setState({formTitle: 'Register Form'})
  }

  loginClick = () => {
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    $('#form_id').attr( "style", "max-width: 400px;" );
    this.setState({formTitle: 'Login Form'})
  }

  handleRegister = (e) => {
    if(!emailRegex.test(this.state.emailRegister)){
      e.preventDefault()
      loginInfo.showRegisterInvalid('top','center')
    } else if(this.state.passwordRegister.length <= 5){
      e.preventDefault()
      loginInfo.showPasswordInvalid('top','center')
    } else {
      this.props.dispatchRegisterCompany(this.state.emailRegister, this.state.passwordRegister)
      this.setState({
        emailRegister: '',
        passwordRegister: ''
      })
      setTimeout(function(){
        location.reload()
      }, 1000)
    }
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.props.loginCompanyFetch(this.state.emailLogin, this.state.passwordLogin)
    this.setState({
      emailLogin: '',
      passwordLogin: ''
    })
    setTimeout(function(){
      if(!localStorage.getItem('token')){
        loginInfo.showErrorLogin('top','center')
      } else {
        location.reload()
      }
    },500)
  }

  handleForgetPassword = (e) => {
    e.preventDefault()
    fetch('http://localhost:3001/api/company/resetPassword', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.forgetPassword
      })
    })
    .then(res => console.log(res))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    const buttonTextStyle = {
      fontSize: 16
    }
    return (
      <div style={{overflow:'hidden'}}>
        <div className="container">
          <div className="info">
            <h1>{this.state.formTitle}</h1>
            <span>Connecting and integrate corporate with small & medium companies to incorporate Indonesia. <br /><i className="fa fa-heart"></i><a href="https://github.com/UKM-HUB/ukm_hub">UKMHUB team</a></span>
          </div>
        </div>
        <div className="form" id="form_id" style={{maxWidth:400}}>
          <div className="thumbnail" style={{background: 'white'}}><img src={logo} alt='ukmhub logo' /></div>

          <form className="login-form">
            <input type="email" placeholder="Email" name="emailLogin" value={this.state.emailLogin} onChange={this.handleChange}/>
            <input type="password" placeholder="Password" name="passwordLogin" value={this.state.passwordLogin} onChange={this.handleChange}/>
              <Link to='/map'>
                <button onClick={this.handleLogin} style={buttonTextStyle}>Login</button>
              </Link>
            <p className="message">Not registered?
              <a href="#"
                onClick={this.registerClick}> Create an account
              </a>
            </p>
          </form>

          <div className="row">
            <div className="col-md-12">
              <form className="register-form">
                <p>Register your company to get started in connecting with other companies</p>
                <br />
                <input type="email" placeholder="Register your company email" name="emailRegister" value={this.state.emailRegister} onChange={this.handleChange}/>
                <input type="password" placeholder="Password" name="passwordRegister" value={this.state.passwordRegister} onChange={this.handleChange}/>
                  <Link to='/profile' >
                    <button style={buttonTextStyle} onClick={this.handleRegister}>Register</button>
                  </Link>
                <p className="message">Already registered? <a href="#" onClick={this.loginClick}>Sign In</a></p>
              </form>
            </div>
            <div className="col-md-offset-1 col-md-10">
              <form className="forget-password-form">
                <p className="message" data-toggle="collapse" data-target="#demo" style={{marginBottom:25,marginTop:3}}>Forget Password?<a href="#"> Click here</a></p>
                <div id="demo" className="collapse">
                  <input type="email" style={{padding:'10px 15px', marginBottom: 10}} placeholder="Input your company email" name="forgetPassword" value={this.state.forgetPassword} onChange={this.handleChange}/>
                    <button id='register' onClick={this.handleForgetPassword}>Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInCompany: state.loggedInCompany
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchRegisterCompany: (email, password) => dispatch(dispatchRegisterCompany(email, password)),
    loginCompanyFetch: (email,password) => dispatch(loginCompanyFetch(email,password))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
