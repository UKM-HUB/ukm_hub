export default (state=[] , action) => {
  switch(action.type){
    case 'FETCH_COMPANY_BY_CATEGORY' :
      return action.payload
    default:
      return state
  }
}
