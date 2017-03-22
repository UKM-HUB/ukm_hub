import React, { Component } from 'react'
import GMaps from '../../../public/assets/js/gmaps.min.js'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCompanyByCategoryGmaps, fetchProfile } from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
const compId = localStorage.getItem('companyId')

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
    let temp = []
    let pathTemp = []
    let otherCompanyIcon = 'https://s21.postimg.org/8hrapdesn/building.png'
    let companyIcon = 'https://s4.postimg.org/jlidgjun1/store.png'
    const that = this

      if (company.type === 'corporate') {
        companyIcon = 'https://s21.postimg.org/8hrapdesn/building.png',
        otherCompanyIcon = 'https://s4.postimg.org/jlidgjun1/store.png'
      }

      for (let i = 0; i < otherCompany.length; i++) {
        pathTemp[pathTemp.length] = [ company.location.lat, company.location.lng ]
        pathTemp[pathTemp.length] = [ otherCompany[i].location.lat, otherCompany[i].location.lng ]
      }

      for (let i = 0; i < otherCompany.length; i++) {
        let requestList = '';
        let categoryList = '';

        otherCompany[i].request.filter((x)=> x.open === true).map(function(data){
          return requestList +=
          '<li class="list-group-item"><button onclick="redirectToList()">' + data.title + '</button></li>'
        })

        otherCompany[i].category

        otherCompany[i].category.map(function(data,index){
          console.log(otherCompany[i].category.length);
          if(index === otherCompany[i].category.length-1) {
            categoryList +=
            '<em>' + data + '</em>'
          } else {
            categoryList +=
            '<em>' + data + ', </em>'
          }

        })

        temp[temp.length] =
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
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-offset-2 col-sm-8" style="text-align:center">
                  <div class="list-group">

                      <h4 class="list-group-item-heading" style='font-weight:900'>Description</h4>
                      <p class="list-group-item-text">${otherCompany[i].description}</p>

                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="list-group">
                    <div class='mapView'>
                      <h4 class="list-group-item-heading">Description</h4>
                      <p class="list-group-item-text">${otherCompany[i].description}</p>
                    </div>
                  </div>
                  <div class="list-group">
                    <div class='mapView'>
                      <h4 class="list-group-item-heading">Description</h4>
                      <p class="list-group-item-text">${otherCompany[i].description}</p>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="list-group">
                    <div class='mapView'>
                      <h4 class="list-group-item-heading">Description</h4>
                      <p class="list-group-item-text">${otherCompany[i].description}</p>
                    </div>
                  </div>
                  <div class="list-group">
                    <div class='mapView'>
                      <h4 class="list-group-item-heading">Description</h4>
                      <p class="list-group-item-text">${otherCompany[i].description}</p>
                    </div>
                  </div>
                </div>
                    ${ otherCompany[i].category.map(function(data){ return `${data}` }) }
                  </p>

                  <a href="${otherCompany[i].website}" target="_blank">${otherCompany[i].website}</a>

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
        details: company.name
      }])

      map.addMarkers(temp)

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

// <p><b>Request : </b>
//   <div class="card">
//     <ul class="list-group list-group-flush">
//       ${requestList}
//     </ul>
//   </div>
// </p>

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
