import { Maybe } from "jazzi"
import firebaseInstance from "./firebase"
import localObservable, { wrapData } from "./localStorage"
import mocks from "./mocks"

const local = localObservable()
const database = firebaseInstance.map((firebase) => firebase.database())

export const listenToPolls = (callback) =>
  database
    .map((db) => {
      const ref = db.ref("/data").limitToLast(10)
      const cb = ref.on("value", callback)

      return () => ref.off("value", cb)
    })
    .mapLeft(() => {
      local.subscribe(callback)
      callback(wrapData(local.get().onNone(() => mocks.data)))
    })

export const submitVote = (id, vote) => {
  database
    .map((db) => {
      return db.ref(`/data/${id}/votes`).transaction((entry) => {
        Maybe.fromNullish(entry).effect((entry) => {
          vote.match({
            Positive: () => (entry.positive += 1),
            Negative: () => (entry.negative += 1),
          })
        })

        return entry
      })
    })
    .mapLeft(() => {
      local
        .transaction((maybeData) => {
          const data = maybeData.onNone(() => mocks.data)
          vote.match({
            Positive: () => (data[id].votes.positive += 1),
            Negative: () => (data[id].votes.negative += 1),
          })
          return data
        })
        .onErr((e) => {
          alert("Something unexpected happened. Please try again later")
        })
    })
}
