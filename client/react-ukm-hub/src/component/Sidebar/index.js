import React, { Component } from 'react'
import logo from '../../../public/assets/logo/ukmhub_sidebar.png'
import { Link } from 'react-router-dom'

class Sidebar extends Component {

  render(){
    return (
      <div className="sidebar">
      	<div className="sidebar-wrapper" style={{background:'rgb(125,125,125)'}}>
          <div className="logo" style={{textAlign:'center'}}>
            <Link to='/map'>

                <img src={logo} style={{width:'75%', padding:'1px 15px'}} alt='ukmhub logo'></img>

            </Link>
          </div>

          <ul className="nav">
  					<li className={this.props.activeNavigation[0]}>
              <Link to='/map'>
                <i className="pe-7s-map-marker"></i>
                <p>Map View</p>
              </Link>
  					</li>

            <li className={this.props.activeNavigation[1]}>
              <Link to='/list'>
                <i className="pe-7s-menu"></i>
                <p>List View</p>
              </Link>
            </li>
          </ul>
      	</div>
      </div>
    )
  }
}

export default Sidebar
