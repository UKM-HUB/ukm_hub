import React, { Component } from 'react'
// import $ from 'jquery'
import GMaps from '../../../public/assets/js/gmaps.min.js'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

export default class Profile extends Component {
  constructor () {
    super()
    this.state = {
      topbarTitle: 'Company Profile',
      activeNavigation: ['', ''],
      disableForm: 'disabled',
      profileTitle: 'Profile',
      updateButtonDisplay: 'inline-block',
      submitUpdateButtonDisplay: 'none',
      name: '',
      type: '',
      email: '',
      category: [],
      currentlat: '-12.043333',
      currentlng: '-77.028333',
      updatedlat: '',
      updatedlng: '',
      address: '',
      description: '',
      website: '',
      phone: '',
      profilePicture: ''
    }
  }

  componentDidMount () {
    let that = this

    console.log("MASUK DID MOUNT CUMA SEKALI");

    let map = new GMaps({
      el: '#map',
      lat: this.state.currentlat,
      lng: this.state.currentlng
    })

    map.addMarker({
      lat: this.state.currentlat,
      lng: this.state.currentlng,
      click: function (e) {
        alert('You clicked in this marker')
      }
    })

    GMaps.on('click', map.map, function (event) {
      that.setState({
        updatedlat: event.latLng.lat(),
        updatedlng: event.latLng.lng()
      })

      map.removeMarkers()
      map.addMarker({
        lat: that.state.updatedlat,
        lng: that.state.updatedlng,
        infoWindow: {
          content: '<p>Your company location</p>'
        }
      })
    })
  }

  onHandleChange (e) {
    let newState = {}

    if (e.target.name === 'category') {
      if (this.state.category.includes(e.target.value) === false) {
        newState[e.target.name] = this.state.category.concat([e.target.value])
      }
      else {
        newState[e.target.name] = this.state.category.filter((x) => x !== e.target.value)
      }
    }
    else {
      newState[e.target.name] = e.target.value
    }
    this.setState(newState)
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
                      <h4 className='title'>{this.state.profileTitle}</h4>
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
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                value={this.state.name}
                                placeholder='Company'
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
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                name='type'
                                onChange={this.onHandleChange.bind(this)}>
                                <option value='ukm'>
                                  UKM
                                </option>
                                <option value='corporate'>
                                  Corporate
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label htmlFor='exampleInputEmail1'>
                                Email
                              </label>
                              <input
                                type='email'
                                name='email'
                                className='form-control'
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                value={this.state.email}
                                placeholder='Company email'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label>
                                Category
                              </label>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='fashion'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Fashion
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='food'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Food & Beverages
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='healthcare'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Healthcare
                                </label>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='furniture'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Furniture
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='electronic'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Electronic
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='sport'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Sport
                                </label>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='office'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Office & Stationery
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='games'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Games
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='books'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Books
                                </label>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='souvenir'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Souvenir
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='automotive'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Automotive
                                </label>
                              </div>
                              <div className='form-group'>
                                <label style={{cursor: 'pointer'}}>
                                  <input
                                    type='checkbox'
                                    name='category'
                                    value='beauty'
                                    style={checkboxStyle}
                                    disabled={this.state.disableForm}
                                    onChange={this.onHandleChange.bind(this)} />Beauty
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12' style={{height: 500}}>
                            <label style={{marginBottom: 25}}>
                              Location
                            </label>
                            <div id='map' style={{width: '100%', height: '85%' }}></div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Address
                              </label>
                              <textarea
                                rows='3'
                                name='address'
                                className='form-control'
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                value={this.state.address}
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
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                value={this.state.description}
                                placeholder='Describe your company'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Website
                              </label>
                              <input
                                type='text'
                                name='website'
                                className='form-control'
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                value={this.state.website}
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
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                placeholder='Company phone number'
                                value={this.state.phone}
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label>
                                Profile picture
                              </label>
                              <input
                                type='text'
                                name='profilePicture'
                                className='form-control'
                                value={this.state.profilePicture}
                                style={{cursor: 'pointer'}}
                                disabled={this.state.disableForm}
                                placeholder='Input your photo URL'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>
                        <hr />
                        <button
                          type='submit'
                          className='btn btn-warning btn-fill'
                          style={{marginRight: 20, display: this.state.updateButtonDisplay}}
                          onClick={(e) => {
                                     e.preventDefault()
                                     this.setState({disableForm: '', profileTitle: 'Edit Profile', submitUpdateButtonDisplay: 'inline-block', updateButtonDisplay: 'none'})}}>
                          Update Profile
                        </button>
                        <button
                          type='submit'
                          className='btn btn-primary btn-fill'
                          style={{marginRight: 20, display: this.state.submitUpdateButtonDisplay}}
                          onClick={(e) => {
                                     e.preventDefault()
                                     this.setState({disableForm: 'disabled', profileTitle: 'Profile', updateButtonDisplay: 'inline-block', submitUpdateButtonDisplay: 'none'})}}>
                          Submit Update
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
                        <a href='#'><img className='avatar border-gray' src='http://lorempixel.com/100/100/food' alt='Company profile' />
                          <h4 className='title'>PT. MAJU MUNDUR<br /> <small></small></h4></a>
                      </div>
                      <br />
                      <p className='description text-center' style={{padding: '0px 35px', textAlign: 'justify'}}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                    <hr />
                    <div className='text-center'>
                      <button href='#' className='btn btn-simple'>
                        <i className='fa fa-institution'></i>
                      </button>
                      <button href='#' className='btn btn-simple'>
                        <i className='fa fa-facebook'></i>
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
