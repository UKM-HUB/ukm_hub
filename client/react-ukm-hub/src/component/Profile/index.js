import React, { Component } from 'react'

import GMaps from '../../../public/assets/js/gmaps.min.js'
import {connect} from 'react-redux'
import {upadateCompanyProfileFetch,fetchProfile} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
const compId = localStorage.getItem('companyId')

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      topbarTitle: 'Company Profile',
      activeNavigation: ['', '', '', '', ''],
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
        profilePicture: ''
      }
    }
  }

  componentDidMount () {
    let that = this

    this.props.fetchProfile(compId)
    setTimeout(function(){
      console.log(that.state.data);
      let newState = {
        name: that.props.profile.name,
        type: that.props.profile.type,
        email: that.props.profile.email,
        category: that.props.profile.category,
        address: that.props.profile.address ? that.props.profile.address : '',
        currentlat:that.props.profile.location.lat,
        currentlng:that.props.profile.location.lng,
        description: that.props.profile.description,
        website: that.props.profile.website,
        phone: that.props.profile.phone ? that.props.profile.phone : '',
        profilePicture: that.props.profile.images ? that.props.profile.images : ''
      }

      const newData = Object.assign({}, that.state.data, newState);
      that.setState({
        data: newData
      })
    },2000)

    setTimeout(function(){
      let map = new GMaps({
        el: '#map',
        lat: that.state.data.currentlat,
        lng: that.state.data.currentlng
      })


      map.addMarker({
        lat: that.state.data.currentlat,
        lng: that.state.data.currentlng,
        click: function (e) {
          alert('You clicked in this marker')
        }
      })

      let currentState = {
        updatedlat: that.state.data.currentlat,
        updatedlng: that.state.data.currentlng
      }

      const currentData = Object.assign({}, that.state.data, currentState);
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
    },3000)
  }

  forceHandler(){
    this.forceUpdate()
  }

  submitUpdate(data,companyId){
    this.props.upadateCompanyProfileFetch(data,companyId)
  }

  onHandleChange (e) {
    let newState = {}

    if(e.target.name === 'type') {
      this.setState({
        selectStyle: 'rgb(50,50,50)'
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
                          <div className='col-md-4'>
                            <div className='form-group'>
                              <label htmlFor='exampleInputEmail1'>
                                Email
                              </label>
                              <input
                                type='email'
                                name='email'
                                className='form-control'
                                value={this.state.data.email}
                                placeholder='Company email'
                                onChange={this.onHandleChange.bind(this)}
                              />
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
                                <div className='col-md-2' key={index}>
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
                                style={{cursor: this.state.cursor}}
                                disabled={this.state.disableForm}
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
                                Website
                              </label>
                              <input
                                type='text'
                                name='website'
                                className='form-control'
                                style={{cursor: this.state.cursor}}
                                disabled={this.state.disableForm}
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
                                style={{cursor: this.state.cursor}}
                                disabled={this.state.disableForm}
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
                                Profile picture
                              </label>
                              <input
                                type='text'
                                name='profilePicture'
                                className='form-control'
                                value={this.state.data.profilePicture}
                                style={{cursor: this.state.cursor}}
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

const mapStateToProp = (state) => {
  return {
    profile : state.profiles,
    loggedInCompany: state.loggedInCompany
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    upadateCompanyProfileFetch: (data,id) => dispatch(upadateCompanyProfileFetch(data,id))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(mapStateToProp,mapDispatchToProp)(Profile)
