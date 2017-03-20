export const loginCompany = (token) => {
  return {
    type: 'LOGIN_COMPANY',
    payload: token,
  }
}

export const updateCompanyProfileSuccess = data => {
  return {
    type: 'UPDATE_COMPANY_PROFILE_SUCCESS',
    payload: data,
  }
}

export const fetchingCompanyProfile = (data) => {
  return {
    type: 'FETCH_COMPANY_PROFILE',
    payload: data,
  }
}

export const searchCompanyByCategory = (data) => {
  return {
    type: 'FETCH_COMPANY_BY_CATEGORY',
    payload:data,
  }
}


export const registerCompanyFetch = (email,password) => {
  return (dispatch) => {
    fetch('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com/api/company/auth/register/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => res.json())
    .then(registered => {
      localStorage.setItem('token', registered.token)
      localStorage.setItem('companyId', registered.companyId)
      return dispatch(loginCompany(registered))
    })
  }
}

export const loginCompanyFetch = (email,password) => {
  return (dispatch) => {
    fetch('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com/api/company/auth/login/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email:email,
        password: password
      })
    })
    .then(res => res.json())
    .then(logged => {
      localStorage.setItem('token',logged.token)
      localStorage.setItem('companyId',logged.companyId)
      return dispatch(loginCompany(logged))})
  }
}

export const fetchProfile = (id) => {
  return (dispatch) => {
    fetch('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com/api/company/'+id)
      .then(res => res.json())
      .then(todos => dispatch(fetchingCompanyProfile(todos)))
  }
}

export const updateCompanyProfile = (data,id) => {
  return (dispatch) => {
    console.log(data);
    fetch('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com/api/company/'+id, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name : data.name,
        type : data.type,
        category : data.category,
        lat : data.updatedlat,
        lng : data.updatedlng,
        website : data.website,
        address : data.address,
        phone : data.phone,
        description : data.description,
        images : data.image,
      })
    })
    .then(res => res.json())
    .then(edited => dispatch(updateCompanyProfileSuccess(edited)))
  }
}

export const fetchCompanyByCategory = (id) => {
  return (dispatch) => {
    fetch('http://ukmhub-api-prod.ap-southeast-1.elasticbeanstalk.com/api/company/'+id+'/searchByCategory')
      .then(res => res.json())
      .then(company => dispatch(searchCompanyByCategory(company)))
  }
}
