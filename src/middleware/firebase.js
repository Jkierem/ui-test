import firebase from "firebase/app"
import "firebase/database"
import { Either, Maybe } from "jazzi"

const getEnv = (str) => process.env[`REACT_APP_${str}`]

const onDev = Maybe.fromPredicate(() => process.env.NODE_ENV === "development")

const firebaseInstance = Either.fromPredicate(
  () => getEnv("USE_FIREBASE") === "true"
).map(() => {
  const firebaseConfig = {
    apiKey: getEnv("API_KEY"),
    authDomain: getEnv("AUTH_DOMAIN"),
    databaseURL: getEnv("DB_URL"),
    storageBucket: getEnv("STORAGE_BUCKET"),
  }

  firebase.initializeApp(firebaseConfig)

  onDev.effect(() => console.log({ firebaseConfig }))

  return firebase
})

onDev.effect(() => {
  firebaseInstance.match({
    Right: () => console.log("Firebase initialized"),
    Left: () => console.log("Firebase not initialized... Will fallback to mocks."),
  })
})

export default firebaseInstance
