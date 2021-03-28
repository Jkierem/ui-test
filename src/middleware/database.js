import firebaseInstance from "./firebase"
import mocks from "./mocks"

const database = firebaseInstance.map((firebase) => firebase.database())

export const listenToPolls = (callback) =>
  database
    .map((db) =>{
      const callback =db
        .ref("/data")
        .limitToLast(10)
        .on("value", (snap) => {
          callback(snap.val())
        })
        return () => db.ref("/data").off("value",callback);
      }
    )
    .mapLeft(() => callback(mocks.data))

export const getPollsOnce = () =>
  database
    .map((db) =>
      db
        .ref("/data")
        .limitToLast(10)
        .once()
        .then((snap) => snap.val())
    )
    .onLeft(() => Promise.resolve(mocks.data))
