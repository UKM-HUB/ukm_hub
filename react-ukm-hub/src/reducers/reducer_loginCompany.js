
export default (state = '', action) => {
  switch(action.type){
    case 'LOGIN_COMPANY' :
      return action.payload
    default:
      return state
  }
}
