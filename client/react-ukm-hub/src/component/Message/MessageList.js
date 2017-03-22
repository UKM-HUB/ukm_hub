import React, { Component } from 'react'
import $ from 'jquery'
import '../../../public/assets/js/jquery.dataTables.min.js'
import '../../../public/assets/js/dataTables.bootstrap.min.js'
import {acceptMessageFetch,rejectMessageFetch} from '../../actions/index.js'
import {connect} from 'react-redux'
const compId = localStorage.getItem('companyId')

let messageInfo = {
  showAcceptMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-like2',
      message: '<p style="margin-top:8px">Accept request sent</p>'
    }, {
      type: 'info',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  },
  showDeclineMessage: function (from, align) {
    $.notify({
      icon: 'pe-7s-attention',
      message: '<p style="margin-top:8px">You have decline the offer</p>'
    }, {
      type: 'danger',
      timer: 4000,
      placement: {
        from: from,
        align: align
      }
    })
  }
}

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
    messageInfo.showAcceptMessage('top','center')
  }
  handleReject(id,rejectedMessagesId){
    this.props.rejectMessageFetch(id,rejectedMessagesId)
    messageInfo.showDeclineMessage('top','center')
  }
  componentDidMount(){
    $(document).ready(function() {
        $('#requestTable').DataTable();
    });
  }
  fullDate(date){
    let fullDate = new Date(date)
    let month = ['January','February','March','April','May','June','July','August','September','October','November']
    return fullDate.getDate() + '/' + month[(fullDate.getMonth())] + '/' +  fullDate.getFullYear()
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
              <th>Replied for</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={tableDataStyle}>
            {

              this.props.messages.filter((filterMessage)=> filterMessage.status === 'waiting'  ).map((message,index)=>{return(
                <tr key={message._id}>
                  <td>{message.sender}</td>
                  <td>{message.title}</td>
                  <td>{message.requestTitle}</td>
                  <td>{message.message}</td>
                  <td>{this.fullDate(message.date)}</td>
                  <td>
                    <button
                      type='submit'
                      className='btn btn-primary btn-fill'
                      style={{marginRight: 20}}
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleAccept(compId,message._id)}}>
                      Accept
                    </button>
                    <button
                      type='submit'
                      className='btn btn-danger btn-fill'
                      style={{marginRight: 20}}
                      onClick={(e) => {
                        e.preventDefault()
                        this.handleReject(compId,message._id)}}>
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
