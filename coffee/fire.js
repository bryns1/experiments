// Config your firebase instance here

import firebase from 'firebase'
import {store} from './store/store'


const config = {
  apiKey: "AIzaSyDzxOFzgDeSWPFW6_GB3mWWC7c5MLR5WH0",
  authDomain: "coffee-73e67.firebaseapp.com",
  databaseURL: "https://coffee-73e67.firebaseio.com",
  projectId: "coffee-73e67",
  storageBucket: "coffee-73e67.appspot.com",
  messagingSenderId: "1038514231419"
}

const app = firebase.initializeApp(config)

export const db = app.database()

export default app