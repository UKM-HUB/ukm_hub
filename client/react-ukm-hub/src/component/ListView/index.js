import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchCompanyByCategory} from '../../actions/index.js'
import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import CompanyList from './CompanyList'
const compId = localStorage.getItem('companyId')

class ListView extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'List View',
      activeNavigation: ['','active']
    }
  }

  componentDidMount(){
    this.props.fetchCompanyByCategory(compId)
  }
  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
            {
              this.props.otherCompany.map((company) => {
                return(
                  <CompanyList key={company._id} {...company}/>
                )
              })
            }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    otherCompany: state.companyByCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCompanyByCategory: (id) => dispatch(fetchCompanyByCategory(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListView)
