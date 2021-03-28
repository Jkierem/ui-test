import {
  createReducer,
  nullaryActionCreator,
  unaryActionCreator,
} from "redux-utility"

const SET_DATA = "SET_DATA"
const RESET_DATA = "RESET_DATA"

export default createReducer({
  [SET_DATA]: (_, action) => action.payload,
  [RESET_DATA]: () => [],
})

export const setPollData = unaryActionCreator(SET_DATA)
export const resetPollData = nullaryActionCreator(RESET_DATA)
