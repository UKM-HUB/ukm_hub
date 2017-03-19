
export default (state=[] , action) => {
  console.log(state);
  switch(action.type){

    case 'LOGIN_COMPANY' :
      return [...state, action.payload]

    // case 'DELETE_TODO' :
    //   return state.filter((x)=> x.id !== action.payload)
    // 
    // case 'DONE_TODO' :
    //   return state.map((todo) => todo.id !== action.payload.id ? todo : {...todo, done:!todo.done})
    //
    // case 'UPDATE_TODO' :
    //   return state.map((todo) => todo.id !== action.payload.id ? todo : {...todo, todo:action.payload.todo})
    //
    // case 'SHOW_ALL' :
    //   return action.payload
    //
    // case 'SHOW_COMPLETED' :
    //   return action.payload.filter((x)=>action.payload.done)
    //
    // case 'SHOW_ACTIVE' :
    //   return action.payload.filter((x)=>!action.payload.done)

    default:
      return state
  }
}
