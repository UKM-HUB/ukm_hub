import React, { Component } from 'react'
import '../../App.css'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import ListOfRequest from './ListOfRequest'

export default class RequestList extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Request List',
      activeNavigation: ['','','','active']
    }
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
          <ListOfRequest />
        </div>
      </div>
    )
  }
}
