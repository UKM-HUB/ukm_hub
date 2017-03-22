import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import MessageList from './MessageList'
import { connect } from 'react-redux'
import { fetchProfile } from '../../actions/index.js'
const compId = localStorage.getItem('companyId')

class Message extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Message',
      activeNavigation: ['','','','','active']
    }
  }

  componentWillMount(){
    this.props.fetchProfile(compId)
  }
  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
            {
              this.props.profile === '' ? <p>waiting...</p> :
              <MessageList messages={this.props.profile.acceptedMessages}/>
            }

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfile: (id) => dispatch(fetchProfile(id))
  }
  //return bindActionCreators({addTodo},dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Message)
