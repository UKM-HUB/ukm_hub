export const loginCompany = (token) => {
  return {
    type: 'LOGIN_COMPANY',
    payload:token,

  }
}

export const registerCompanyFetch = (email,password) => {
  return (dispatch) => {
    setTimeout(()=> {
      fetch('http://localhost:3001/auth/register',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email:email,
          password: password
        })
      })
      .then(res => res.json())
      .then(registered => dispatch(login(registered)))
    },1000)
  }
}

export const loginCompanyFetch = (email,password) => {
  return (dispatch) => {
    setTimeout(()=> {
      fetch('http://localhost:3001/auth/login',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email:email,
          password: password
        })
      })
      .then(res => res.json())
      .then(registered => dispatch(login(registered)))
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
