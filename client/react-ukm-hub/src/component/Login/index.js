import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import logo from '../../../public/assets/logo/ukmhub.png'
import '../../../public/assets/js/login'
import {registerCompanyFetch,loginCompanyFetch} from '../../actions/index.js'
import $ from 'jquery'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      formTitle: 'Login Form',
      emailRegister:'',
      passwordRegister:'',
      emailLogin:'',
      passwordLogin:''
    }
  }


  componentDidMount(){
    $('.message a').click(function(){
       $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    });
  }

  handleRegister(){
    this.props.registerCompanyFetch(this.state.emailRegister,this.state.passwordRegister)
    this.setState({
      emailRegister: '',
      passwordRegister: ''
    })
  }

  handleLogin(){
    this.props.loginCompanyFetch(this.state.emailLogin,this.state.passwordLogin)
    this.setState({
      emailLogin: '',
      passwordLogin: ''
    })
  }

  handleChange(e){
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
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
            <input type="email" placeholder="Register your company email" name="emailRegister" value={this.state.emailRegister} onChange={this.handleChange.bind(this)}/>
            <input type="password" placeholder="Password" name="passwordRegister" value={this.state.passwordRegister} onChange={this.handleChange.bind(this)}/>
              <Link to='/profile' >
                <button style={buttonTextStyle} onClick={this.handleRegister.bind(this)} >Register</button>
              </Link>
            <p className="message">Already registered? <a href="#" onClick={() => {this.setState({formTitle: 'Login Form'})}}>Sign In</a></p>
          </form>
          <form className="login-form">
            <input type="email" placeholder="Email" name="emailLogin" value={this.state.emailLogin} onChange={this.handleChange.bind(this)}/>
            <input type="password" placeholder="Password" name="passwordLogin" value={this.state.passwordLogin} onChange={this.handleChange.bind(this)}/>
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

const mapDispatchToProp = (dispatch) => {
  return {
    registerCompanyFetch: (email,password) => dispatch(registerCompanyFetch(email,password)),
    loginCompanyFetch: (email,password) => dispatch(loginCompanyFetch(email,password))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(null,mapDispatchToProp)(Login)
