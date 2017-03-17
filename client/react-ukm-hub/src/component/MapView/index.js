import React, { Component } from 'react'
import '../../App.css'
import GMaps from '../../../public/assets/js/gmaps.min.js'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

export default class MapView extends Component {
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
        <Sidebar />
        <div className="main-panel">
          <Topbar />
          <div id="map" style={{width:'100%', height:'100%' }}></div>
        </div>
      </div>
    )
  }
}
