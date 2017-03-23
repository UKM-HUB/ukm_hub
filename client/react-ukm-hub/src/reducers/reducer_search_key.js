export default (state = '', action) => {
  switch(action.type){
    case 'SEARCH_REQUEST_CLICK' :
      return action.payload
    default:
      return state
  }
}
