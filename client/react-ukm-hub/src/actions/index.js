export const loginCompany = (token) => {
  return {
    type: 'LOGIN_COMPANY',
    payload:token,

  }
}

export const fetchingCompanyProfile = (data) => {
  return {
    type: 'FETCH_COMPANY_PROFILE',
    payload:data,

  }
}


export const registerCompanyFetch = (email,password) => {
  return (dispatch) => {

      fetch('http://localhost:3001/api/company/auth/register/',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email:email,
          password: password
        })
      })
      .then(res => res.json())
      .then(registered => {
        localStorage.setItem('token',registered.token)
        localStorage.setItem('companyId',registered.companyId)
        return dispatch(loginCompany(registered))
      })

  }
}

export const loginCompanyFetch = (email,password) => {
  return (dispatch) => {

      fetch('http://localhost:3001/api/company/auth/login/',
      {
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
    setTimeout(()=> {
      fetch('http://localhost:3001/api/company/'+id)
      .then(res => res.json())
      .then(todos => dispatch(fetchingCompanyProfile(todos)))
    },1000)
  }
}

export const upadateCompanyProfileFetch = (data,id) => {
  return (dispatch) => {
    setTimeout(()=> {
      fetch('http://localhost:3001/api/company/'+id,
      {
        method: 'POST',
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
          images : data.profilePicture,
        })
      })
      .then(res => res.json())
      .then(edited => dispatch(loginCompany(edited)))
    },1000)
  }
}

// export const addTodox = (todo) => {
//
//   return (dispatch) => {
//     setTimeout(()=> {
//       fetch('http://localhost:3005/todos',
//       {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           todo:todo,
//           done: false
//         })
//       })
//       .then(res => res.json())
//       .then(todos => dispatch(addTodo(todos.todo,todos.id)))
//     },1)
//   }
// }
//
// export const deleteTodox = (id) => {
//
//   return (dispatch) => {
//     setTimeout(()=> {
//       fetch('http://localhost:3005/todos/'+id,{
//         method: 'DELETE'
//
//       })
//       .then(res => res.json())
//       .then(todos => dispatch(deleteTodo(id)))
//     },1)
//   }
// }
//
// export const doneTodox = (todo) => {
//
//   return (dispatch) => {
//     setTimeout(()=> {
//       fetch('http://localhost:3005/todos/'+todo.id,{
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           id:todo.id,
//           todo:todo.todo,
//           done: !todo.done
//         })
//       })
//       .then(res => res.json())
//       .then(todos => dispatch(doneTodo(todos)))
//     },1)
//   }
// }
//
// export const updateTodox = (id,todo,done) => {
//
//   return (dispatch) => {
//     setTimeout(()=> {
//       fetch('http://localhost:3005/todos/'+id,{
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           id:id,
//           todo:todo,
//           done: done
//         })
//       })
//       .then(res => res.json())
//       .then(todos => dispatch(updateTodo(todos)))
//     },1)
//   }
// }
