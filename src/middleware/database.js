import firebaseInstance from "./firebase"
import mocks from "./mocks"

const database = firebaseInstance.map((firebase) => firebase.database())

export const getPolls = () =>
  database
    .map((db) =>
      db
        .ref("/data")
        .limitToLast(20)
        .once()
        .then((snap) => snap.val())
    )
    .onLeft(() => Promise.resolve(mocks.data))

