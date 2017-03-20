import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchProfile,createBuyRequestFetch,createSellRequestFetch} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
const compId = localStorage.getItem('companyId')

class CreateRequest extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Create Request',
      activeNavigation: ['','','active',''],
      companyType:'',
      requestData:{
        request: '',
        title: '',
        price: '',
        image: ''
      }
    }
  }

  componentDidMount(){
    this.props.fetchProfile(compId)
  }

  componentWillReceiveProps(){
    this.setState({
      companyType:this.props.profile.type
    })
  }

  onHandleSubmitRequest(data,id){
    console.log(this.state.companyType);
    if(this.state.companyType === 'ukm'){
      this.props.createSellRequestFetch(data,id)
    }
    else if(this.state.companyType === 'corporate'){
      this.props.createBuyRequestFetch(data,id)
    }
    else{
      alert('you are not completed your profile yet, please complete your profile in company profile menu')
    }
  }

  onHandleChange (e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    const newData = Object.assign({}, this.state.requestData, newState);
    this.setState({requestData: newData})
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
          <div className='content'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='card'>
                    <div className='header'>
                      <h4 className='title'>Message</h4>
                    </div>
                    <div className='content'>
                      <form>
                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label>
                                Title
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='title'
                                value={this.state.requestData.title}
                                placeholder='Request title'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-12'>
                            <div className='form-group'>
                              <label>
                                Request
                              </label>
                              <textarea
                                rows='3'
                                name='request'
                                className='form-control'
                                value={this.state.requestData.request}
                                placeholder='Request message goes in here. Post a message to all companies within your category'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Image (Optional)
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='image'
                                value={this.state.requestData.image}
                                placeholder='Request image URL'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Price (Optional)
                              </label>
                              <input
                                type='text'
                                className='form-control'
                                name='price'
                                value={this.state.requestData.price}
                                placeholder='Price Range'
                                onChange={this.onHandleChange.bind(this)} />
                            </div>
                          </div>
                        </div>

                        <hr />
                        <button
                          type='submit'
                          className='btn btn-primary btn-fill'
                          style={{marginRight: 20}}
                          onClick={(e) => {
                                     e.preventDefault()
                                     this.onHandleSubmitRequest(this.state.requestData,compId)}}>
                          Submit Request
                        </button>
                        <div className='clearfix'></div>
                      </form>
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
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id)),
    createBuyRequestFetch: (data,id) => dispatch(createBuyRequestFetch(data,id)),
    createSellRequestFetch: (data,id) => dispatch(createSellRequestFetch(data,id)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateRequest)
