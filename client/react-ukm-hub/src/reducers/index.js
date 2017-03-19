import {combineReducers} from 'redux'
import loginReducer from './reducer_loginCompany.js'
import profileReducer from './reducer_companyProfile.js'

const rootReducers = combineReducers({
  profiles: profileReducer,
  loggedInCompany: loginReducer
})

export default rootReducers
