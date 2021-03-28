import { useReducer } from "react"
import { createAsyncState } from "redux-utility"

const reducer = createAsyncState("DATA")

const actions = reducer.actions

const useAsyncState = () => {
  const initial = { loading: true, data: undefined, error: undefined }
  const [state, dispatch] = useReducer(reducer, initial)
  return {
    state,
    dispatch,
    actions,
    events: {
      start: () => dispatch(actions.fetch()),
      onSuccess: (data) => dispatch(actions.success(data)),
      onError: (data) => dispatch(actions.fail(data)),
    },
  }
}

export default useAsyncState
