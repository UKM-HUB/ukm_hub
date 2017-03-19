import {combineReducers} from 'redux'
import loginReducer from './reducer_loginCompany.js'

const rootReducers = combineReducers({
  loggedInCompany: loginReducer
})

export default rootReducers
