import React, { Component } from 'react'
import '../../App.css'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import BuyList from './BuyList'

export default class ListBuyRequest extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Buy Request',
      activeNavigation: ['','','active','']
    }
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel" style={{overflow:'hidden'}}>
          <Topbar title={this.state.topbarTitle} />
          <BuyList />
        </div>
      </div>
    )
  }
}
