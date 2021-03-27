import { createStore, applyMiddleware } from "redux"
import { getDevtoolsCompose } from "redux-utility"
import rootReducer from "./reducer"

export const initialState = {
  data: []
}

const initStore = () => {
  const composeEnhancers = getDevtoolsCompose(process.env.NODE_ENV === "development")

  const enhancers = []

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...enhancers))
  )

  return store
}

const store = initStore()

export default store