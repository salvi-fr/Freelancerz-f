import 'firebase/storage';


import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from 'config.js'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
// let firebaseConfig = {
//   apikey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DB_URL,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET
// };


!firebase.apps.length && firebase.initializeApp(firebaseConfig);
export default firebase.storage();

