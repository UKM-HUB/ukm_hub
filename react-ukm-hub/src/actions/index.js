const host = 'http://localhost:3001'
import axios from 'axios'

export const loginCompany = (token) => {
  console.log(token);
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
    payload: data,
  }
}

export const searchOtherCompanyRequest = (data) => {
  return {
    type: 'FETCH_OTHER_COMPANY_REQUEST',
    payload: data,
  }
}

export const searchRequestByClick = (data) => {
  return {
    type: 'SEARCH_REQUEST_CLICK',
    payload: data,
  }
}

export const dispatchRegisterCompany = (email, password) => {
  return (dispatch) => {
    return axios.post(`${host}/api/company/auth/register/`, {
      email: email,
      password: password
    })
    .then(registered => {
      console.log(registered);
      localStorage.setItem('token', registered.token)
      localStorage.setItem('companyId', registered.companyId)
      return dispatch(loginCompany(registered))
    })
  }
}

export const loginCompanyFetch = (email,password) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/company/auth/login/', {
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
    fetch('http://localhost:3001/api/company/'+id)
      .then(res => res.json())
      .then(profile => dispatch(fetchingCompanyProfile(profile)))
  }
}

export const updateCompanyProfile = (data,id,img) => {
  if(!img){
    return (dispatch) => {
      fetch(host + '/api/company/'+id, {
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
          // images : 'https://s3-ap-southeast-1.amazonaws.com/ukm-hub/images/'+img,
        })
      })
      .then(res => res.json())
      .then(edited => dispatch(updateCompanyProfileSuccess(edited)))
    }
  } else {
    return (dispatch) => {
      fetch(host + '/api/company/'+id, {
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
          images : 'https://s3-ap-southeast-1.amazonaws.com/ukm-hub/images/'+img,
        })
      })
      .then(res => res.json())
      .then(edited => dispatch(updateCompanyProfileSuccess(edited)))
    }
  }

}
export const fetchCompanyByCategory = (id) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/company/'+id+'/searchByCategory')
      .then(res => res.json())
      .then(company => dispatch(searchCompanyByCategory(company)))
  }
}
export const fetchCompanyByCategoryGmaps = (id, cb) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/company/'+id+'/searchByCategory')
      .then(res => res.json())
      .then(company => dispatch(searchCompanyByCategory(company)))
      .then(function(result){
        fetch('http://localhost:3001/api/company/'+id)
          .then(res => res.json())
          .then(comp => dispatch(fetchingCompanyProfile(comp)))
          .then(result2 => cb(result.payload,result2.payload))
      })
  }
}
export const fetchProfileGmaps = (id, cb, that) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/company/'+id)
      .then(res => res.json())
      .then(comp => dispatch(fetchingCompanyProfile(comp)))
      .then(result => cb(result.payload, that))
  }
}
export const createBuyRequestFetch = (data,id, img) => {
  if(!img) {
    return (dispatch) => {
        fetch('http://localhost:3001/api/company/'+id+'/buyRequest',
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title:data.title,
            price:data.price,
            description:data.request,
            // images:'https://s3-ap-southeast-1.amazonaws.com/ukm-hub/images/'+img//ganti dlu di backend nya
          })
        })
        .then(res => res.json())
        // .then(edited => dispatch(loginCompany(edited)))
    }
  } else {
    return (dispatch) => {
        fetch('http://localhost:3001/api/company/'+id+'/buyRequest',
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title:data.title,
            price:data.price,
            description:data.request,
            images:'https://s3-ap-southeast-1.amazonaws.com/ukm-hub/images/'+img//ganti dlu di backend nya
          })
        })
        .then(res => res.json())
        // .then(edited => dispatch(loginCompany(edited)))
    }
  }
}
export const createSellRequestFetch = (data,id, img) => {
  if(!img){
    return (dispatch) => {
        fetch('http://localhost:3001/api/company/'+id+'/sellRequest',
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title:data.title,
            price:data.price,
            description:data.request,
            // images:'https://s3-ap-southeast-1.amazonaws.com/ukm-hub/images/'+img//ganti dlu di backend nya
          })
        })
        .then(res => res.json())
        // .then(edited => dispatch(loginCompany(edited)))
    }
  } else {
    return (dispatch) => {
        fetch('http://localhost:3001/api/company/'+id+'/sellRequest',
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            title:data.title,
            price:data.price,
            description:data.request,
            images:'https://s3-ap-southeast-1.amazonaws.com/ukm-hub/images/'+img//ganti dlu di backend nya
          })
        })
        .then(res => res.json())
        // .then(edited => dispatch(loginCompany(edited)))
    }
  }

}

export const otherCompanyRequestFetch = (id) => {
  return (dispatch) => {
    fetch('http://localhost:3001/api/company/'+id+'/searchRequest')
      .then(res => res.json())
      .then(company => dispatch(searchOtherCompanyRequest(company)))
  }
}

export const createMessageFetch = (title, message, requestTitle, id, otherId, requestId) => {
  return (dispatch) => {
      fetch(`http://localhost:3001/api/company/${id}/${otherId}/${requestId}/message`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title,
          message: message,
          requestTitle: requestTitle
        })
      })
      .then(res => res.json())
  }
}

export const acceptMessageFetch = (id, acceptedMessagesId) => {
  return (dispatch) => {
      fetch('http://localhost:3001/api/company/'+id+'/'+acceptedMessagesId+'/acceptMessage',
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => console.log(res))
  }
}

export const rejectMessageFetch = (id, rejectedMessagesId) => {
  return (dispatch) => {
      fetch('http://localhost:3001/api/company/'+id+'/'+rejectedMessagesId+'/rejectMessage',
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
      })
      .then(res => console.log(res))
  }
}
