import React, { Component } from 'react'
import '../../App.css'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import CompanyList from './CompanyList'

export default class ListView extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'List View',
      activeNavigation: ['','active']
    }
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel" style={{overflow:'hidden'}}>
          <Topbar title={this.state.topbarTitle} />
          <CompanyList />
        </div>
      </div>
    )
  }
}
