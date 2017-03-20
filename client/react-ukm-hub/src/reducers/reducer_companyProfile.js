
export default (state='' , action) => {
  switch(action.type){

    case 'FETCH_COMPANY_PROFILE' :
      return action.payload
    case 'UPDATE_COMPANY_PROFILE_SUCCESS' :
      return action.payload
    
    default:
      return state
  }
}
