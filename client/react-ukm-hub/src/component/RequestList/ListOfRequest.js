import React, { Component } from 'react'
import $ from 'jquery'
import '../../../public/assets/js/jquery.dataTables.min.js'
import '../../../public/assets/js/dataTables.bootstrap.min.js'
import {connect} from 'react-redux'
import {createMessageFetch} from '../../actions/index.js'
const compId = localStorage.getItem('companyId')

class ListOfRequest extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      message: '',
      requestTitle:'',
      requestId:'',
      otherId:'',
    }
  }

  handleChange(e){
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  componentDidMount(){
    $(document).ready(function() {
        $('#requestTable').DataTable();
    });

  }

  onHandleSubmitMessage(title,message,requestTitle,id,otherId,requestId){
    this.props.createMessageFetch(title,message,requestTitle,id,otherId,requestId)
    this.setState({
        title: '',
        message:'',
        requestTitle:'',
        requestId:'',
        otherId:'',
    })
  }

  handleOpenMessage(title,id,seller){
    this.setState({
      requestTitle:title,
      requestId:id,
      otherId:seller
    })
  }

  render() {
    const tableDataStyle = {
      fontFamily: 'Peddana',
      fontSize: 14,
      textAlign: 'center'
    }
    console.log(this.props.requests.length);
    return (
      <div className='content'>
        <div className='container-fluid'>
        <table id="requestTable" className="table table-striped table-bordered" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Subject</th>
              <th>Content</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={tableDataStyle}>
            {
              this.props.requests.map((otherRequest,index)=>{return(
                <tr key={otherRequest.request._id}>
                  <td>otherRequest-data</td>
                  <td>{otherRequest.request.title}</td>
                  <td style={{textAlign:'justify'}}>{otherRequest.request.description}</td>
                  <td>{otherRequest.request.price}</td>
                  <td><img className='avatar border-gray' src={otherRequest.request.images} alt='request' /></td>
                  <td>
                    <button
                      type='submit'
                      className='btn btn-primary btn-fill'
                      style={{marginRight: 20}}
                      data-toggle="modal"
                      data-target="#myModal"
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleOpenMessage(otherRequest.request.title,otherRequest.request._id,otherRequest.seller)
                      }}>
                      Reply Message
                    </button>
                  </td>
                </tr>
              )})
            }

          </tbody>
          </table>

          <div className="modal fade" id="myModal">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title">Send Message</h4>
                </div>
                <div className="modal-body">
                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label>
                          Title
                        </label>
                        <input
                          type='text'
                          name='title'
                          className='form-control'
                          value={this.state.title}
                          onChange={this.handleChange.bind(this)}/>
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-12'>
                      <div className='form-group'>
                        <label>
                          Message
                        </label>
                        <textarea
                          rows='3'
                          name='message'
                          className='form-control'
                          value={this.state.message}
                          onChange={this.handleChange.bind(this)}/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e)=> {
                      e.preventDefault()
                      this.onHandleSubmitMessage(this.state.title,this.state.message,this.state.requestTitle,compId,this.state.otherId,this.state.requestId)
                    }}>Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMessageFetch: (title,message,requestTitle,id,otherId,requestId) => dispatch(createMessageFetch(title,message,requestTitle,id,otherId,requestId))
  }
}

export default connect(null, mapDispatchToProps)(ListOfRequest)
