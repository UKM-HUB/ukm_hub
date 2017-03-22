import React from 'react'

const ListEmpty = (props) => {
  return (
    <div className='content'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className="row">
                <div className="col-md-4">
              <div className='header'>
                <h4 style={{margin:0}}>List Empty</h4>
                <hr />
                </div>
              </div>
              </div>
              <div className='content'>
                <p>Company by your category not found</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ListEmpty
