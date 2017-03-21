import {combineReducers} from 'redux'
import loginReducer from './reducer_loginCompany.js'
import profileReducer from './reducer_companyProfile.js'
import companyByCategoryReducer from './reducer_company_by_category.js'
import otherCompanyRequestReducer from './reducer_other_company_request.js'
const rootReducers = combineReducers({
  profile: profileReducer,
  loggedInCompany: loginReducer,
  companyByCategory: companyByCategoryReducer,
  otherCompanyRequest: otherCompanyRequestReducer
})

export default rootReducers
