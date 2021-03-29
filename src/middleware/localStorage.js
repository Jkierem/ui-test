import { Maybe, Result } from "jazzi"

const LOCAL_KEY = "__ROT__"

const encode = (obj) => window.btoa(JSON.stringify(obj))
const decode = (str) => JSON.parse(window.atob(str))

export const wrapData = (data) => ({
  val() {
    return data
  },
  exists() {
    return Boolean(data)
  },
})

const localObservable = () => {
  const subs = []
  return {
    subscribe(cb) {
      subs.push(cb)
    },
    get() {
      try {
        return Maybe.fromNullish(window.localStorage.getItem(LOCAL_KEY)).map(decode)
      } catch (e) {
        return Maybe.None()
      }
    },
    transaction(fn) {
      try {
        const newState = fn(this.get())
        this.set(newState)
        return Result.Ok(newState)
      } catch (e) {
        return Result.Err(e)
      }
    },
    set(value) {
      window.localStorage.setItem(LOCAL_KEY, encode(value))
      subs.forEach((sub) => sub(wrapData(value)))
    },
  }
}

export default localObservable
