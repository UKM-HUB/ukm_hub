import React from 'react'

const CompanyList = () => {
  const panelStyle = {
    margin: 20,
  }

  const distanceStyle = {
    float: 'right',
    position: 'absolute',
    bottom: 0,
    right: 25
  }

  const companyDetailStyle = {
    display: 'inline-block',
    width: 95,
    float: 'left',
    fontSize: 15,
    fontStyle: 'italic'
  }

  const requestDetailStyle = {
    display:'inline-block',
    paddingLeft: 16
  }

  return (
    <div>
      <div className="panel panel-default" style={panelStyle}>
        <div className="panel-body" style={{position:'relative'}}>
          <div className="media">
            <div className="media-left media-middle">
              <img className="media-object" src="http://lorempixel.com/200/201/food" alt="Test" />
            </div>
            <div className="media-body">
              <h4 className="media-heading">PT. UKM 1</h4>
              <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <strong style={distanceStyle}>
                1 KM away from your location
              </strong>
            </div>
          </div>
        </div>
        <div className="panel-body" style={{padding:'0px 25px'}}>
          <h4>Company Detail</h4>
            <ul className="list-group">
              <li className="list-group-item"><span style={companyDetailStyle}>Email</span>
                <span>ukm1@gmail.com</span>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Request</span>
                  <ul style={requestDetailStyle}>
                    <li><a href='http://google.com'>Request 1</a></li>
                    <li><a href='http://facebook.com'>Request 2</a></li>
                  </ul>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Website</span>
                <span>
                  <a href='https://facebook.github.io/react/'>UKM 1 Website</a>
                </span>
              </li>
              <li className="list-group-item"><span style={companyDetailStyle}>Address</span>
                <span>Jl. Hidup Baru 1</span>
              </li>
            </ul>
        </div>
      </div>

      <div className="panel panel-default" style={panelStyle}>
        <div className="panel-body" style={{position:'relative'}}>
          <div className="media">
            <div className="media-left media-middle">
              <img className="media-object" src="http://lorempixel.com/200/200/food" alt="Test" />

            </div>
            <div className="media-body">
              <h4 className="media-heading">PT. UKM 2</h4>
              <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <strong style={distanceStyle}>
                1.9 KM away from your location
              </strong>

            </div>
          </div>
        </div>
        <div className="panel-body" style={{padding:'0px 25px'}}>
          <h4>Company Detail</h4>
          <ul className="list-group">
            <li className="list-group-item"><span style={companyDetailStyle}>Email</span>
              <span>ukm2@gmail.com</span>
            </li>
            <li className="list-group-item"><span style={companyDetailStyle}>Request</span>
                <ul style={requestDetailStyle}>
                  <li><a href='http://google.com'>Request 1</a></li>
                  <li><a href='http://facebook.com'>Request 2</a></li>
                  <li><a href='http://twitter.com'>Request 3</a></li>
                  <li><a href='http://spotify.com'>Request 4</a></li>
                </ul>
            </li>
            <li className="list-group-item"><span style={companyDetailStyle}>Website</span>
              <span>
                <a href='https://facebook.github.io/react/'>UKM 2 Website</a>
              </span>
            </li>
            <li className="list-group-item"><span style={companyDetailStyle}>Address</span>
              <span>Jl. Hidup Baru 2</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CompanyList
