import React, { Component } from 'react'

import GMaps from '../../../public/assets/js/gmaps.min.js'
import { connect } from 'react-redux'
import { updateCompanyProfile, fetchProfile } from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
const compId = localStorage.getItem('companyId')

import profileInfo from '../../../public/assets/js/profileInfoMessageBox.js'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topbarTitle: 'Company Profile',
      activeNavigation: ['', '', '', '', ''],
      searchLocation: '',
      data: {
        name: '',
        type: '',
        email: '',
        category: [],
        currentlat: '',
        currentlng: '',
        updatedlat: '',
        updatedlng: '',
        address: '',
        description: '',
        website: '',
        phone: '',
        image: ''
      }
    }
  }

  componentDidMount () {
    let that = this

    this.props.fetchProfile(compId)
    setTimeout(function(){
      let newState = {
        name: that.props.profile.name,
        type: that.props.profile.type,
        email: that.props.profile.email,
        category: that.props.profile.category,
        address: that.props.profile.address ? that.props.profile.address : '',
        currentlat:that.props.profile.location.lat ? that.props.profile.location.lat : '-6.260745364770679',
        currentlng:that.props.profile.location.lng ? that.props.profile.location.lng : '106.78169667720795',
        description: that.props.profile.description,
        website: that.props.profile.website,
        phone: that.props.profile.phone ? that.props.profile.phone : '',
        image: that.props.profile.images ? that.props.profile.images : ''
      }

      const newData = Object.assign({}, that.state.data, newState);
      that.setState({
        data: newData
      })
    }, 1000)

    setTimeout(function(){
      let map = new GMaps({
        el: '#map',
        lat: that.state.data.currentlat,
        lng: that.state.data.currentlng,
        zoom: 10
      })

      map.addMarker({
        lat: that.state.data.currentlat,
        lng: that.state.data.currentlng
      })

      let currentLocationState = {
        updatedlat: that.state.data.currentlat,
        updatedlng: that.state.data.currentlng
      }

      const currentData = Object.assign({}, that.state.data, currentLocationState);
      that.setState({
        data: currentData
      })

      GMaps.on('click', map.map, function (event) {
        let newState = {
          updatedlat: event.latLng.lat(),
          updatedlng: event.latLng.lng()
        }

        const newData = Object.assign({}, that.state.data, newState);
        that.setState({
          data: newData
        })

        map.removeMarkers()
        map.addMarker({
          lat: that.state.data.updatedlat,
          lng: that.state.data.updatedlng,
          infoWindow: {
            content: '<p>Your company location</p>'
          }
        })
      })
    },1500)
  }

  geolocate(e) {
    let that = this
    e.preventDefault()
    let map = new GMaps({
      el: '#map',
      lat: that.state.data.currentlat,
      lng: that.state.data.currentlng,
      zoom: 10
    })

    GMaps.geolocate({
      success: function(position) {
        let newState = {
          updatedlat: position.coords.latitude,
          updatedlng: position.coords.longitude
        }
        const newData = Object.assign({}, that.state.data, newState);
        that.setState({
          data: newData
        })
        map.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        map.setCenter(position.coords.latitude, position.coords.longitude);
      },
      error: function(error) {
        alert('Geolocation failed: '+error.message);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      }
    });

    GMaps.on('click', map.map, function (event) {
      let newState = {
        updatedlat: event.latLng.lat(),
        updatedlng: event.latLng.lng()
      }

      const newData = Object.assign({}, that.state.data, newState);
      that.setState({
        data: newData
      })

      map.removeMarkers()
      map.addMarker({
        lat: that.state.data.updatedlat,
        lng: that.state.data.updatedlng,
        infoWindow: {
          content: '<p>Your company location</p>'
        }
      })
    })
  }

  submitUpdate(data,companyId){
    if (this.state.data.name === '') {
      profileInfo.showNameMessage('top','center')
    } else if (this.state.data.type === '') {
      profileInfo.showTypeMessage('top','center')
    } else if (this.state.data.category.length === 0) {
      profileInfo.showCategoryMessage('top','center')
    } else if (this.state.data.updatedlat === '-6.260745364770679') {
      profileInfo.showMarkerMessage('top','center')
    } else if (this.state.data.address === '') {
      profileInfo.showAddressMessage('top','center')
    } else if (this.state.data.description === '') {
      profileInfo.showDescriptionMessage('top','center')
    } else if (this.state.data.phone === '') {
      profileInfo.showPhoneMessage('top','center')
    } else {
      profileInfo.showUpdateSuccessMessage('top','center')
      this.props.updateCompanyProfile(data,companyId)
    }

  }

  onHandleChange (e) {
    let newState = {}
    const that = this

    if(e.target.name === 'type') {
      this.setState({
        selectStyle: 'rgb(50,50,50)'
      })
    }


    if(e.target.name === 'searchLocation') {

      newState[e.target.name] = e.target.value
      this.setState({
        searchLocation: e.target.value
      })

      let map = new GMaps({
        el: '#map',
        lat: that.state.data.currentlat,
        lng: that.state.data.currentlng,
        zoom: 10
      })

      GMaps.geocode({
        address: e.target.value,
        callback: function(results, status) {
          if (status === 'OK') {
            var latlng = results[0].geometry.location;
            map.setCenter(latlng.lat(), latlng.lng());
            map.addMarker({
              lat: latlng.lat(),
              lng: latlng.lng()
            });
            let newState = {
              updatedlat: latlng.lat(),
              updatedlng: latlng.lng()
            }

            const newData = Object.assign({}, that.state.data, newState);
            that.setState({
              data: newData
            })
          }
        }
      });

      GMaps.on('click', map.map, function (event) {
        let newState = {
          updatedlat: event.latLng.lat(),
          updatedlng: event.latLng.lng()
        }

        const newData = Object.assign({}, that.state.data, newState);
        that.setState({
          data: newData
        })

        map.removeMarkers()
        map.addMarker({
          lat: that.state.data.updatedlat,
          lng: that.state.data.updatedlng,
          infoWindow: {
            content: '<p>Your company location</p>'
          }
        })
      })
    }

    if (e.target.name === 'category') {
      if (this.state.data.category.includes(e.target.value) === false) {
        newState[e.target.name] = this.state.data.category.concat([e.target.value])
      } else {
        newState[e.target.name] = this.state.data.category.filter((x) => x !== e.target.value)
      }
    } else {
      newState[e.target.name] = e.target.value
    }
    const newData = Object.assign({}, this.state.data, newState);
    this.setState({data: newData})
  }

  render () {
    const checkboxStyle = {
      marginRight: 20,
      cursor: 'pointer'
    }

    return (
      <div className='wrapper'>
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className='main-panel'>
          <Topbar title={this.state.topbarTitle} />
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='card'>
                    <div className='header'>
                      <h4 className='title'>Edit Company Profile</h4>
                    </div>
                    <div className='content'>
                      <form>
                        <div className='row'>
                          <div className='col-md-5'>
                            <div className='form-group'>
                              <label>
                                Company Name
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='name'
                                value={this.state.data.name}
                                placeholder='PT. Media Teknologi'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>
                                Type
                              </label>
                              <select
                                className='form-control'
                                name='type'
                                style={{color:this.state.selectStyle}}
                                value={this.state.data.type}
                                onChange={this.onHandleChange.bind(this)}>
                                <option value="" disabled>Please Choose...</option>
                                <option value='ukm'>
                                  UKM
                                </option>
                                <option value='corporate'>
                                  Corporate
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label style={{marginBottom:20}}>
                                Category
                              </label>
                            </div>
                              { ['fashion', 'food', 'beauty', 'office', 'souvenir', 'electronic', 'book', 'automotive', 'entertainment', 'furniture', 'gadget', 'game'].map((category,index) => (
                                <div className='col-md-3' key={index}>
                                  <div className='form-group' style={{marginTop: -20}}>
                                    <label style={{cursor: 'pointer'}}>
                                      <input
                                        type='checkbox'
                                        name='category'
                                        value={category}
                                        style={checkboxStyle}
                                        checked={ this.state.data.category.indexOf(category) !== -1 }
                                        onChange={this.onHandleChange.bind(this)}
                                      />{category.toUpperCase()}
                                    </label>
                                  </div>
                              </div>
                              )) }
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12' style={{height: 500}}>
                            <label style={{marginBottom: 25, display:'block'}}>
                              Location
                            </label>
                            <div className="row" style={{marginBottom:25}}>
                              <div className="col-md-3">
                                <button
                                  type='submit'
                                  className='btn btn-primary btn-fill'
                                  style={{marginRight: 20}}
                                  onClick={this.geolocate.bind(this)}>
                                  Find your location
                                </button>
                              </div>
                              <div className="col-md-9">
                                <input
                                  type='text'
                                  name='searchLocation'
                                  className='form-control'
                                  value={this.state.data.searchLocation}
                                  placeholder='Search your company location'
                                  onChange={this.onHandleChange.bind(this)} />
                              </div>
                            </div>
                            <div id='map' style={{width: '100%', height: '85%'}}></div>
                          </div>
                        </div>
                        <div className='row' style={{marginTop:70}}>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Address
                              </label>
                              <textarea
                                rows='3'
                                name='address'
                                className='form-control'
                                style={{cursor: this.state.cursor}}
                                disabled={this.state.disableForm}
                                value={this.state.data.address}
                                placeholder='Company address'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Description
                              </label>
                              <textarea
                                rows='3'
                                name='description'
                                className='form-control'
                                value={this.state.data.description}
                                placeholder='Describe your company'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Website (optional)
                              </label>
                              <input
                                type='text'
                                name='website'
                                className='form-control'
                                value={this.state.data.website}
                                placeholder='Company'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Phone
                              </label>
                              <input
                                type='text'
                                name='phone'
                                className='form-control'
                                placeholder='Company phone number'
                                value={this.state.data.phone}
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label>
                                Profile picture (optional)
                              </label>
                              <input
                                type='text'
                                name='image'
                                className='form-control'
                                value={this.state.data.image}
                                placeholder='Input your photo URL'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>
                        <hr />
                        <button
                          type='submit'
                          className='btn btn-warning btn-fill'
                          style={{marginRight: 20}}
                          onClick={(e) => {
                            e.preventDefault()
                            this.submitUpdate(this.state.data,compId)}}>
                          Update Profile
                        </button>

                        <div className='clearfix'></div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='card card-user'>
                    <div className='image'>
                      <img style={{filter: 'grayscale(.7) opacity(.7)'}} src='http://maulik-kamdar.com/wp-content/uploads/2016/08/pathvisualization.jpg' alt='...' />
                    </div>
                    <div className='content'>
                      <div className='author'>
                        <a href='#'><img className='avatar border-gray' src={this.state.data.image} alt='' />
                          <h4 className='title'>{this.state.data.name}<br /> <small></small></h4></a>
                      </div>
                      <br />
                      <p className='description text-center' style={{padding: '0px 35px', textAlign: 'justify'}}>
                        {this.state.data.description}
                      </p>
                    </div>
                    <hr />
                    <div className='text-center'>
                      <button href={this.state.data.website} className='btn btn-simple'>
                        <i className='fa fa-institution'></i>
                      </button>
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

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    loggedInCompany: state.loggedInCompany
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    updateCompanyProfile: (data,id) => dispatch(updateCompanyProfile(data,id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
