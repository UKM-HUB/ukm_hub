import React, { Component } from 'react'
import '../../App.css'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

export default class ListView extends Component {
  render () {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="main-panel">
          <Topbar />
        </div>
      </div>
    )
  }
}
