import React, { Component } from 'react'
import $ from 'jquery'
import '../../../public/assets/js/jquery.dataTables.min.js'
import '../../../public/assets/js/dataTables.bootstrap.min.js'
import {acceptMessageFetch,rejectMessageFetch} from '../../actions/index.js'
import {connect} from 'react-redux'
const compId = localStorage.getItem('companyId')

class MessageList extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      message: ''
    }
  }

  handleAccept(id,acceptedMessagesId){
    this.props.acceptMessageFetch(id,acceptedMessagesId)
  }
  handleReject(id,rejectedMessagesId){
    this.props.rejectMessageFetch(id,rejectedMessagesId)
  }
  componentDidMount(){
    $(document).ready(function() {
        $('#requestTable').DataTable();
    });
  }

  render() {
    const tableDataStyle = {
      fontFamily: 'Peddana',
      fontSize: 14,
      textAlign: 'center'
    }
    return (
      <div className='content'>
        <div className='container-fluid'>
        <table id="requestTable" className="table table-striped table-bordered" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Title</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={tableDataStyle}>
            {
              this.props.messages.filter((filterMessage)=> filterMessage.status === 'waiting'  ).map((message,index)=>{return(
                <tr key={message._id}>
                  <td>PT. MEDIA TEKNOLOGI</td>
                  <td>{message.title}</td>
                  <td>{message.message}</td>
                  <td>{message.date}</td>
                  <td>
                    <button
                      type='submit'
                      className='btn btn-primary btn-fill'
                      style={{marginRight: 20}}
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleAccept(compId,message._id)
                        alert('you accept the mesage')}}>
                      Accept
                    </button>
                    <button
                      type='submit'
                      className='btn btn-danger btn-fill'
                      style={{marginRight: 20}}
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleReject(compId,message._id)
                        alert('you refused the message')}}>
                      Decline
                    </button>
                  </td>
                </tr>
              )})
            }

          </tbody>
          </table>
        </div>
      </div>

    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    acceptMessageFetch: (id,acceptedMessagesId) => dispatch(acceptMessageFetch(id,acceptedMessagesId)),
    rejectMessageFetch: (id,rejectedMessagesId) => dispatch(rejectMessageFetch(id,rejectedMessagesId))
  }
}


export default connect(null, mapDispatchToProps)(MessageList)
