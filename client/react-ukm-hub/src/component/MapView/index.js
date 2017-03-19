import React, { Component } from 'react'
import GMaps from '../../../public/assets/js/gmaps.min.js'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

export default class MapView extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Map View',
      activeNavigation: ['active',''],
      companyLoginLat: 0,
      companyLoginLng: 0,
      dataMapCompany: []
    }
  }

  componentWillMount(){
    this.setState({
      companyLoginLat: -6.260697,
      companyLoginLng: 106.781391,
      dataMapCompany: [
        {
          title: 'UKM KEYBOARD',
          icon: 'https://s4.postimg.org/jlidgjun1/store.png',
          lat: -6.278097,
          lng: 106.781391,
          details: 'ukm keyboard',
          infoWindow: {
            content: `
            <div>
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
          icon: 'https://s4.postimg.org/jlidgjun1/store.png',
          lat: -6.270697,
          lng: 106.791391,
          infoWindow: {
            content: `
              <div style='padding:25px'>
                <div class="row">
                  <div class="col-sm-3">
                    <img
                      src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
                      style="width: 118px; height:100px; border-radius: 10px"
                    />
                  </div>
                  <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
                    <h3><b>UKM Jalan Maju Bersama</b></h3>
                    <p><b>Alamat : </b>Jl. Pondok Indah Mall</p>
                    <p><b>Telepon : </b>+6283806781188</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-12">
                    <p><b>Detail : </b></p>
                    <p>Jalan maju bersama merupakan ukm yang bergelut di bidang pangan</p>
                    <p><b>Category : </b>Pakaian, Kecantikan</p>

                    <p><b>Request : </b>
                      <div class="card">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item">Request 1</li>
                          <li class="list-group-item">Request 2</li>
                          <li class="list-group-item">Request 3</li>
                        </ul>
                      </div>
                    </p>
                    <a href="https://www.google.com" target="_blank">Website link</a>
                  </div>
                </div>
              </div>
            `
          }
        },
        {
          icon: 'https://s4.postimg.org/jlidgjun1/store.png',
          lat: 1.106431,
          lng: 104.024560,
          infoWindow: {
            content: `
            <div>
              <img
                src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
                style="width: 100px; height:100px; float: left"
              />
            <div>
              <h3 style="padding-left: 50px">
                UKM MOUSE
              </h3>
              <p>UKM : we are offering service sell mouse</p>
              <a href='https://www.google.com'>See More...</a>
            </div>

            </div>`
          }
        }
      ]
    })
  }

  componentDidMount () {
    // create obj map to display map window
    var map = new GMaps({
      el: '#map',
      lat: this.state.companyLoginLat,
      lng: this.state.companyLoginLng
    });

    // add company marker who login on maps(it maybe corporate or ukm)
    map.addMarkers([{
      title: 'PT. Maju Jaya',
      icon: 'https://s21.postimg.org/8hrapdesn/building.png',
      lat: this.state.companyLoginLat,
      lng: this.state.companyLoginLng,
      details: 'ukm keyboard'
    }])

    // add company markers on maps (it maybe corporate or ukm)
    map.addMarkers(this.state.dataMapCompany)

    // add network line to map
    var path = [
      [this.state.companyLoginLat, this.state.companyLoginLng],
      [-6.278097, 106.781391],
      [this.state.companyLoginLat, this.state.companyLoginLng],
      [-6.270697, 106.791391],
      [this.state.companyLoginLat, this.state.companyLoginLng],
      [1.106431, 104.024560]
    ]

    map.drawPolyline({
      path: path,
      strokeColor: 'rgba(100,100,100,0.8)',
      strokeOpacity: 0.5,
      strokeWeight: 5
    });

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
