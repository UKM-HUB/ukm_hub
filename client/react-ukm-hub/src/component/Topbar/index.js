import React from 'react'
import { Link } from 'react-router-dom'

const Topbar = (props) => {
  const logoutTextStyle = {
    height: 40,
    paddingLeft: 15,
    color: 'rgb(30,30,30)',
    paddingTop:10
  }
  const marginTop = {
    marginTop: 5
  }
  return (
    <nav className="navbar navbar-default navbar-fixed">
      <div className="container-fluid" style={{height:70}}>
        <div className="navbar-header" style={marginTop}>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">{props.title}</a>
        </div>
        <div className="collapse navbar-collapse" style={marginTop}>
          <ul className="nav navbar-nav navbar-left">
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li style={{margin:'15px 60px'}}>
                <h4 style={{display: 'inline', fontSize:20}}>Server Time : </h4><span style={{marginLeft:15, position:'relative', bottom:2, fontFamily:'peddana', fontSize: 24}} id="clockbox"></span>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <p>PT. MAJU MUNDUR<b className="caret"></b></p>
              </a>
              <ul className="dropdown-menu" style={{width:200}}>
                  <Link to='/profile'>
                    <li style={logoutTextStyle}><span className='fa fa-institution' style={{marginRight:10}}></span> Company Profile</li>
                  </Link>
                <li className="divider"></li>
                  <Link to='/'>
                    <li style={logoutTextStyle}><span className='fa fa-sign-out' style={{marginRight:10}}></span>Log Out</li>
                  </Link>
              </ul>
            </li>
            <li className="separator hidden-lg hidden-md"></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Topbar
