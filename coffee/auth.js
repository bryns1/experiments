import { store } from './store/store'
import firebase from 'firebase'
import fire, { db } from './fire'

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

firebase.auth().onAuthStateChanged(resUser => {
  if (resUser) {
    
    const user = {
      displayName: resUser.displayName,
      email: resUser.email,
      emailVerified: resUser.emailVerified,
      photoURL: resUser.photoURL,
      isAnonymous: resUser.isAnonymous,
      uid: resUser.uid,
      providerData: resUser.providerData,
    }

    const userRef = db.ref('users/' + user.uid).update(user)

    store.dispatch({
      type: "UPDATE_USER",
      payload: user
    })
  
    // ...
  } else {
    store.dispatch({
      type: "SIGN_OUT",
    })
  }
});

fire.auth().getRedirectResult().then(function(result) {
  let token 

  if (result.credential) token = result.credential.accessToken

  if(result.user && typeof result.user === 'object') result.user.token = token
  
  store.dispatch({
    type: "UPDATE_GOOGLE_USER",
    user: (result.user)
  })

  console.log(result.user)

}).catch(function(error) {

  store.dispatch({
    type: "UPDATE_APP_STATE",
    state: {
      gotLoginError: error
    }
  })

});



export const GoogleAuth = new firebase.auth.GoogleAuthProvider;

export const login = () => firebase.auth().signInWithRedirect(GoogleAuth);
