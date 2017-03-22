import React, { Component } from 'react'
import { connect } from 'react-redux'
import { otherCompanyRequestFetch } from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import ListOfRequest from './ListOfRequest'
import RequestEmpty from './RequestEmpty'
const compId = localStorage.getItem('companyId')

class RequestList extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Request List',
      activeNavigation: ['','','','active'],
      otherCompRequest:[]
    }
  }

  componentDidMount(){
    this.props.otherCompanyRequestFetch(compId)
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
            {
              this.props.otherCompanyRequest.length < 1 ? <RequestEmpty /> :
              <ListOfRequest requests={this.props.otherCompanyRequest} searchKey={this.props.searchKey}/>
            }

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    otherCompanyRequest: state.otherCompanyRequest,
    searchKey : state.searchKey
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    otherCompanyRequestFetch: (id) => dispatch(otherCompanyRequestFetch(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RequestList)
