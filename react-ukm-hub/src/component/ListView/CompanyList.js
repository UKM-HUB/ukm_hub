import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {searchRequestByClick} from '../../actions/index.js'

const CompanyList = (props) => {
  const panelStyle = {
    margin: 20,
    padding: 15
  }

  const companyDetailStyle = {
    display: 'inline-block',
    width: 120,
    float: 'left',
    fontSize: 22,
    fontStyle: 'italic',
    fontFamily: 'Peddana'
  }

  const companyTitleFontStyle = {
    fontFamily: 'open sans',
    textDecoration: 'underline',
    marginBottom: 15,
    fontSize: 27
  }

  const panelBodyStyle = {
    padding: '0px 15px'
  }

  const imageStyle = {
    borderRadius: 100,
    filter: 'grayscale(0.2) opacity(0.8)',
    width: 150
  }

  const requestListStyle = {
    display: 'inline-block',
    paddingLeft: 16,
    listStyleType: 'square'
  }

  const requestItemStyle = {
    color: '#0062ff',
    fontSize: 15,
    textDecoration: 'underline'
  }

  return (
    <div>
      <div className="panel panel-default" style={panelStyle}>
        <div className="panel-body" style={{position:'relative'}}>
          <div className="media">
            <div className="media-left media-middle">
              <img className="media-object" style={imageStyle} src={props.images} alt="Test" />
            </div>
            <div className="media-body" style={{paddingLeft:15}}>
              <h4 className="media-heading" style={companyTitleFontStyle}>{props.name}</h4>
              <p style={{textAlign:'justify'}}>{props.description}
              </p>
            </div>
          </div>
        </div>
        <div className="panel-body" style={panelBodyStyle}>
          <h4>Company Detail</h4>
            <ul className="list-group">
              <li className="list-group-item"><span style={companyDetailStyle}>Email</span>
                <span>{props.email}</span>
              </li>
              <li className="list-group-item" ><span style={companyDetailStyle}>Request List</span>
                  <ul style={requestListStyle}>
                    {
                      props.request.filter((status)=> status.open === true ).length === 0 ? <p style={{margin:-16}}>-</p> :
                      props.request.filter((status)=> status.open === true ).map((item,index)=>{return(<li key={index}><Link to='/request-list' onClick={()=> props.searchRequestByClick(item.title)} style={requestItemStyle}>{item.title}</Link></li>)})
                    }
                  </ul>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Website</span>
                <span>
                  {
                    props.website === '' ? <p>-</p> :
                    <a href={props.website} style={{color:'#0062ff'}} target="_blank">{props.website}</a>
                  }

                </span>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Address</span>
                <span>{props.address}</span>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Phone</span>
                <span>{props.phone}</span>
              </li>
            </ul>
        </div>
      </div>


    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchRequestByClick: (data) => dispatch(searchRequestByClick(data)),
  }
}


export default connect(null,mapDispatchToProps)(CompanyList)
