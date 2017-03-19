
export default (state='' , action) => {
  switch(action.type){

    case 'FETCH_COMPANY_PROFILE' :
    console.log(action.payload);
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


    // case 'DELETE_TODO' :
    //   return state.filter((x)=> x.id !== action.payload)
    //
    // case 'DONE_TODO' :
    //   return state.map((todo) => todo.id !== action.payload.id ? todo : {...todo, done:!todo.done})
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
