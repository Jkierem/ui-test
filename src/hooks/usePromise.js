import { useEffect } from "react"
import useAsyncState from "./useAsyncState"

/**
 * Receives a function that returns a promise and returns a state that is
 * hooked to react using hooks. Can receive a data argument as part of config
 * @param {(data: any) => Promise<any>} fn
 * @param {{ data: any }} config
 */
const usePromise = (fn, config = {}) => {
  const { events, state } = useAsyncState()
  const { data } = config
  useEffect(() => {
    fn(data).then(events.onSuccess).catch(events.onError)
  }, [])

  const refetch = (newData = {}) => {
    events.start()
    fn({ ...data, ...newData })
      .then(events.onSuccess)
      .catch(events.onError)
  }

  return { ...state, refetch }
}

export default usePromise
