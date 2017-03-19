import React, { Component } from 'react'
import logo from '../../../public/assets/logo/ukmhub_sidebar.png'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  constructor(){
    super()
    this.state = {
      CompanyType: 'ukm'
    }
  }

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
                <i className="pe-7s-share"></i>
                <p>Map View</p>
              </Link>
  					</li>

            <li className={this.props.activeNavigation[1]} style={{marginBottom: 20}}>
              <Link to='/list'>
                <i className="pe-7s-menu"></i>
                <p>List View</p>
              </Link>
            </li>

            {
              ( this.state.CompanyType === 'corporate' ) ?

                <div>
                  <li className={this.props.activeNavigation[2]} style={{borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop: 8}}>
                    <Link to='/create-request' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-note"></i>
                      <p>Create Request</p>
                    </Link>
                  </li>

                  <li className={this.props.activeNavigation[3]} style={{marginBottom: 20, borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom: 20}}>
                    <Link to='/request-list' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-notebook"></i>
                      <p>List of Sell Request</p>
                    </Link>
                  </li>
                </div>
              :
                <div>
                  <li className={this.props.activeNavigation[2]} style={{borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop: 8}}>
                    <Link to='/create-request' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-note"></i>
                      <p>Create Request</p>
                    </Link>
                  </li>

                  <li className={this.props.activeNavigation[3]} style={{marginBottom: 20, borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom: 20}}>
                    <Link to='/request-list' style={{padding:'10px 15px'}}>
                      <i className="pe-7s-notebook"></i>
                      <p>Corporate Request List</p>
                    </Link>
                  </li>
                </div>
            }

            <li className={this.props.activeNavigation[4]}>
              <Link to='/message'>
                <i className="pe-7s-comment"></i>
                <p>Message</p>
              </Link>
            </li>

          </ul>
      	</div>
      </div>
    )
  }
}

export default Sidebar
