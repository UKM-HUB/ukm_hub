import React, { Component } from 'react'
import '../../App.css'
import GMaps from '../../../public/assets/js/gmaps.min.js'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

export default class MapView extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Map View',
      activeNavigation: ['active','']
    }
  }

  componentDidMount () {
    new GMaps({
      el: '#map',
      lat: -12.043333,
      lng: -77.028333
    });
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
          <div id="map" style={{width:'100%', height:'100%' }}></div>
        </div>
      </div>
    )
  }
}
