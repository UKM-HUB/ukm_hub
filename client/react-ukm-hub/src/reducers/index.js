import {combineReducers} from 'redux'
import loginReducer from './reducer_loginCompany.js'
import profileReducer from './reducer_companyProfile.js'
import companyByCategoryReducer from './reducer_company_by_category.js'

const rootReducers = combineReducers({
  profile: profileReducer,
  loggedInCompany: loginReducer,
  companyByCategory: companyByCategoryReducer
})

export default rootReducers
