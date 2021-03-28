import { useEffect } from "react"
import useAsyncState from "./useAsyncState"

/**
 * Receives a function that returns a promise and returns a state that is
 * hooked to react using hooks.
 * @param {() => Promise<any>} fn
 */
const usePromise = (fn) => {
  const { events, state } = useAsyncState()
  useEffect(() => {
    fn().then(events.onSuccess).catch(events.onError)
  }, [])

  const refetch = () => {
    events.start()
    fn()
      .then(events.onSuccess)
      .catch(events.onError)
  }

  return { ...state, refetch }
}

export default usePromise
