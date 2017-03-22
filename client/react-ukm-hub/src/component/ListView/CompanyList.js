import React from 'react'

const CompanyList = (props) => {
  const panelStyle = {
    margin: 20,
    padding: 15
  }

  const distanceStyle = {
    float: 'right',
    position: 'absolute',
    bottom: 0,
    right: 25
  }

  const companyDetailStyle = {
    display: 'inline-block',
    width: 120,
    float: 'left',
    fontSize: 22,
    fontStyle: 'italic',
    fontFamily: 'Peddana'
  }

  const requestDetailStyle = {
    display:'inline-block',
    paddingLeft: 16
  }

  const companyTitleFontStyle = {
    fontFamily: 'open sans',
    textDecoration: 'underline',
    marginBottom: 15
  }

  const panelBodyStyle = {
    padding: '0px 15px'
  }

  const imageStyle = {
    borderRadius: 100,
    filter: 'grayscale(0.2) opacity(0.8)',
    width: 150
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
              <strong style={distanceStyle}>
                1 KM away from your location
              </strong>
            </div>
          </div>
        </div>
        <div className="panel-body" style={panelBodyStyle}>
          <h4>Company Detail</h4>
            <ul className="list-group">
              <li className="list-group-item"><span style={companyDetailStyle}>Email</span>
                <span>{props.email}</span>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Request List</span>
                  <ul style={requestDetailStyle}>
                    {
                      props.request.filter((y)=> y.open === true).map((x,index)=>{return(<li key={index}><a href='http://google.com'>{x.title}</a></li>)})
                    }


                  </ul>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Website</span>
                <span>
                  <a href='https://facebook.github.io/react/'>{props.website}</a>
                </span>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Address</span>
                <span>{props.address}</span>
              </li>
            </ul>
        </div>
      </div>


    </div>
  )
}

export default CompanyList
