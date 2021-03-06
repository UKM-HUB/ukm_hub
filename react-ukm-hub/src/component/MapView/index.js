import React, { Component } from 'react'
import GMaps from '../../../public/assets/js/gmaps.min.js'
import {connect} from 'react-redux'
import { fetchCompanyByCategoryGmaps, fetchProfile } from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import corporateIcon from '../../../public/assets/icon/corporate_small.png'
import ukmIcon from '../../../public/assets/icon/ukm_small.png'
const compId = localStorage.getItem('companyId')

import mapInfo from '../../../public/assets/js/mapViewMessageBox.js'

class MapView extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Map View',
      activeNavigation: ['active', '', '', '', ''],
      dataMapCompany: []
    }
  }

  createGmapsMarkers(otherCompany, company){
    let otherCompanyMarker = []
    let pathTemp = []
    let otherCompanyIcon = corporateIcon
    let companyIcon = ukmIcon

      if (company.type === 'corporate') {
        companyIcon = corporateIcon
        otherCompanyIcon = ukmIcon
      }

      for (let i = 0; i < otherCompany.length; i++) {
        pathTemp[pathTemp.length] = [ company.location.lat, company.location.lng ]
        pathTemp[pathTemp.length] = [ otherCompany[i].location.lat, otherCompany[i].location.lng ]
      }

      for (let i = 0; i < otherCompany.length; i++) {
        let requestList = '';
        let categoryList = '';
        let website = ''

        otherCompany[i].request.filter((x)=> x.open === true).map(function(data){
          return requestList +=
          '<li style="font-size:16px"><a href="/request-list" style="color: rgb(30, 30, 30); font-size: 15px; text-decoration: underline;">' + data.title + '</a></li>'
        })
        let requestEmpty = otherCompany[i].request.filter((x)=> x.open === true)

        if(requestEmpty.length === 0) {
          requestList +=
          '<li style="font-size:16px">No request list</li>'
        }

        if (otherCompany[i].website === '') {
          website = "<span>No Website</span>"
        } else {
          website = `<a href=${otherCompany[i].website} target="_blank">${otherCompany[i].website}</a>`
        }

        otherCompany[i].category.map(function(data,index){
          if(index === otherCompany[i].category.length-1) {
            return categoryList +=
            '<em>' + data + '</em>'
          } else {
            return categoryList +=
            '<em>' + data + ', </em>'
          }

        })

        otherCompanyMarker[otherCompanyMarker.length] =
        {
          title: otherCompany[i].name,
          icon: otherCompanyIcon,
          lat: otherCompany[i].location.lat,
          lng: otherCompany[i].location.lng,
          infoWindow: {
            content:
            `
            <div style='padding:25px'>
              <div class="row">
                <div class="col-sm-3">
                  <img
                    src=${otherCompany[i].images}
                    style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
                  />
                </div>
                <div class="col-sm-9" style="margin-top: -20px; padding-left:50px">
                  <h2><b>${otherCompany[i].name}</b></h2>
                  <p><b>Address : </b>${otherCompany[i].address}</p>
                  <p><b>Phone : </b>${otherCompany[i].phone}</p>
                  <p><b>Category : </b>${categoryList}</p>
                  <p><b>Website : </b>${website}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-12" style="text-align:left">
                  <div class="list-group">
                    <div class='mapView'>
                      <h4 class="list-group-item-heading" style='font-weight:600; margin-bottom:10px;'>Description</h4>
                      <p class="list-group-item-text">${otherCompany[i].description}</p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="list-group">
                    <div class='mapView'>
                      <h4 class="list-group-item-heading" style='font-weight:600; margin-bottom:10px;'>Request</h4>
                      <ul style="padding-left: 16px; list-style-type: square;">
                        ${requestList}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
          }
        }
      }

      var map = new GMaps({
        el: '#map',
        lat: company.location.lat,
        lng: company.location.lng,
        zoom: 10
      });

      map.addMarkers([{
        title: company.name,
        icon: companyIcon,
        lat: company.location.lat,
        lng: company.location.lng,
        details: company.name,
        click: function(){
          mapInfo.showCompanyMessage('top','center')
        }
      }])

      map.addMarkers(otherCompanyMarker)

      map.drawPolyline({
        path: pathTemp,
        strokeColor: 'rgba(100,100,100,0.8)',
        strokeOpacity: 0.5,
        strokeWeight: 5
      });

  }

  componentDidMount () {
    this.props.fetchCompanyByCategoryGmaps(compId, this.createGmapsMarkers)
    this.props.fetchProfile(compId)
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

const mapStateToProps = (state) => {
  return {
    profile : state.profile,
    otherCompany: state.companyByCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    fetchCompanyByCategoryGmaps: (id, cb) => dispatch(fetchCompanyByCategoryGmaps(id, cb))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView)
