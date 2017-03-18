import React, { Component } from 'react'
import $ from 'jquery'
import GMaps from '../../../public/assets/js/gmaps.min.js'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

export default class Profile extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Company Profile',
      activeNavigation: ['',''],
      disableForm: 'disabled',
      profileTitle: 'Profile',
      updateButtonDisplay: 'inline-block',
      submitUpdateButtonDisplay: 'none',
      name: '',
      type: ''
    }
  }

  componentDidMount(){
    var lat = '-12.043333'
    var lng = '-77.028333'
    var editlat = ''
    var editlng = ''

    var updateMap = new GMaps({
      el: '#map',
      lat: lat,
      lng: lng
    });

    updateMap.addMarker({
      lat: lat,
      lng: lng,
      click: function(e) {
        alert('You clicked in this marker');
      }
    });

    GMaps.on('click', updateMap.map, function(event) {
       alert('Cannot Update Profile')
     })
  }

  componentDidUpdate(){
    var lat = '-12.043333'
    var lng = '-77.028333'
    var editlat = ''
    var editlng = ''

    var updateMap = new GMaps({
      el: '#map',
      lat: lat,
      lng: lng
    });

    updateMap.addMarker({
      lat: lat,
      lng: lng,
      click: function(e) {
        alert('You clicked in this marker');
      }
    });

    if(this.state.disableForm === 'disabled') {
      GMaps.on('click', updateMap.map, function(event) {
         alert('Cannot Update Profile')
       })
    } else {
      GMaps.on('click', updateMap.map, function(event) {
         var index = updateMap.markers.length;
         editlat = event.latLng.lat();
         editlng = event.latLng.lng();
         console.log(editlat, editlng);
         updateMap.removeMarkers()
         updateMap.addMarker({
           lat: editlat,
           lng: editlng,
           infoWindow: {
             content: '<p>Your company location</p>'
           }
         });
       })
    }
  }

  onChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  onChangeType(e){
    this.setState({
      type: e.target.value
    })
  }

  render(){
    const checkboxStyle = {
      marginRight: 20,
      cursor: 'pointer'
    }
    console.log($('#tes').serialize().split('='));
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-8">
                  <div className="card">
                    <div className="header">
                      <h4 className="title">{this.state.profileTitle}</h4>
                    </div>
                    <div className="content">
                      <form id="tes">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label>Company Name</label>
                              <input type="text" className="form-control" style={{cursor:'pointer'}} disabled={this.state.disableForm}
                                value={this.state.name}
                                placeholder="Company"
                                onChange={this.onChangeName.bind(this)}
                              />
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <label>Type</label>
                                <select className="form-control" style={{cursor:'pointer'}} disabled={this.state.disableForm} onChange={this.onChangeType.bind(this)}>
                                <option value='ukm'>UKM</option>
                                <option value='corporate'>Corporate</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Email</label>
                              <input type="email" className="form-control" style={{cursor:'pointer'}} onClick={ () => this.setState({disableForm:''}) } disabled={this.state.disableForm} value="maju_mundur@gmail.com" placeholder="Company email" />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Category</label>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="fashion" style={checkboxStyle} disabled={this.state.disableForm} />Fashion</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="food" style={checkboxStyle} disabled={this.state.disableForm} />Food & Beverages</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="healthcare" style={checkboxStyle}  disabled={this.state.disableForm} />Healthcare</label>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="furniture" style={checkboxStyle} disabled={this.state.disableForm} />Furniture</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="electronic" style={checkboxStyle} disabled={this.state.disableForm} />Electronic</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="sport" style={checkboxStyle} disabled={this.state.disableForm} />Sport</label>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="office" style={checkboxStyle} disabled={this.state.disableForm} />Office & Stationery</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="games" style={checkboxStyle} disabled={this.state.disableForm} />Games</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="books" style={checkboxStyle} disabled={this.state.disableForm} />Books</label>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="souvenir" style={checkboxStyle} disabled={this.state.disableForm} />Souvenir</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="automotive" style={checkboxStyle} disabled={this.state.disableForm} />Automotive</label>
                              </div>
                              <div className="form-group">
                                <label style={{cursor:'pointer'}}><input type="checkbox" value="beauty"  style={checkboxStyle} disabled={this.state.disableForm} />Beauty</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12" style={{height:500}}>
                            <label style={{marginBottom:25}}>Location</label>
                            <div id="map" style={{width:'100%', height:'85%' }}></div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Address</label>
                              <textarea rows="3" className="form-control" style={{cursor:'pointer'}} disabled={this.state.disableForm} value='Jl. Sudirman No.2 Jakarta Pusat 18290' placeholder="Company address" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Description</label>
                              <textarea rows="3" className="form-control" style={{cursor:'pointer'}} disabled={this.state.disableForm} value='Jl. Sudirman No.2 Jakarta Pusat 18290' placeholder="Company address" />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Description</label>
                              <input type="text" className="form-control" style={{cursor:'pointer'}} disabled={this.state.disableForm} value='https://facebook.github.io/react/' placeholder="Company" />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Phone</label>
                              <input type="text" className="form-control" style={{cursor:'pointer'}} disabled={this.state.disableForm} placeholder="Company phone number" value='021-555-9999' />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Profile picture</label>
                              <input type="file" className='form-control' style={{cursor:'pointer'}} disabled={this.state.disableForm} />
                            </div>
                          </div>
                        </div>

                        <hr />

                        <button type="submit" className="btn btn-warning btn-fill" style={{marginRight:20, display:this.state.updateButtonDisplay}}
                          onClick={(e)=> {
                            e.preventDefault()
                            this.setState({disableForm:'', profileTitle:'Edit Profile', submitUpdateButtonDisplay:'inline-block', updateButtonDisplay:'none'})}}>Update Profile
                        </button>

                        <button type="submit" className="btn btn-primary btn-fill" style={{marginRight:20, display:this.state.submitUpdateButtonDisplay}}
                          onClick={(e)=> {
                            e.preventDefault()
                            this.setState({disableForm:'disabled', profileTitle:'Profile', updateButtonDisplay:'inline-block', submitUpdateButtonDisplay:'none'})}}>Submit Update
                        </button>
                        <div className="clearfix"></div>
                      </form>
                    </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-user">
                  <div className="image">
                    <img style={{filter:'grayscale(.7) opacity(.7)'}} src="http://maulik-kamdar.com/wp-content/uploads/2016/08/pathvisualization.jpg" alt="..."/>
                  </div>
                  <div className="content">
                    <div className="author">
                      <a href="#">
                        <img className="avatar border-gray" src="http://lorempixel.com/100/100/food" alt="Company image profile"/>
                        <h4 className="title">PT. MAJU MUNDUR<br />
                           <small></small>
                        </h4>
                      </a>
                    </div>
                    <br />
                    <p className="description text-center" style={{padding:'0px 35px', textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                  <hr />
                  <div className="text-center">
                    <button href="#" className="btn btn-simple"><i className="fa fa-institution"></i></button>
                    <button href="#" className="btn btn-simple"><i className="fa fa-facebook"></i></button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )

  }
}
