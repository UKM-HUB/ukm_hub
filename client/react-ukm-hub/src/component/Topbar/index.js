import React from 'react'

const Topbar = (props) => {
  return (
    <nav className="navbar navbar-default navbar-fixed">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">{props.title}</a>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-left">
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li style={{margin:'15px 60px'}}>
                <h4 style={{display: 'inline'}}>Server Time: </h4><span style={{marginLeft:18, position:'relative', bottom:2}} id="clockbox"></span>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <p>PT. UKM HUB<b className="caret"></b></p>
              </a>
              <ul className="dropdown-menu">
                <li><a href="#">Account</a></li>
                <li className="divider"></li>
                <li><a href="#">Log Out</a></li>
              </ul>
            </li>
            <li className="separator hidden-lg hidden-md"></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Topbar
