import React, { Component } from 'react'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'

export default class Message extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Create Request',
      activeNavigation: ['','','active',''],
      request: '',
      title: ''
    }
  }

  onHandleChange (e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
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
                                value={this.state.title}
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
                                value={this.state.request}
                                placeholder='Request message goes in here. Post a message to all companies within your category'
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
                                     this.setState({ })}}>
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
