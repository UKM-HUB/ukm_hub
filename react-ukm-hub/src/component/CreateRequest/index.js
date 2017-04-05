import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchProfile,createBuyRequestFetch,createSellRequestFetch} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import defaultImageRequest from '../../../public/assets/img/box-outline-filled.png'
const compId = localStorage.getItem('companyId')
import $ from 'jquery'
import requestInfo from '../../../public/assets/js/createRequestMessageBox.js'

// image upload
import Dropzone from 'react-dropzone'
// import upload from 'superagent'
import superagent from 'superagent'

function generateRandomString() {
    var length = 5,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

class CreateRequest extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Create Request',
      activeNavigation: ['','','active','', ''],
      requestData:{
        request: '',
        title: '',
        price: '',
        image: defaultImageRequest
      },
      files: [],
      randomImageKey: ''
    }
  }

  componentDidMount(){
    this.props.fetchProfile(compId)
  }

  onHandleSubmitRequest(data,id,companyType){
    if (this.state.requestData.title === '') {
      requestInfo.showTitleMessage('top','center')
    } else if (this.state.requestData.request === '') {
      requestInfo.showRequestMessage('top','center')
    } else {
      // If User upload the photo
      if(this.state.files.length) {
        superagent.post('http://localhost:3001/api/company/upload/editProfile/'+this.state.randomImageKey)
        .attach('filePic', this.state.files[0])
        .end((err, data) => {
          if (err) console.log(err)
        })

        if (companyType === 'ukm'){
          this.props.createSellRequestFetch(data,id, this.state.randomImageKey + this.state.files[0].name)
        } else if (companyType === 'corporate'){
          this.props.createBuyRequestFetch(data,id, this.state.randomImageKey + this.state.files[0].name)
        } else {
          requestInfo.showTypeMessage('top','center')
        }
        requestInfo.showSubmitMessage('top','center')
        this.setState({
          requestData:{
            request: '',
            title: '',
            price: '',
            image: ''
          },
          files: [],
          randomImageKey: ''
        })
      // If User did not upload any photo
      } else {
        if (companyType === 'ukm') {
          this.props.createSellRequestFetch(data,id)
        } else if (companyType === 'corporate'){
          this.props.createBuyRequestFetch(data,id)
        } else {
          requestInfo.showTypeMessage('top','center')
        }
        requestInfo.showSubmitMessage('top','center')
        this.setState({
          requestData:{
            request: '',
            title: '',
            price: '',
            image: ''
          },
          files: [],
          randomImageKey: ''
        })
      }
    }

  }

  onHandleChange (e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    const newData = Object.assign({}, this.state.requestData, newState);
    this.setState({requestData: newData})
  }

  /*
    image upload
  */
  onDrop(acceptedFiles) {
    const that = this

    let randomString = generateRandomString()

    setTimeout(function(){
      that.setState({
        files: acceptedFiles,
        randomImageKey: randomString
      });
    }, 1000)
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
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>
                                Image (Optional)
                              </label>
                              {/* file upload */}
                              <Dropzone style={{width:'100%', border:'1px dotted rgb(50,50,50)', height:80, cursor:'pointer', display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'open sans'}} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop.bind(this)}>
                                  <div>Try dropping some files here, or click to select files to upload.</div>
                              </Dropzone>
                              {
                                this.state.files.length > 0 ? <div>
                                <h2>Uploading {this.state.files.length} files...</h2>
                                <div>{this.state.files.map((file,index) => <img src={file.preview} key={index} alt="" /> )}</div>
                                </div> : null
                              }
                              {/* file upload */}
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
                                     this.onHandleSubmitRequest(this.state.requestData,compId,this.props.profile.type)}}>
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
    createBuyRequestFetch: (data,id, img) => dispatch(createBuyRequestFetch(data,id, img)),
    createSellRequestFetch: (data,id, img) => dispatch(createSellRequestFetch(data,id, img))
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(CreateRequest)
