import React, { Component } from 'react'
import $ from 'jquery'
import '../../../public/assets/js/jquery.dataTables.min.js'
import '../../../public/assets/js/dataTables.bootstrap.min.js'

export default class MessageList extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      message: ''
    }
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
            <tr>
              <td>PT. MEDIA TEKNOLOGI</td>
              <td>Teamwork Accepted</td>
              <td>I need teamwork also for 5 years</td>
              <td>17 April 2017</td>
              <td>
                <button
                  type='submit'
                  className='btn btn-primary btn-fill'
                  style={{marginRight: 20}}
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({})
                    alert('Accept masukin ke reducer')}}>
                  Accept
                </button>
                <button
                  type='submit'
                  className='btn btn-danger btn-fill'
                  style={{marginRight: 20}}
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({})
                    alert('Accept masukin ke reducer')}}>
                  Decline
                </button>
              </td>
            </tr>
            <tr>
              <td>PT. SINARMAS</td>
              <td>Send Respond</td>
              <td>I will buy your sheet for 100000</td>
              <td>25 April 2017</td>
              <td>
                <button
                  type='submit'
                  className='btn btn-primary btn-fill'
                  style={{marginRight: 20}}
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({})
                    alert('Accept masukin ke reducer')}}>
                  Accept
                </button>
                <button
                  type='submit'
                  className='btn btn-danger btn-fill'
                  style={{marginRight: 20}}
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({})
                    alert('Accept masukin ke reducer')}}>
                  Decline
                </button>
              </td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>

    )
  }
}
