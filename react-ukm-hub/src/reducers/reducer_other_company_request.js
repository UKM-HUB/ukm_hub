export default (state = [], action) => {
  switch(action.type){
    case 'FETCH_OTHER_COMPANY_REQUEST' :
      return action.payload
    default:
      return state
  }
}
