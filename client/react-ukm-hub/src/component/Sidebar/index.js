import React, { Component } from 'react'
import logo from '../../../public/assets/logo/ukmhub.png'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  constructor(props){
    console.log(props);
    super(props)
  }
  render(){
    return (
      <div className="sidebar" data-color="black">
      	<div className="sidebar-wrapper">
          <div className="logo">
            <a href="https://github.com/UKM-HUB/ukm_hub" className="simple-text">
              <img src={logo} style={{width:'100%'}} alt='ukmhub logo'></img>
            </a>
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
