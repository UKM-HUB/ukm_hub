import React, { Component } from 'react'
import $ from 'jquery'
import '../../../public/assets/js/jquery.dataTables.min.js'
import '../../../public/assets/js/dataTables.bootstrap.min.js'

export default class ListOfRequest extends Component {
  componentDidMount(){
    $(this.getDOMNode()).modal('show');
    $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    
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
              <th>Subject</th>
              <th>Content</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={tableDataStyle}>
            <tr>
              <td>PT. SINARMAS</td>
              <td>Request teamwork</td>
              <td style={{textAlign:'justify'}}>Our UKM need to collaborate with nearby corporate for brick distribution</td>
              <td>100000</td>
              <td><img className='avatar border-gray' src='http://lorempixel.com/200/100/food' alt='request' /></td>
              <td>
                <button
                  type='submit'
                  className='btn btn-primary btn-fill'
                  style={{marginRight: 20}}
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({})}}>
                  Reply Message
                </button>
              </td>
            </tr>
            <tr>
              <td>PT. MAJU MUNDUR</td>
              <td>Request to sell</td>
              <td style={{textAlign:'justify'}}>WTS 100 sheets for batik</td>
              <td>250000</td>
              <td style={{textAlign:'center'}}><img className='avatar border-gray' src='http://lorempixel.com/200/100/food' alt='request' /></td>
              <td style={{textAlign:'center'}}>
                <button
                  type='submit'
                  className='btn btn-primary btn-fill'
                  style={{marginRight: 20}}
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({})}}>
                  Reply Message
                </button>
              </td>
            </tr>
            <tr>
              <td>PT. SINARMAS</td>
              <td>Request to sell</td>
              <td style={{textAlign:'justify'}}>WTS 100kg of grain</td>
              <td>200000</td>
              <td><img className='avatar border-gray' src='http://lorempixel.com/200/100/food' alt='request' /></td>
              <td>
                <button
                  type='submit'
                  className='btn btn-primary btn-fill'
                  style={{marginRight: 20}}
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={(e) => {
                    e.preventDefault()
                    this.setState({})}}>
                  Reply Message
                </button>
              </td>
            </tr>
          </tbody>
          </table>

          <div className="modal fade" id="myModal" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">Modal Header</h4>
                </div>
                <div className="modal-body">
                  <p>Some text in the modal.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    )
  }
}
