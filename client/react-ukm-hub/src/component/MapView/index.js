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
      companyLoginLat: 0,
      companyLoginLng: 0,
      corporateIcon: 'https://s21.postimg.org/8hrapdesn/building.png',
      ukmIcon: 'https://s4.postimg.org/jlidgjun1/store.png',
      dataMapCompany: []
    }
  }

  componentWillMount(){

    // for (var i = 0; i < array.length; i++) {
    //   array[i]
    // }

    this.setState({
      companyLoginLat: -6.260697,
      companyLoginLng: 106.781391,
      dataMapCompany: [
        {
          icon: this.state.ukmIcon,
          lat: -6.278097,
          lng: 106.781391,
          infoWindow: {
            content: `
            <div style='padding:25px'>
              <div class="row">
                <div class="col-sm-3">
                  <img
                    src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
                    style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
                  />
                </div>
                <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
                  <h3><b>UKM KEYBOARD</b></h3>
                  <p><b>Alamat : </b>Jl. Pondok Indah Mall 2</p>
                  <p><b>Telepon : </b>+6283124512523</p>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-sm-12">
                  <p><b>Detail : </b></p>
                  <p>Jalan maju bersama merupakan ukm yang bergelut di bidang kain</p>
                  <p><b>Category : </b>Pakaian, Kecantikan</p>

                  <p><b>Request : </b>
                    <div class="card">
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item"><a href="https://www.google.com">Request 1<a></li>
                        <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
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
          icon: this.state.ukmIcon,
          lat: -6.270697,
          lng: 106.791391,
          infoWindow: {
            content: `
              <div style='padding:25px'>
                <div class="row">
                  <div class="col-sm-3">
                    <img
                      src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
                      style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
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
                          <li class="list-group-item"><a href="https://www.google.com">Request 1<a></li>
                          <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
                          <li class="list-group-item"><a href="https://www.google.com">Request 3</a></li>
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
          icon: this.state.ukmIcon,
          lat: 1.106431,
          lng: 104.024560,
          infoWindow: {
            content: `
              <div style='padding:25px'>
                <div class="row">
                  <div class="col-sm-3">
                    <img
                      src='http://s-yoolk-images.s3.amazonaws.com/id/gallery_images/medium/1435984612/1572891?1435984612'
                      style="width: 118px; height:100px; border-radius: 5px; filter:grayscale(0.3) opacity(0.9)"
                    />
                  </div>
                  <div class="col-sm-9" style="margin-top: -20px; padding-left:30px">
                    <h3><b>UKM TIMO</b></h3>
                    <p><b>Alamat : </b>Jl. Batam 1</p>
                    <p><b>Telepon : </b>+6283803242352</p>
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-sm-12">
                    <p><b>Detail : </b></p>
                    <p>Jalan maju bersama merupakan ukm yang bergelut di bidang pangan</p>
                    <p><b>Category : </b>Ikan, Sambal</p>

                    <p><b>Request : </b>
                      <div class="card">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><a href="https://www.google.com">Request 1<a></li>
                          <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
                          <li class="list-group-item"><a href="https://www.google.com">Request 3</a></li>
                          <li class="list-group-item"><a href="https://www.google.com">Request 2</a></li>
                          <li class="list-group-item"><a href="https://www.google.com">Request 3</a></li>
                        </ul>
                      </div>
                    </p>
                    <a href="https://www.google.com" target="_blank">Website link</a>
                  </div>
                </div>
              </div>
            `
          }
        }
      ]
    })
  }



  componentWillReceiveProps(){
    console.log(this.props.otherCompany, this.props.profile);
  }

  componentDidMount () {
    const that = this

    this.props.fetchCompanyByCategory(compId)
    this.props.fetchProfile(compId)

    var map = new GMaps({
      el: '#map',
      lat: this.state.companyLoginLat,
      lng: this.state.companyLoginLng
    });

    // add login marker, on maps(it maybe corporate or ukm)
    map.addMarkers([{
      title: 'PT. Maju Jaya',
      icon: this.state.corporateIcon,
      lat: this.state.companyLoginLat,
      lng: this.state.companyLoginLng,
      details: 'ukm keyboard'
    }])

    // add company markers on maps (it maybe corporate or ukm)

    const renderedDataMapCompany = this.state.dataMapCompany
    // 1. Bikin infoWindowArr = []
    /* 2.
      loop this.props.otherCompanies, push infoWindowArr sesuai dengan isi yang dinamis
      contoh: infoWindowArr = [
        { content: `... ${...}` },
        { content: `...` },
        { content: `...` },
      ]
    */
    /* 3.
      renderedDataMapCompany = this.props.dataMapCompany.map( (companyData, index) =>
        Object.assign({}, companyData, { infoWindow: infoWindowArr[index] } );
        );
      */
      map.addMarkers(renderedDataMapCompany)

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
    console.log(this.props.otherCompany, this.props.profile);
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

const mapStateToProp = (state) => {
  return {
    profile : state.profiles,
    otherCompany: state.companyByCategory
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    fetchCompanyByCategory: (id) => dispatch(fetchCompanyByCategory(id))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(mapStateToProp,mapDispatchToProp)(MapView)
