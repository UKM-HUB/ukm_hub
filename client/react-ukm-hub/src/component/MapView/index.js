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
      activeNavigation: ['active',''],
      dataMapCompany: [
        {
          title: 'UKM KEYBOARD',
          icon: 'https://s3.postimg.org/qvdmxhhcj/store.png',
          lat: -6.260697,
          lng: 106.781391,
          details: 'ukm keyboard',
          mouseover: function(e){
            alert('hallo')
          },
          infoWindow: {
            content: `
            <div class='ukmtooltip'>
              <img src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612' />
              <h3 class='ukmtooltip'>
                UKM KEYBOARD
              </h3>
              <p>UKM : we are offering service sell keyboard</p>
              <a href='https://www.google.com'>See More...</a>
            </div>`
            }
        },
        {
          icon: 'https://s3.postimg.org/qvdmxhhcj/store.png',
          lat: -6.270697,
          lng: 106.781391,
          infoWindow: {
            content: `
            <div class='ukmtooltip'>
              <img src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612' />
              <h3 class='ukmtooltip'>
                UKM MOUSE
              </h3>
              <p>UKM : we are offering service sell mouse</p>
              <a href='https://www.google.com'>See More...</a>
            </div>`
            }
        }
      ]
    }
  }

  componentDidMount () {
    var map = new GMaps({
      el: '#map',
      lat: -6.260697,
      lng: 106.781391
    });

    // data ukm filled here , data must be array of object
    map.addMarkers(this.state.dataMapCompany)
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel" style={{overflow:'hidden'}}>
          <Topbar title={this.state.topbarTitle} />
          <div id="map" style={{width:'100%', height:'100%' }}></div>
        </div>
      </div>
    )
  }
}
