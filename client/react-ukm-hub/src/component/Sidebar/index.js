import React from 'react'
import logo from '../../../public/assets/logo/ukmhub.png'

const Sidebar = () => {
  return (
    <div className="sidebar" data-color="black">
    	<div className="sidebar-wrapper">
        <div className="logo">
          <a href="https://github.com/UKM-HUB/ukm_hub" className="simple-text">
            <img src={logo} style={{width:'100%'}} alt='ukmhub logo'></img>
          </a>
        </div>

        <ul className="nav">
					<li className="active">
							<a href="maps.html">
								<i className="pe-7s-map-marker"></i>
								<p>Map View</p>
							</a>
					</li>
          <li>
            <a href="user.html">
                <i className="pe-7s-menu"></i>
                <p>List View</p>
            </a>
          </li>
        </ul>
    	</div>
    </div>
  )
}

export default Sidebar
