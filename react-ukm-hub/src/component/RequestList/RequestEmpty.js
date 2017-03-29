import React from 'react'

const RequestEmpty = (props) => {
  return (
    <div className='content'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className="row">
                <div className="col-md-4">
              <div className='header'>
                <h4 style={{margin:0}}>Request List Empty</h4>
                <hr />
                </div>
              </div>
              </div>
              <div className='content'>
                <p>Request list by your company category still have no request</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RequestEmpty
