import React, { Component } from 'react'
import $ from 'jquery'
import '../../../public/assets/js/jquery.dataTables.min.js'
import '../../../public/assets/js/dataTables.bootstrap.min.js'

export default class ListOfRequest extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      message: ''
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
              <td>PT. MEDIA TEKNOLOGI</td>
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
                    onClick={()=>alert('Masukin ke reducer isi statenya')}>Save changes
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
