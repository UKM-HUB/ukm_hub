
export default (state='' , action) => {
  switch(action.type){

    case 'FETCH_COMPANY_PROFILE' :

      return action.payload
    case 'UPDATE_PROFILE' :
      return state._id !== action.payload._id ? state : {...state,
      name : action.payload.name,
      type : action.payload.type,
      category : action.payload.category,
      location:{
        lat:action.payload.lat,
        lng:action.payload.lng
      },
      website : action.payload.website,
      address : action.payload.address,
      phone : action.payload.phone,
      description : action.payload.description,
      images : action.payload.image}


    default:
      return state
  }
}
