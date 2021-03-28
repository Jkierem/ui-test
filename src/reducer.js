import { combineReducers } from "redux"

// Identity reducer. Will add proper reducer in about an hour
const dataReducer = (state, action) => state || []

export default combineReducers({
  data: dataReducer,
})
