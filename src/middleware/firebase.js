import firebase from "firebase/app"
import "firebase/database"
import { Either } from "jazzi"

const getEnv = (str) => process.env[`REACT_APP_${str}`]

const firebaseInstance = Either
.fromPredicate(() => getEnv("USE_FIREBASE") === "true")
.map(() => {
  const firebaseConfig = {
    apiKey: getEnv("API_KEY"),
    authDomain: getEnv("AUTH_DOMAIN"),
    databaseURL: getEnv("DB_URL"),
    storageBucket: getEnv("STORAGE_BUCKET"),
  }
  
  firebase.initializeApp(firebaseConfig)

  return firebase
})

export default firebaseInstance