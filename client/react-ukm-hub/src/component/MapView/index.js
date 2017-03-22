import React, { Component } from 'react'
import GMaps from '../../../public/assets/js/gmaps.min.js'
import {connect} from 'react-redux'
import {fetchCompanyByCategory, fetchProfile} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
const compId = localStorage.getItem('companyId')

class MapView extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Map View',
      activeNavigation: ['active', '', '', '', ''],
      companyIcon: 'https://s4.postimg.org/jlidgjun1/store.png',
      otherCompanyIcon: 'https://s21.postimg.org/8hrapdesn/building.png',
      dataMapCompany: []
    }
  }

  componentWillReceiveProps(){
    var temp = []
    var pathTemp = []
    const that = this
    // if(this.props.profile.category)

    setTimeout(function(){
      if (that.props.profile.type === 'corporate') {
        that.setState({
          companyIcon: 'https://s21.postimg.org/8hrapdesn/building.png',
          otherCompanyIcon: 'https://s4.postimg.org/jlidgjun1/store.png'
        })
      }

      for (let i = 0; i < that.props.otherCompany.length; i++) {
        pathTemp[pathTemp.length] = [ that.props.profile.location.lat, that.props.profile.location.lng ]
        pathTemp[pathTemp.length] = [ that.props.otherCompany[i].location.lat, that.props.otherCompany[i].location.lng ]
      }

      for (let i = 0; i < that.props.otherCompany.length; i++) {
        let requestList = '';
        that.props.otherCompany[i].request.map(function(data){
          return requestList +=
          '<li class="list-group-item"><a href="https://www.google.com">' + data.title + '</a></li>'
        })

        temp[temp.length] =
        {
          title: that.props.otherCompany[i].name,
          icon: that.state.otherCompanyIcon,
          lat: that.props.otherCompany[i].location.lat,
          lng: that.props.otherCompany[i].location.lng,
          infoWindow: {
            content:
            `
            <div style='padding:25px'>
              <div class="row">
                <div class="col-sm-3">
                  <img
                    src=${that.props.otherCompany[i].images}
                    style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
                  />
                </div>
                <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
                  <h3><b>${that.props.otherCompany[i].name}</b></h3>
                  <p><b>Alamat : </b>${that.props.otherCompany[i].address}</p>
                  <p><b>Telepon : </b>${that.props.otherCompany[i].phone}</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-12">
                  <p><b>Detail : </b></p>
                  <p>${that.props.otherCompany[i].description}</p>
                  <p><b>Category : </b>
                    ${ that.props.otherCompany[i].category.map(function(data){ return `${data}` }) }
                  </p>
                  <p><b>Request : </b>
                    <div class="card">
                      <ul class="list-group list-group-flush">
                        ${requestList}
                      </ul>
                    </div>
                  </p>
                  <a href="https://www.google.com" target="_blank">${that.props.otherCompany[i].website}</a>
                </div>
              </div>
            </div>
            `
          }
        }
      }
    }, 1500)


    setTimeout(function(){
      var map = new GMaps({
        el: '#map',
        lat: that.props.profile.location.lat,
        lng: that.props.profile.location.lng,
        zoom: 10
      });

      // add login marker, on maps(it maybe corporate or ukm)

      map.addMarkers([{
        title: that.props.profile.name,
        icon: that.state.companyIcon,
        lat: that.props.profile.location.lat,
        lng: that.props.profile.location.lng,
        details: that.props.profile.name
      }])


      map.addMarkers(temp)


      map.drawPolyline({
        path: pathTemp,
        strokeColor: 'rgba(100,100,100,0.8)',
        strokeOpacity: 0.5,
        strokeWeight: 5
      });
    },2000)
    // console.log(this.props.otherCompany, this.props.profile);
  }

  componentDidMount () {
    this.props.fetchCompanyByCategory(compId)
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
    fetchCompanyByCategory: (id) => dispatch(fetchCompanyByCategory(id))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MapView)
